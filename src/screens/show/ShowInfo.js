import React, { useContext, useEffect, useState } from "react";
import { remote as SpotifyRemote } from "react-native-spotify-remote";
import { StyleSheet, Text, View, ImageBackground, LogBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { colorStyles, fontStyles } from "styles";
import { MenuShow, LiveUsers, ShowSong } from "./components";
import { MainContext, DEMO_HOSTS } from "store/MainProvider";
import useAverageColor from 'hooks/averageColor';



//TODO: remove when fixed
LogBox.ignoreLogs([
  "VirtualizedLists should never be nested inside plain ScrollViews",
]);

export default function ShowInfo({ callback, goBack }) {
  const {activeTrack, updatePlayback, activeShow, setActiveShow, user, isMuted, remoteUsers } = useContext(MainContext);
  const [averageColor, setImageUri] = useAverageColor(activeTrack.imageUri?.uri, "#1B1B1F")

  const [stageUsers, setStageUsers] = useState([])

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
    let newStageUsers = [{...user, isMuted: isMuted, key: user.username},
      ...remoteUsers.map((participant, i) => {return {...participant.user, isMuted: participant.isMuted, key: participant.user.username}})]
    setStageUsers(newStageUsers)
  }, [user, remoteUsers, isMuted])

  const showContent = () => {
    return (
    <View style={styles.container}>
      <MenuShow callback={callback} goBack={goBack} />

      <View style={styles.titleContainer}>
        <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>
          {activeShow.name}
        </Text>
      </View>

      {DEMO_HOSTS.includes(user.username) || activeTrack.uri ? <View style={styles.songContainer}>
        <ShowSong
          callback={activeTrack.uri ? null : ()=>{SpotifyRemote.resume()}}
          onPause={() => SpotifyRemote.pause()}
          onPlay={() => SpotifyRemote.resume()}
        />
      </View> : null}

      <View style={styles.usersContainer}>
        <LiveUsers stage={stageUsers} />
      </View>
    </View>);
  }

  return (
    <ImageBackground
      source={activeTrack.imageUri ? activeTrack.imageUri : null}
      imageStyle={{ opacity: 0.15, backgroundColor: averageColor }}
      style={[styles.image, {backgroundColor: activeTrack.uri ? 'transparent' : colorStyles.card}]}
    >
      <ScrollView style={[styles.outerContainer, {}]}>
        {showContent()}
      </ScrollView>
    </ImageBackground>
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
