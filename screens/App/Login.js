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
import { signInUser, signUpUser, userIsSignedUp } from '../../api/users';


const serverBaseUrl = "http://192.168.178.22:3000"

const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "modradio://auth",
	tokenRefreshURL: `${serverBaseUrl}/refresh`,
	tokenSwapURL: `${serverBaseUrl}/swap`,
	scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    ApiScope.UserReadEmailScope
  ]
}


export default function Login({ navigation }) {

  const signIn = async (e) => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig)
      await SpotifyRemote.connect(session.accessToken)

      const spotifyData = await spotifyGetMe()
      const username = spotifyData.id

      const isSignedUp = await userIsSignedUp(username)

      let userData = null
      if (isSignedUp) {
        userData = await signInUser(username)
        console.log("sign in")
      } else {
        userData = await signUpUser(spotifyData)
        console.log("sign up")
      }

      // The user is signed in now
      // NOTE: We have our own user data + the spotify user data at this point and can use it in the app
      console.log(userData)
      navigation.navigate('App')

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <CustomButton 
        title='Continue with Spotify'
        color='accent' 
        size='loginButton' 
        callback={signIn}
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