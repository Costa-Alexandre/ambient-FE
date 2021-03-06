import React, { useState, useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import { mediaDevices } from 'react-native-webrtc';
import InCallManager from 'react-native-incall-manager';
import socketio from 'socket.io-client';
import { remote as SpotifyRemote } from 'react-native-spotify-remote';
import { spotifyGetTrack, spotifyPlayTrack } from 'api/spotify';

import {
  SOCKET_SERVER,
  PEER_SERVER_HOST,
  PEER_SERVER_PORT,
  PEER_SERVER_PATH,
} from 'server';
import Peer from 'react-native-peerjs';

export const socket = socketio.connect(SOCKET_SERVER, {
  reconnection: true,
  autoConnect: true,
});

const initialValues = {
  user: {
    _id: '',
    username: '',
    displayName: '',
    email: '',
    avatar: null,
    createdShows: [],
    showShowNotifications: '',
  },
  spotifyData: null,
  activeShow: {
    _id: '',
    creator_id: '',
    name: '',
    description: '',
    type: '',
    date_created: '',
    date_scheduled: '',
    date_ended: '',
    participants_id: [],
    averageColor: '',
  },
  activeTrack: {
    id: '',
    name: '',
    uri: '',
    imageUri: null,
    artists: [],
  },
  trackPaused: false,
  peerId: '',
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
  const [spotifyData, setSpotifyData] = useState(initialValues.spotifyData);
  const [activeShow, setActiveShow] = useState(initialValues.activeShow);
  const [activeTrack, setActiveTrack] = useState(initialValues.activeTrack);
  const [trackPaused, setTrackPaused] = useState(initialValues.trackPaused);
  const [peerId, setPeerId] = useState(initialValues.peerId);
  const [localStream, setLocalStream] = useState(initialValues.localStream);
  const [remoteStreams, setRemoteStreams] = useState(
    initialValues.remoteStreams,
  );
  const [remoteUsers, setRemoteUsers] = useState(initialValues.remoteUsers);
  const [peerServer, setPeerServer] = useState(null);
  const [isMuted, setIsMuted] = useState(initialValues.isMuted);
  const [activeCalls, setActiveCalls] = useState(initialValues.activeCalls);

  const [chatMessages, setChatMessages] = useState(initialValues.chatMessages);

  useEffect(() => {
    return () => {
      InCallManager.stop();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // answering a call
    socket.on('called', handleCall);

    // when a new user joins the room, all users start a call with the new user
    socket.on('user-joined-show', handleUserJoined);

    // when a user leaves the room
    socket.on('user-left-show', handleUserLeft);

    // get a mute/unmute event
    // must force a re-render in show info
    socket.on('toggle-mute', handleToggleMute);

    // receiving a message
    socket.on('message-receive', handleMessageReceived);

    // receiving a playback update
    socket.on('playback-updated', handlePlaybackUpdate);

    if (peerServer) {
      peerServer.on('error', handlePeerError);
      peerServer.on('open', handlePeerOpen);
      peerServer.on('call', handlePeerCall);
    }

    SpotifyRemote.addListener('playerStateChanged', updatePlayback);

    return () => {
      socket.off('called', handleCall);
      socket.off('user-joined-show', handleUserJoined);
      socket.off('user-left-show', handleUserLeft);
      socket.off('toggle-mute', handleToggleMute);
      socket.off('message-receive', handleMessageReceived);
      socket.off('playback-updated', handlePlaybackUpdate);

      if (peerServer) {
        peerServer.off('error', handlePeerError);
        peerServer.off('open', handlePeerOpen);
      }

      SpotifyRemote.removeListener('playerStateChanged', updatePlayback);
    };
  }, [
    user,
    peerId,
    localStream,
    remoteStreams,
    remoteUsers,
    peerServer,
    isMuted,
    activeCalls,
    chatMessages,
    activeTrack,
    activeShow,
  ]);

  const checkPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'We need access to your microphone so you can join the stage',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the microphone');
        initialize();
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const initialize = async () => {
    const constraints = {
      audio: true,
      video: false,
    };

    InCallManager.start({ media: 'audio' });
    const newStream = await mediaDevices.getUserMedia(constraints);

    setLocalStream(newStream);

    const peer = new Peer(undefined, {
      host: PEER_SERVER_HOST,
      path: PEER_SERVER_PATH,
      secure: true,
      port: PEER_SERVER_PORT,
      config: {
        iceServers: [
          {
            urls: [
              'stun:stun1.l.google.com:19302',
              'stun:stun2.l.google.com:19302',
            ],
          },
        ],
      },
    });

    setPeerServer(peer);
  };

  const handlePeerError = (err) => {
    console.log('Peer server error', err);
  };

  const handlePeerOpen = (peerId) => {
    setPeerId(peerId);
  };

  const handleCall = (participant) => {
    console.log('called by socket');
    setRemoteUsers((currentUsers) => [...currentUsers, participant]);
  };

  const handlePeerCall = (incomingCall) => {
    console.log('called by peer', localStream);
    incomingCall.answer(localStream);
    setActiveCalls((currentCalls) => [...currentCalls, incomingCall]);

    incomingCall.on('stream', (stream) => {
      // setRemoteStreams(currentStreams => [...currentStreams, stream]);
    });

    incomingCall.on('close', () => {
      // Error in peer js preventing this from working with call
    });

    incomingCall.on('error', () => {});
  };

  const handleUserJoined = (participant) => {
    console.log('user joined', participant.user._id);

    if (!peerServer) {
      console.log('Peer server or socket connection not found');
      return;
    } else {
      console.log('there is a peerServer');
    }

    try {
      const call = peerServer.call(participant.peerId, localStream);
      setActiveCalls((currentCalls) => [...currentCalls, call]);

      // call.on("stream",
      //   (stream) => {},
      //   (err) => { console.error("Failed to get call stream", err);}
      // );
    } catch (error) {
      console.log('Calling error', error);
    }

    // call the user that just joined
    setRemoteUsers((currentUsers) => [...currentUsers, participant]);
    socket.emit('call', {
      participant: get_user_participant(),
      socketId: participant.socketId,
    });

    // give the user the current playback state if you're in control of the music
    if (true) {
      SpotifyRemote.getPlayerState()
        .then((playerState) => {
          socket.emit('playback-initial-sync', {
            toUserId: participant.socketId,
            playerState,
          });
        })
        .catch((err) => console.log('initial sync failed', err));
    }
  };

  const handleUserLeft = (socketId) => {
    console.log('close call', socketId);
    let index = remoteUsers.map((rUser) => rUser.socketId).indexOf(socketId);
    let currentUsers = [...remoteUsers];
    currentUsers.splice(index, 1);
    setRemoteUsers(currentUsers);
    let currentCalls = [...activeCalls];
    let incomingCall = currentCalls.splice(index, 1);
    incomingCall[0].close();
    setActiveCalls(currentCalls);
  };

  const handleToggleMute = (peerId, isMuted) => {
    let currentUsers = [...remoteUsers];
    currentUsers.forEach((participant, i) => {
      if (participant.peerId == peerId) {
        const updatedParticipant = {
          ...participant,
          isMuted: isMuted,
        };
        currentUsers[i] = updatedParticipant;
        console.log(`${participant.user.username} is muted: ${isMuted}`);
      }
    });
    setRemoteUsers(currentUsers);
  };

  const handlePlaybackUpdate = (playerState) => {
    console.log('received playback update');
    syncToPlaybackState(playerState);
  };

  const handleMessageReceived = ({ message, user }) => {
    setChatMessages((currentMessages) => [
      ...currentMessages,
      { user, message, key: chatMessages.length.toString() },
    ]);
  };

  useEffect(() => {
    toggleMute();
  }, [isMuted]);

  const create_participant = (show) => {
    return {
      activeShow: show,
      user,
      peerId,
      isMuted,
      localStream,
      activeTrack,
      socketId: '',
      roomId: '',
    };
  };

  const get_user_participant = () => {
    let participant = create_participant(activeShow);
    participant.socketId = socket.id;
    participant.roomId = activeShow._id;
    return participant;
  };

  const joinShow = (newShow) => {
    if (!newShow._id) {
      console.log('Show not found');
      return;
    }
    if (!activeShow._id) {
      setActiveShow(newShow);
      socket.emit('user-join-show', create_participant(newShow));
      console.log(`Welcome to show ${newShow.name}!`);
      return;
    }
    if (newShow._id !== activeShow._id) {
      leaveShow();
      setActiveShow(newShow);
      socket.emit('user-join-show', create_participant(newShow));
      console.log(`Welcome to show ${newShow.name}!`);
      return;
    }
  };

  const updatePlayback = async (playerState = null) => {
    if (true && activeShow._id) {
      try {
        // get current player state if not given from update
        if (playerState === null) {
          playerState = await SpotifyRemote.getPlayerState();
        }

        setTrackPaused(playerState.isPaused);

        // get track details
        let track = playerState.track ? playerState.track : resetTrack();
        playerState.track = track;

        // emit playback update and set active track
        socket.emit('playback-update', { playerState, showId: activeShow._id });
        if (playerState.track !== activeTrack) {
          if (playerState.track) {
            playerState.track = await spotifyGetTrack(
              playerState.track.uri.split(':')[2],
            );
            setActiveTrack(playerState.track);
            // TODO update current track on server
          } else {
            setActiveTrack(resetTrack());
          }
        }
        console.log('updated playback for', activeShow._id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setPlaybackPause = async (isPaused) => {
    if (isPaused) {
      await SpotifyRemote.pause();
    } else {
      await SpotifyRemote.resume();
    }
  };

  const syncToPlaybackState = async (playerState) => {
    try {
      // sync playing track
      if (playerState.track) {
        // no current track
        if (!activeTrack) {
          // new tracks is playing
          if (!playerState.isPaused) {
            await spotifyPlayTrack(
              playerState.track.uri,
              playerState.playbackPosition,
            );
          }
          // has current track
        } else {
          if (!playerState.isPaused) {
            await spotifyPlayTrack(
              playerState.track.uri,
              playerState.playbackPosition,
            );
          } else {
            await SpotifyRemote.pause();
          }
        }
        playerState.track = await spotifyGetTrack(
          playerState.track.uri.split(':')[2],
        );
        setActiveTrack(playerState.track);
        // no track playing
      } else {
        await setPlaybackPause(true);
        setActiveTrack(resetTrack());
      }
      console.log('synced playback');
    } catch (error) {
      console.log('failed to sync', error);
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        // send event to refresh the muted icon on avatar in the show screen
        // for all participants of the active show
        socket.emit('toggle-mute', activeShow._id, peerId, isMuted);
        console.log(`Muted: ${isMuted}`);
      });
    }
  };

  const sendChatMessage = (message) => {
    if (socket && activeShow._id)
      socket.emit(
        'message-send',
        { showId: activeShow._id, message, user },
        ({ message, user }) => {
          setChatMessages((currentMessages) => [
            ...currentMessages,
            { user, message, key: chatMessages.length.toString() },
          ]);
        },
      );
  };

  const leaveShow = () => {
    if (activeShow) {
      socket.emit('leave-show', activeShow._id);
      activeCalls?.forEach((call) => {
        call.close();
      });
      setActiveCalls([]);
      setRemoteStreams([]);
      setRemoteUsers([]);
      setChatMessages([]);
      setActiveShow(resetShow());
      setActiveTrack(resetTrack());
      SpotifyRemote.pause();
    }
  };

  const resetShow = () => {
    return {
      _id: '',
      name: '',
      description: '',
    };
  };

  const resetTrack = () => {
    return {
      id: '',
      name: '',
      uri: '',
      imageUri: null,
      artists: [],
    };
  };

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
        trackPaused,
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
        peerServer,
        chatMessages,
        sendChatMessage,
        updatePlayback,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

// 'inspiration': https://github.com/metehankurucu/react-native-video-calling-app/blob/main/src/store/MainProvider.tsx
