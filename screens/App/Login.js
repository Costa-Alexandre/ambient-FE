import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import { 
	auth as SpotifyAuth, 
	remote as SpotifyRemote, 
	ApiScope, 
	ApiConfig
} from 'react-native-spotify-remote';


const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "modradio://auth",
	tokenRefreshURL: "https://modradio-test.glitch.me/refresh",
	tokenSwapURL: "https://modradio-test.glitch.me/swap",
  // authType: "TOKEN",
	scopes: [
    ApiScope.AppRemoteControlScope
  ]
}


export default function Login({ navigation }) {

  const onPress = (screen) => (e) => {
    // navigation.navigate(screen);
    // console.log(screen);

    // SpotifyAuth.getSession()
    // .then(existingSession => {
    //   console.log(existingSession)
    // })
    // .catch(error => console.log(error))

    SpotifyAuth.authorize(spotifyConfig)
    .then(session => {
      console.log(session)
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
          callback={onPress('Home')}
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