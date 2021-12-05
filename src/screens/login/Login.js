import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";

import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
} from "react-native-spotify-remote";

import LoadingFullScreen from "./components/LoadingFullScreen";
import { CustomButton } from "ui";
import { spotifyGetMe } from "api/spotify";
import { signInUser, signUpUser, userIsSignedUp } from "api/users";
import { spotifyConfig } from "api/config";
import { MainContext } from "store/MainProvider";
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

  const signInPressed = async (e) => {
    setAwaitingSignIn(true)
  };

  useEffect(() => {
    if (awaitingSignIn) {
      signIn()
    }
  }, [awaitingSignIn])

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
            callback={signInPressed}
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
