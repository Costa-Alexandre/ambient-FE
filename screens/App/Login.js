import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import { 
	auth as SpotifyAuth, 
	remote as SpotifyRemote, 
	ApiScope, 
	ApiConfig
} from 'react-native-spotify-remote';



// Spotify code

const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "ambient://auth",
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
      SpotifyRemote.connect(session.accessToken)
      .then(() => {
        navigation.navigate(screen);
        console.log(screen);
      })
      .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
  };

    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>ambient</Text>
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