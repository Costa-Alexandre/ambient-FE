import React, {useContext, useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { CustomButton, PlayingSong } from "ui";
import { colorStyles, fontStyles } from "styles";
import { MainContext } from "store/MainProvider";

export default function ShowSong({ callback=null, onPause=null, onPlay=null }) {

  const { trackPaused, activeTrack } = useContext(MainContext);
  
  const noMusic = () => {
    return (
      <View style={styles.noMusicContainer}>
        <Text
          style={[fontStyles.subtitleSecondary, styles.noMusicText]}
          numberOfLines={1}
        >
          Tap to pick music
        </Text>
        <CustomButton icon="spotify" size={40} callback={callback} />
      </View>
    )
  };
  

  const playMusic = () => {
    return (
      <ImageBackground
        style={[styles.image, { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}
        source={activeTrack.imageUri}
        imageStyle={{ opacity: 0.2 }}
      >
        <View style={styles.playContainer}>
          <Image style={styles.coverImage} source={activeTrack.imageUri} />
          <View style={styles.textContainer}>
            <Text
              style={[fontStyles.subtitleSecondary, styles.songText]}
              numberOfLines={1}
            >
              {activeTrack.name}
            </Text>
            <Text
              style={[fontStyles.subtitleSecondary, styles.artistText]}
              numberOfLines={1}
            >
              {activeTrack.artists}
            </Text>
          </View>
          <View style={{marginLeft: 20}}>
            {!trackPaused && <CustomButton icon="pause" size={40} callback={() => {
              onPause();
            }} />}
            {trackPaused && <CustomButton icon="play" size={40} callback={() => {
              onPlay();
            }} />}
          </View>
            <View style={{marginLeft: 20}}>
              <CustomButton icon="spotify" size={40} callback={callback} />
            </View>
        </View>
      </ImageBackground>
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
  },
});


