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

  const { activeTrack, activeShow, setActiveShow, setActiveTrack, resetShow, resetTrack, remoteUsers } = useContext(MainContext);

  const leaveShow = () => {
    setActiveShow(resetShow());
    setActiveTrack(resetTrack())
  }
  
  const noMusic = () => {
    return (
      <View style={styles.noMusicContainer}>
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
            {remoteUsers.length+1} {remoteUsers.length ? 'users' : 'user'} speaking
          </Text>
        </View>
        <CustomButton title="Leave" color="button" size="slimShort" callback={leaveShow} />
      </View>
    )
  };

  const playMusic = () => {
    return (
        <View style={[styles.playContainer, {backgroundColor: 
        activeShow.averageColor ? activeShow.averageColor : colorStyles.card
        }]}>
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
          <CustomButton title="Leave" color="button" size="slimShort" callback={leaveShow} />
        </View>
    );
  };

  return (
    <PlayingSong callback={callback} bottomFlat={true} defaultBg={colorStyles.card} >
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
    marginRight: 16
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
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});


