import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import { 
	auth as SpotifyAuth, 
	remote as SpotifyRemote, 
	ApiScope, 
	ApiConfig
} from 'react-native-spotify-remote';

import { spotifyGetMe } from '../../api/spotify';
import { signInUser } from '../../api/users';


const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "modradio://auth",
	tokenRefreshURL: "http://127.0.0.1:3000/refresh",
	tokenSwapURL: "http://127.0.0.1:3000/swap",
	scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    ApiScope.UserReadEmailScope
  ]
}


export default function Login({ navigation }) {

  const signIn = () => (e) => {
    
    SpotifyAuth.authorize(spotifyConfig)
    .then(session => {
      SpotifyRemote.connect(session.accessToken)
      .then(() => {
        // SpotifyRemote.playUri("spotify:track:6IA8E2Q5ttcpbuahIejO74")
        spotifyGetMe()
        .then(userData => {
          signInUser(userData)
          // navigation.navigate('App')
        })
        .catch(error => console.log(error))
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  };

  return (
    <View style={styles.container}>
      <CustomButton 
        title='Continue with Spotify'
        color='accent' 
        size='loginButton' 
        callback={signIn()}
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