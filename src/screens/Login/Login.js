import React from "react";
import { View, StyleSheet } from "react-native";

import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
} from "react-native-spotify-remote";

import { CustomButton } from "ui";
import { spotifyGetMe } from "api/spotify";
import { signInUser, signUpUser, userIsSignedUp } from "api/users";
import { spotifyConfig } from "api/config";

export default function Login({ navigation }) {
  const signIn = async (e) => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);

      const spotifyData = await spotifyGetMe();
      const username = spotifyData.id;

      const isSignedUp = await userIsSignedUp(username);

      let userData = null;
      if (isSignedUp) {
        userData = await signInUser(username);
        console.log("sign in");
      } else {
        userData = await signUpUser(spotifyData);
        console.log("sign up");
      }

      // The user is signed in now
      // NOTE: We have our own user data + the spotify user data at this point and can use it in the app
      console.log(userData);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  // DELETE: flag to skip authentication
  const ignoreAuth = true;

  return (
    <View style={styles.container}>
      <CustomButton
        title="Continue with Spotify"
        color="accent"
        size="loginButton"
        // DELETE line below and replace by callback={signIn}
        callback={ignoreAuth ? () => navigation.navigate("Home") : signIn}
      />
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
});
