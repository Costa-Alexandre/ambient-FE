import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import { 
	auth as SpotifyAuth, 
	remote as SpotifyRemote, 
	ApiScope, 
	ApiConfig
} from 'react-native-spotify-remote';

import io from "socket.io-client";
import Peer from 'react-native-peerjs';

// Socket.io code
const socket = io("http://192.168.0.157:3001");

socket.on("peer_id", peer_id => {
  myPeer.connect(peer_id);
});

// Peer.js code

const myPeer = new Peer({
  host: "0.peerjs.com",
  port: 443,
  path: "/",
});

myPeer.on('open', id => socket.emit('peer_id', id));
myPeer.on('connection', () => console.log('peers connected'));

// Spotify code

const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "modradio://auth",
	tokenRefreshURL: "https://modradio-test.glitch.me/refresh",
	tokenSwapURL: "https://modradio-test.glitch.me/swap",
	scopes: [
    ApiScope.AppRemoteControlScope, ApiScope.UserFollowReadScope
  ]
}

// React code

export default function Login({ navigation }) {

  const onPress = (screen) => (e) => {
    

    SpotifyAuth.authorize(spotifyConfig)
    .then(session => {
      console.log(`session: ${session.accessToken}`)
      SpotifyRemote.connect(session.accessToken)
      .then(() => {
        // SpotifyRemote.playUri("spotify:track:6IA8E2Q5ttcpbuahIejO74")
        navigation.navigate(screen);
        console.log(screen);
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  };

    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>The Real App</Text>
        <CustomButton 
          title='Continue with Spotify'
          color='accent' 
          size='loginButton' 
          callback={onPress('App')}
        />
        <CustomButton 
          title='Sign up without Spotify'
          color='buttonSolid' 
          size='loginButton' 
          // callback={onPress('')}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});