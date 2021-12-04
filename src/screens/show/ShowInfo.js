import React, { useContext, useEffect, useState } from "react";
import { remote as SpotifyRemote } from "react-native-spotify-remote";
import { StyleSheet, Text, View, ImageBackground, LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colorStyles, fontStyles } from "styles";
import { PlayingSong } from "ui";
import { MenuShow, LiveUsers } from "./components";
import { spotifyGetTrack } from "api/spotify";

const dummyBGImage = "https://f4.bcbits.com/img/a1024330960_10.jpg";

//TODO: remove when fixed
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function ShowInfo({ callback, goBack }) {
  const [activeTrack, setActiveTrack] = useState(null);
  const [spotifyImageUri, setSpotifyImageUri] = useState(dummyBGImage);

  const dummyOnPressHandler = async () => {
    let track = await spotifyGetTrack(dummyTrackId);
    setActiveTrack(track);
  };

  useEffect(() => {
    if (activeTrack) {
      setSpotifyImageUri(activeTrack.url);
      SpotifyRemote.playUri(activeTrack.uri);
    }
  }, [activeTrack]);

  return (
    <ScrollView style={[styles.outerContainer, { backgroundColor: "#404040" }]}>
      <ImageBackground
        source={{ uri: spotifyImageUri }}
        imageStyle={{ opacity: 0.1 }}
        style={styles.image}
      >
        <View style={styles.container}>
          <MenuShow callback={callback} goBack={goBack} />

          <View style={styles.titleContainer}>
            <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>
              {`showName`}
            </Text>
          </View>

          <View style={styles.songContainer}>
            <PlayingSong
              imageUri={spotifyImageUri}
              callback={dummyOnPressHandler}
            />
          </View>

          <View style={styles.usersContainer}>
            <LiveUsers />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 10,
    paddingBottom: 140,
  },
  titleContainer: {
    flexDirection: "column",
    marginHorizontal: 20,
  },
  songContainer: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
  usersContainer: {
    flexDirection: "column",
  },
  showName: {
    color: colorStyles.text,
    marginTop: 8,
    marginBottom: 16,
  },
  image: {
    flex: 1,
  },
});

const dummyTrackId = "4cY1UR4UCWzXqGm9lMvnQC";
const dummyTrackUri = "spotify:track:4cY1UR4UCWzXqGm9lMvnQC";
