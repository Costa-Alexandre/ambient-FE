import React, { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { mediaDevices } from "react-native-webrtc";
import InCallManager from 'react-native-incall-manager';
import socketio from "socket.io-client";
import { remote as SpotifyRemote } from "react-native-spotify-remote";
import { spotifyGetTrack } from "api/spotify";

import {
  SOCKET_SERVER,
  PEER_SERVER_HOST,
  PEER_SERVER_PORT,
  PEER_SERVER_PATH,
} from "server";
import Peer from "react-native-peerjs";

const initialValues = {
  user: {
    _id: "",
    username: "",
    displayName: "",
    email: "",
    avatar: null,
    createdShows: [],
    showShowNotifications: ""
  },
  spotifyData: null,
  activeShow: {
    _id: "",
    name: "",
    description: "",
    averageColor: "",
  },
  activeTrack: {
    id: "",
    name: "",
    uri: "",
    imageUri: null,
    artists: [] 
  },
  peerId: "",
  localStream: null,
  remoteStreams: [],
  remoteUsers: [],
  initialize: () => {},
  joinShow: () => {}, // start show
  toggleMute: () => {},
  isMuted: false,
  leaveShow: () => {}, //leaveShow
  reset: () => {},
  activeCalls: [], // activeShow
};

export const MainContext = React.createContext(initialValues);

const MainContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialValues.user);
  const [spotifyData, setSpotifyData] = useState(initialValues.spotifyData)
  const [activeShow, setActiveShow] = useState(initialValues.activeShow);
  const [activeTrack, setActiveTrack] = useState(initialValues.activeTrack);
  const [peerId, setPeerId] = useState(initialValues.peerId);
  const [localStream, setLocalStream] = useState(initialValues.localStream);
  const [remoteStreams, setRemoteStreams] = useState(
    initialValues.remoteStreams
  );
  const [remoteUsers, setRemoteUsers] = useState(initialValues.remoteUsers);
  const [socket, setSocket] = useState(null);
  const [peerServer, setPeerServer] = useState(null);
  const [isMuted, setIsMuted] = useState(initialValues.isMuted);
  const [activeCalls, setActiveCalls] = useState(initialValues.activeCalls);


  useEffect(() => {
    SpotifyRemote.addListener("playerStateChanged", updatePlayback)
    return () => {
      InCallManager.stop()
      SpotifyRemote.removeAllListeners("playerStateChanged")
    }
  }, [])


  const checkPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "We need access to your microphone so you can join the stage",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the microphone");
        initialize();
      } else {
        console.log("Microphone permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  const initialize = async () => {
    const constraints = {
      audio: true,
      video: false
    };
      
    InCallManager.start({media: 'audio'})
    const newStream = await mediaDevices.getUserMedia(constraints)
    
    setLocalStream(newStream);
  }


  const connectSocketIo = async () => {
    const io = await socketio.connect(SOCKET_SERVER, {
      reconnection: true,
      autoConnect: true,
    });
    setSocket(io)
  }


  useEffect(() => {
    if (localStream) {
      connectSocketIo()
    }
  }, [localStream])


  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log('CONNECTED');
        
        const peer = new Peer(undefined, {
          host: PEER_SERVER_HOST,
          path: PEER_SERVER_PATH,
          secure: true,
          port: PEER_SERVER_PORT,
          config: {
            iceServers: [
              {
                urls: [
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
                ],
              },
            ],
          },
        });
  
        setPeerServer(peer);
      })
    }
  }, [socket])


  useEffect(() => {
    if (peerServer) {

      peerServer.on("error", (err) => console.log("Peer server error", err));
      
      peerServer.on("open", (peerId) => {
        setPeerId(peerId)
      })
    }
  }, [peerServer])


  useEffect(() => {
    if (peerId) {

      // answering a call
      socket.on("call", (participant) => {
        console.log(participant.userId, user._id)
        console.log("call")
        peerServer.on("call", (incomingCall) => {
          console.log("incoming")
          setRemoteUsers(currentUsers => [...currentUsers, participant]);
          incomingCall.answer(localStream);
          setActiveCalls(currentCalls => [...currentCalls, incomingCall]);
          
          incomingCall.on("stream", (stream) => {
            setRemoteStreams(currentStreams => [...currentStreams, stream]);
          });
          
          incomingCall.on("close", () => { 
            // closeCall();
          });
          
          incomingCall.on("error", () => {});
        });
      });

      // when a new user joins the room, all users start a call with the new user
      socket.on("user-joined-show", (participant) => {
        console.log("user joined")
        console.log(participant.userId, user._id)

        if (!peerServer) {
          console.log('Peer server or socket connection not found');
          return;
        } else {
          console.log('there is a peerServer')
        }

        try {
          const call = peerServer.call(participant.peerId, localStream);
          
          call.on(
            "stream",
            (stream) => {
              setActiveCalls(currentCalls => [...currentCalls, call]);
              setRemoteStreams(currentStreams => [...currentStreams, stream]);
            },
            (err) => {
              console.error("Failed to get call stream", err);
            }
          );

        } catch (error) {
          console.log("Calling error", error);
        }

        // call the user that just joined
        socket.emit("call", participant.socketId, activeShow._id);
        setRemoteUsers(currentUsers => [...currentUsers, participant.userId]);
      });

      // receiving a playback update
      socket.on("playback-updated", (playerState) => {
        console.log("received playback update")
        if (playerState.track !== activeTrack) {
          setActiveTrack(playerState.track)
        }
        syncToPlaybackState(playerState)
      });

    }
  }, [peerId])


  useEffect(() => {
    toggleMute();
    if(localStream){
      console.log(`Muted: ${localStream._tracks[0].muted}`);
    }
  }, [isMuted])


  useEffect(() => {
    if (activeShow._id) {
      // updatePlayback() // send initial playback state when joining a show as host
    }
  }, [activeShow])


  const joinShow = (activeShow) => {
    if (!activeShow._id) {
      console.log("Show not found");
      return;
    }

    const eventInfo = {
      showId: activeShow._id,
      user: user,
      userId: user._id,
      peerId
    }
    
    socket.emit("user-join-show", eventInfo, ({showId, userId, peerId, role}) => {
      console.log(`
    Participant: 
    showId: ${showId}
    userId: ${userId}
    peerId: ${peerId}
    is now set to the ${role} role.`)
    });

  };


  const updatePlayback = async (playerState=null) => {
    console.log(user.username, activeShow)
    if (user.username === "dashpig" && activeShow._id) {
      try {
        // get current player state if not given from update
        if (playerState === null) {
          playerState = await SpotifyRemote.getPlayerState()
        }

        // get track details
        let track = resetTrack()
        if (playerState.track) {
          track = await spotifyGetTrack(playerState.track.uri.split(":")[2])
        }
        playerState.track = track

        // emit playback update and set active track
        socket.emit("playback-update", {playerState, showId: activeShow._id})
        if (playerState.track !== activeTrack) {
          setActiveTrack(playerState.track)
          // TODO update current track on server
        }
        console.log("updated playback for", activeShow._id)
      }
      catch (error) {
        console.log(error)
      }
    }
  }


  const syncToPlaybackState = (playerState) => {
    console.log("syncing") // TODO
  }


  const toggleMute = () => {
    if (localStream)
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
  };


  const leaveShow = () => {
    activeCalls?.forEach((call) => {
      call.close();
    });
    setActiveCalls([]);
    setRemoteUsers([]);
  };


  const resetShow = () => {
    return (
      {
        _id: "",
        name: "",
        description: "",
      }
    )};


    const resetTrack = () => {
    return (
      {
        id: "",
        name: "",
        uri: "",
        imageUri: null,
        artists: []
      }
    )};


  return (
    <MainContext.Provider
      value={{
        user,
        setUser,
        spotifyData,
        setSpotifyData,
        activeShow,
        setActiveShow,
        activeTrack,
        setActiveTrack,
        peerId,
        setPeerId,
        localStream,
        setLocalStream,
        remoteStreams,
        setRemoteStreams,
        remoteUsers,
        setRemoteUsers,
        checkPermissions,
        initialize,
        joinShow,
        toggleMute,
        isMuted,
        setIsMuted,
        leaveShow,
        resetShow,
        resetTrack,
        activeCalls,
        setActiveCalls,
        socket,
        peerServer
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

// 'inspiration': https://github.com/metehankurucu/react-native-video-calling-app/blob/main/src/store/MainProvider.tsx
