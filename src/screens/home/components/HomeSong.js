import React, {useContext, useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import { CustomButton, PlayingSong } from "ui";
import { colorStyles, fontStyles } from "styles";
import { MainContext } from "store/MainProvider";

export default function HomeSong({ callback=null }) {

  const { activeTrack, activeShow, setActiveShow, setActiveTrack, resetShow, resetTrack } = useContext(MainContext);
  
  const noMusic = () => {
    return (
      <View style={styles.noMusicContainer}>
          <Text
            style={[fontStyles.subtitleSecondary, styles.noMusicText]}
            numberOfLines={1}
          >
            No song playing
          </Text>
        </View>
    )
  };

  const playMusic = () => {
    return (
        <View style={styles.playContainer}>
          <Image style={styles.coverImage} source={activeTrack.imageUri} />
          <View style={styles.textContainer}>
            <Text
              style={[fontStyles.subtitleSecondary, styles.songText]}
              numberOfLines={1}
            >
              {activeShow.name}
            </Text>
            <Text
              style={[fontStyles.subtitleSecondary, styles.artistText]}
              numberOfLines={1}
            >
              {`${activeTrack.name} - ${activeTrack.artist}`}
            </Text>
          </View>
          <CustomButton title="Leave" color="button" size="slimShort" callback={
            () => {
              setActiveShow(resetShow());
              setActiveTrack(resetTrack())
            }
          } />

        </View>
    );
  };

  return (
    <PlayingSong callback={callback} >
      {activeTrack.uri !== "" && playMusic()}
      {activeTrack.uri == "" && noMusic()}
    </PlayingSong>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  songText: {
    color: colorStyles.text,
    marginBottom: 8,
  },
  artistText: {
    color: colorStyles.textSecondary,
  },
  noMusicContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  noMusicText: {
    color: colorStyles.text,
  },
  image: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  playContainer: {
    flex: 1,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colorStyles.card,
  },
});


