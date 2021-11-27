import React, {useState} from 'react';
import { mediaDevices } from 'react-native-webrtc';
import socketio from "socket.io-client";
import {
  SERVER_URL,
  PEER_SERVER_HOST,
  PEER_SERVER_PORT,
  PEER_SERVER_PATH,
} from 'server';
import Peer from 'react-native-peerjs';


const initialValues = {
  username: '',
  peerId: '',
  showId: '',
  localStream: null,
  remoteStreams: [],
  remoteUsers: [],
  initialize: () => {},
  setUsername: () => {},
  joinShow: () => {},  // start show
  toggleMute: () => {},
  isMuted: false,
  leaveShow: () => {}, //leaveShow
  reset: () => {},
  activeCalls: [],  // activeShow
};

export const MainContext = React.createContext(initialValues);

const MainContextProvider = ({children}) => {
  const [username, setUsername] = useState(initialValues.username);
  const [peerId, setPeerId] = useState(initialValues.peerId);
  const [showId, setShowId] = useState(initialValues.showId);
  const [localStream, setLocalStream] = useState(
    initialValues.localStream,
  );
  const [remoteStreams, setRemoteStreams] = useState(
    initialValues.remoteStreams
  );
  const [remoteUsers, setRemoteUsers] = useState(initialValues.remoteUsers);
  const [socket, setSocket] = useState(null);
  const [peerServer, setPeerServer] = useState(null);
  const [isMuted, setIsMuted] = useState(initialValues.isMuted);
  const [activeCalls, setActiveCalls] = useState(initialValues.activeCalls);

  const initialize = async () => {

    const constraints = {
      audio: true,
      video: false
    };

    const newStream = await mediaDevices.getUserMedia(constraints);

    setLocalStream(newStream);

    const io = socketio(SERVER_URL);

    io.on('connect', () => {
      setSocket(io);
      io.emit('register', username); // register user
    });

    const peerServer = new Peer(undefined, {
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

    peerServer.on('error', (err) =>
      console.log('Peer server error', err),
    );

    peerServer.on('open', (peerId) => {
      setPeerServer(peerServer);
      setPeerId(peerId);
      io.emit('set-peer-id', peerId); // set user peer id
    });


    // when a new user joins the room, all users start a call with the new user
    io.on('user-joined', (user) => {
      socket.emit('call', username);
      setRemoteUsers([...remoteUsers, user]);

      try {
        const call = peerServer.call(user.peerId, localStream);

        call.on(
          'stream',
          (stream) => {
            setActiveCalls([...activeCalls, call]);
            setRemoteStreams([...remoteStreams, stream]);
          },
          (err) => {
            console.error('Failed to get call stream', err);
          },
        );
      } catch (error) {
        console.log('Calling error', error);
      }
    });

    // answering a call
    io.on('call', (user) => {
      peerServer.on('call', (call) => {
        setRemoteUsers([...remoteUsers, user]);
        call.answer(localStream);
        setActiveCalls([...activeCalls, call]);

        call.on('stream', (stream) => {
          setRemoteStreams([...remoteStreams, stream]);
        });

        call.on('close', () => {
          closeCall();
        });

        call.on('error', () => {});
      });
    });
  };

  const joinShow = (roomId) => {

    if(!roomId) {
      console.log('Room id not found');
      return;
    }

    setShowId(roomId);
    
    socket.emit('join-show', username, roomId);
  };

  const toggleMute = () => {
    if (localStream)
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setIsMuted(!track.enabled);
      });
  };

  const leaveShow = () => {
    activeCalls?.forEach(call => {
      call.close();
    });
    setActiveCalls([]);
    setRemoteUsers([]);
  };

  const reset = async () => {
    peerServer?.destroy();
    socket?.disconnect();
    setActiveCalls([]);
    setRemoteUsers([]);
    setLocalStream(null);
    setRemoteStreams([]);
    setUsername('');
    setPeerId('');
    setShowId('');
  };

  return (
    <MainContext.Provider
      value={{
        username,
        setUsername,
        peerId,
        setPeerId,
        showId,
        setShowId,
        localStream,
        setLocalStream,
        remoteStreams,
        setRemoteStreams,
        remoteUsers,
        setRemoteUsers,
        initialize,
        joinShow,
        toggleMute,
        isMuted,
        setIsMuted,
        leaveShow,
        reset,
        activeCalls,
        setActiveCalls
      }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;


// 'inspiration': https://github.com/metehankurucu/react-native-video-calling-app/blob/main/src/store/MainProvider.tsx 