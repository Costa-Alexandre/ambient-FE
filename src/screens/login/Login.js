import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
} from "react-native-spotify-remote";

import { CustomButton } from "ui";
import { spotifyGetMe } from "api/spotify";
import { signInUser, signUpUser, userIsSignedUp } from "api/users";
import { spotifyConfig } from "api/config";
import { MainContext } from "store/MainProvider";
import LoadingFullScreen from "./components/LoadingFullScreen";
import BubbleBackground from "./components/BubbleBackground";
import LoginLogo from "./components/LoginLogo";

export default function Login({ navigation }) {

  const [awaitingSignIn, setAwaitingSignIn] = useState(false)

  const { 
    setUser,
    setSpotifyData
  } = useContext(MainContext);

  const signIn = async () => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);

      console.log(Object.keys(session))

      const spotifyData = await spotifyGetMe();
      setSpotifyData(spotifyData)
      const username = spotifyData.id

      const isSignedUp = await userIsSignedUp(username);

      let userData = null;
      if (isSignedUp) {
        userData = await signInUser(username);
        console.log("sign in");
      } else {
        userData = await signUpUser(spotifyData);
        console.log("sign up");
      }
      setUser(userData);

      setAwaitingSignIn(false)
      navigation.navigate("Home");
    } catch (error) {
      setAwaitingSignIn(false)
      console.log(error);
    }
  }

  const getStorageToken = async () => {
    let token = null
    try {
      token = await AsyncStorage.getItem('refresh_token')
    } catch(e) {
      console.log(e)
      // error reading value
    }
    return token
  }

  const signInPressed = async (e) => {
    setAwaitingSignIn(true)
  };

  useEffect(() => {
    if (awaitingSignIn) {
      getStorageToken()
      .then(refresh_token => {
        if (refresh_token) {
          console.log(refresh_token)
        } else {
          signIn()
        }
      })
    }
  }, [awaitingSignIn])


  // DELETE: flag to skip authentication
  const ignoreAuth = !true;

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={"transparent"}
        barStyle={"light-content"} />
          
      {awaitingSignIn ? <LoadingFullScreen/> :
        <View style={styles.buttonContainer}>
          <BubbleBackground/>
          <LoginLogo/>

          <CustomButton
            title="Continue with Spotify"
            color="accent"
            size="loginButton"
            // DELETE line below and replace by callback={signIn}
            callback={ignoreAuth ? () => navigation.navigate("Home") : signInPressed}
          />
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom:100
  },
});
