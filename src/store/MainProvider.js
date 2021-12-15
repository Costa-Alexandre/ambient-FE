import React, { useState, useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { mediaDevices } from "react-native-webrtc";
import InCallManager from 'react-native-incall-manager';
import socketio from "socket.io-client";

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
  activeCalls: [], // activeShow,
  chatMessages: [],
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

  const [chatMessages, setChatMessages] = useState(initialValues.chatMessages);


  useEffect(() => {
    return () => {
      InCallManager.stop()
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
        console.log(participant.user._id, user._id)
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
            console.log('close')
          });
          
          incomingCall.on("error", () => {});
        });
      });

      // when a new user joins the room, all users start a call with the new user
      socket.on("user-joined-show", (participant) => {
        console.log("user joined")
        console.log(participant.user._id, user._id)

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
              // setRemoteStreams(currentStreams => [...currentStreams, stream]);
            },
            (err) => {
              console.error("Failed to get call stream", err);
            }
          );

        } catch (error) {
          console.log("Calling error", error);
        }

        // call the user that just joined
        socket.emit("call", participant.socketId, participant.roomId);
        setRemoteUsers(currentUsers => [...currentUsers, participant]);

        // get a mute/unmute event
        // must force a re-render in show info
        socket.on("toggle-mute", (peerId, isMuted) => {
          remoteUsers.forEach((participant, i) => {
            if(participant.peerId == peerId){
              const updatedParticipant = {
                ...participant,
                isMuted: isMuted
              }
              const updatedRemoteUsers = remoteUsers.pop(i);
              setRemoteUsers(...updatedRemoteUsers, updatedParticipant)
              console.log(`${updatedParticipant.user.username} is muted: ${isMuted}`)
            }
          })
        });

        // receiving a message
        socket.on("message-receive", (message, user) => {
          setChatMessages(currentMessages => [...currentMessages, {user, message}])}
        );
      });
    }
  }, [peerId])

  useEffect(() => {
    toggleMute();
  }, [isMuted])


  const joinShow = (activeShow) => {
    if (!activeShow._id) {
      console.log("Show not found");
      return;
    }

    const participant = {
      activeShow,
      user,
      peerId,
      isMuted,
      localStream,
      activeTrack,
      socketId: "",
      roomId: ""
    }
    
    socket.emit("user-join-show", participant);

  };


  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        // send event to refresh the muted icon on avatar in the show screen
        // for all participants of the active show
        socket.emit("toggle-mute", activeShow._id, peerId, isMuted);
        console.log(`Muted: ${isMuted}`)
      });
    }
      
  };



  const sendChatMessage = (message) => {
    if (socket && activeShow._id)
      socket.emit("message-send", {showId: activeShow._id, message, user})
  };




  const leaveShow = () => {
    if(activeShow){
      socket.emit('leave-show', activeShow._id)
      activeCalls?.forEach((call) => {
        call.close();
      });
      setActiveCalls([])
      setRemoteStreams([])
      setRemoteUsers([])
      setChatMessages([])
      setActiveShow(resetShow());
      setActiveTrack(resetTrack())
    }
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
        peerServer,
        chatMessages,
        sendChatMessage
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

// 'inspiration': https://github.com/metehankurucu/react-native-video-calling-app/blob/main/src/store/MainProvider.tsx
