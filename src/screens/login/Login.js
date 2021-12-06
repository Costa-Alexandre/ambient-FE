import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
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

  const [awaitingAutoSignIn, setAwaitingAutoSignIn] = useState(true)
  const [awaitingSignIn, setAwaitingSignIn] = useState(false)

  const { 
    setUser,
    setSpotifyData
  } = useContext(MainContext);


  const setWasSignedIn = async (value) => {
    let wasSignedIn = false
    try {
      await AsyncStorage.setItem('was_signed_in', JSON.stringify(value))
    } catch(e) {
      console.log(e)
    }
    return wasSignedIn
  }

  const getWasSignedIn = async () => {
    return false
    let wasSignedIn = false
    try {
      wasSignedIn = await AsyncStorage.getItem('was_signed_in')
      if (wasSignedIn) wasSignedIn = JSON.parse(wasSignedIn)
    } catch(e) {
      console.log(e)
    }
    return wasSignedIn
  }


  const signIn = async () => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig)
      await SpotifyRemote.connect(session.accessToken)

      const spotifyData = await spotifyGetMe()
      setSpotifyData(spotifyData)
      const username = spotifyData.id

      const isSignedUp = await userIsSignedUp(username)

      let userData = null;
      if (isSignedUp) {
        userData = await signInUser(username)
      } else {
        userData = await signUpUser(spotifyData)
      }
      setUser(userData);

      await setWasSignedIn(true)
      navigation.navigate("Home")
    } catch (error) {
      setAwaitingAutoSignIn(false)
      setAwaitingSignIn(false)
      console.log(error)
    }
  }


  const signInPressed = async (e) => {
    setAwaitingSignIn(true)
  };


  useEffect(() => {
    if (awaitingSignIn) {
      signIn()
    }
  }, [awaitingSignIn])


  useEffect(() => {
    if (awaitingAutoSignIn) {
      getWasSignedIn()
      .then(wasSignedIn => {
        if (wasSignedIn) {
          signIn()
        } else {
          setAwaitingAutoSignIn(false)
        }
      })
    }
  }, [awaitingAutoSignIn])


  return (
    <View style={styles.container}>          
      {awaitingAutoSignIn ? <LoadingFullScreen/> :
        <View style={styles.contentContainer}>
          <BubbleBackground/>
          <LoginLogo/>

          <View style={styles.buttonContainer}>
            <CustomButton
              title={awaitingSignIn ? "loading" : "Continue with Spotify"}
              color="accent"
              size="loginButton"
              loading={awaitingSignIn}
              callback={signInPressed}
            />
          </View>
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
  contentContainer: {
    marginBottom: 100,
    width: '100%',
    flexGrow: 1,
    flex: 1,
  },
  buttonContainer: {
    height: 44,
    marginHorizontal: 20
  }
});
