import React, { useContext, useState } from "react";
import { View, Text, Image, StatusBar, StyleSheet } from "react-native";

import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
} from "react-native-spotify-remote";

import { CustomButton } from "ui";
import { spotifyGetMe } from "api/spotify";
import { signInUser, signUpUser, userIsSignedUp } from "api/users";
import { spotifyConfig } from "api/config";
import { MainContext } from "store/MainProvider";
import BubbleBackground from "./components/BubbleBackground";
import LoginLogo from "./components/LoginLogo";

export default function Login({ navigation }) {

  const { 
    setUser,
    setSpotifyData
  } = useContext(MainContext);

  const signIn = async (e) => {
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

      // The user is signed in now
      // NOTE: We have our own user data + the spotify user data at this point and can use it in the app
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  // DELETE: flag to skip authentication
  const ignoreAuth = !true;

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={"transparent"}
        barStyle={"light-content"} />

      <BubbleBackground/>

      <LoginLogo/>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Sign in with Spotify"
          color="accent"
          size="loginButton"
          // DELETE line below and replace by callback={signIn}
          callback={ignoreAuth ? () => navigation.navigate("Home") : signIn}
        />
      </View>
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
