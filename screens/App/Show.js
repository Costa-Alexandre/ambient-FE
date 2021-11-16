import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import {remote as SpotifyRemote} from 'react-native-spotify-remote';

import io from "socket.io-client";
import Peer from 'react-native-peerjs';


const socketConnection = (roomId) => {

  
  const socket = io("http://192.168.0.157:3001");
  
  socket.emit('join_room', roomId);
  socket.on('joined_room', roomId => console.log(`You joined room ${roomId}`));
  socket.on('user_joined', roomId => console.log(`New user joined room ${roomId}`))
  
  const myPeer = new Peer({
    host: "0.peerjs.com",
    port: 443,
    path: "/",
  });

  myPeer.on('open', id => {
    console.log(`myPeer opened with id: ${id}`);
    socket.emit('peer_id', id, roomId);
  });

  socket.on("peer_id", peer_id => {
    console.log(`App received a peer id: ${peer_id}`);
    myPeer.connect(peer_id);
  });
  
  myPeer.on('connection', (DataCon) => {
    console.log(`peer connected to peer id: ${JSON.stringify(DataCon.peer)}`)
  });

}

export default function Show({ route: {params: showId} }) {

  const dummyOnPressHandler = () => {
    SpotifyRemote.playUri("spotify:track:4cY1UR4UCWzXqGm9lMvnQC")
  }

  socketConnection(showId);

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`${showId}`}</Text> 
        <CustomButton icon="play" callback={dummyOnPressHandler} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  }
});