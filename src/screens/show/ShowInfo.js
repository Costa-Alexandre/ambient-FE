import React, { useContext, useEffect } from "react";
import { remote as SpotifyRemote } from "react-native-spotify-remote";
import { StyleSheet, Text, View, ImageBackground, LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colorStyles, fontStyles } from "styles";
import { MenuShow, LiveUsers, ShowSong } from "./components";
import { spotifyGetTrack } from "api/spotify";
import { MainContext } from "store/MainProvider";
import useAverageColor from 'hooks/averageColor';



//TODO: remove when fixed
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function ShowInfo({ callback, goBack }) {
  const {activeTrack, setActiveTrack, activeShow } = useContext(MainContext);
  const [averageColor, setImageUri] = useAverageColor(activeTrack.imageUri.uri, "#1B1B1F")

  const dummyOnPressHandler = () => {
    spotifyGetTrack(dummyTrackId).then(track => {
      setActiveTrack(track)
      SpotifyRemote.playUri(track.uri);
      console.log(`Set track ${track.name}, uri: ${track.uri} and start playing!`)
    })
  };

  useEffect(() => {
    setImageUri(activeTrack.imageUri.uri)
  }, [activeTrack])

  return (
    <ScrollView style={[styles.outerContainer, { backgroundColor: averageColor }]}>
      <ImageBackground
        source={activeTrack.imageUri}
        imageStyle={{ opacity: 0.1 }}
        style={[styles.image, {backgroundColor: "rgba(0, 0, 0, 0.65)"}]}
      >
        <View style={styles.container}>
          <MenuShow callback={callback} goBack={goBack} />

          <View style={styles.titleContainer}>
            <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>
              {activeShow.name}
            </Text>
          </View>

          <View style={styles.songContainer}>
            <ShowSong
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

const dummyTrackId = "11dFghVXANMlKmJXsNCbNl";