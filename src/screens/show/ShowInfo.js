import React, { useContext, useEffect, useState } from "react";
import { remote as SpotifyRemote } from "react-native-spotify-remote";
import { StyleSheet, Text, View, ImageBackground, LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colorStyles, fontStyles } from "styles";
import { MenuShow, LiveUsers, ShowSong } from "./components";
import { spotifyPlayTrack } from "api/spotify";
import { MainContext } from "store/MainProvider";
import useAverageColor from 'hooks/averageColor';



//TODO: remove when fixed
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function ShowInfo({ callback, goBack }) {
  const {activeTrack, setActiveTrack, activeShow, setActiveShow, user, isMuted, remoteUsers, remoteStreams } = useContext(MainContext);
  const [averageColor, setImageUri] = useAverageColor(activeTrack.imageUri?.uri, "#1B1B1F")

  const [stageUsers, setStageUsers] = useState([])

  const dummyOnPressHandler = () => {
    spotifyGetTrack(dummyTrackId).then(track => {
      setActiveTrack(track);
      SpotifyRemote.playUri(track.uri);
      console.log(`Set track ${track.name}, uri: ${track.uri} and start playing!`)
    })
  };

  useEffect(() => {
    setImageUri(activeTrack.imageUri?.uri);
  }, [activeTrack])

  useEffect(() => {
    const newActiveShow = {
      ...activeShow,
      averageColor: averageColor
    }
    setActiveShow({...newActiveShow});
  }, [averageColor])

  useEffect(() => {
    console.log(remoteUsers)
    let newStageUsers = [{...user, isMuted: isMuted, key: user.username},
      ...remoteUsers.map((userItem, i) => {return {...userItem.user, isMuted: false, key: userItem.user.username}})]
    setStageUsers(newStageUsers)
  }, [user, remoteUsers, isMuted, remoteStreams])

  const showContent = () => {
    return (
    <View style={styles.container}>
      <MenuShow callback={callback} goBack={goBack} />

      <View style={styles.titleContainer}>
        <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>
          {activeShow.name}
        </Text>
      </View>

      <View style={styles.songContainer}>
        <ShowSong
          callback={()=>{}}
          onPause={() => SpotifyRemote.pause()}
          onPlay={() => SpotifyRemote.playUri("")}
        />
      </View>

      <View style={styles.usersContainer}>
        <LiveUsers stage={stageUsers} />
      </View>
    </View>);
  }

  return (
    <ScrollView style={[styles.outerContainer, { backgroundColor: averageColor }]}>
      {activeTrack.imageUri && <ImageBackground
        source={activeTrack.imageUri}
        imageStyle={{ opacity: 0.1 }}
        style={[styles.image, {backgroundColor: "rgba(0, 0, 0, 0.65)"}]}
      >
        {showContent()}
      </ImageBackground>}
      {!activeTrack.imageUri && showContent()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  container: {
    paddingVertical: 10,
    paddingBottom: 140
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
