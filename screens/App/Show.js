import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';
import { ChatInput, ChatHeader, ChatComment } from '../../components/chat/ChatComponents';
import io from "socket.io-client";
import Peer from 'react-native-peerjs';
import { Modalize } from 'react-native-modalize';
import {remote as SpotifyRemote} from 'react-native-spotify-remote';
import ShowInfo from '../../components/shows/ShowInfo';


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
    // console.log(`myPeer opened with id: ${id}`);
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

  
  const modalizeRef = useRef(null);
  
  const onToggle = (chatOpen) => {
    if(chatOpen) {
      // open chat modal
      modalizeRef.current?.open('top');
    } else {
      // close chat modal
      modalizeRef.current?.close('alwaysOpen');
    }
    
  };
  
  socketConnection(showId);
  
  const [chatOpen, setChatOpen] = useState(false)
  
  useEffect(() => {
    onToggle(chatOpen);
  }, [chatOpen])
  

  // Dummy variables - DELETE

  const dummyOnPressHandler = () => {
    SpotifyRemote.playUri("spotify:track:4cY1UR4UCWzXqGm9lMvnQC")
  }

  const dummyMessages = [
    {
      key:'1', 
      imageUri: "https://randomuser.me/api/portraits/men/1.jpg",
      username: 'Username', 
      payload: 'Comment text'
    },
    {
      key:'2',
      imageUri: "https://randomuser.me/api/portraits/women/1.jpg",
      username: 'Username',
      payload: 'Comment text'
    }
  ]

  const image = { uri: 'https://f4.bcbits.com/img/a1024330960_10.jpg'}

  return (
    <>
    <View style={[styles.outerContainer, {backgroundColor: '#404040'}]}>
      <ImageBackground 
          source={image} 
          imageStyle={{opacity:0.1}} 
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.text}>{`Show ${showId}`}</Text>
          <CustomButton icon="play" callback={dummyOnPressHandler} />
      </ImageBackground>
    </View>

      <Modalize 
        ref={modalizeRef}
        alwaysOpen={140}
        withHandle={false}
        HeaderComponent={() => <ChatHeader open={false} callback={(state) => setChatOpen(state)} />}
        FooterComponent={() => <ChatInput />}
        modalHeight={404}
        withOverlay={false}
        modalStyle={styles.rootModalize}
        flatListProps={{
          data: dummyMessages,
          renderItem: ({ item }) => 
            <ChatComment 
              imageUri={item.imageUri} 
              username={item.username}
              payload={item.payload}
            />
        }}
      >
      </Modalize>
    </>
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
  },
  rootModalize: {
    backgroundColor: '#000',
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  outerContainer: {
    flex: 1,
  }
});
