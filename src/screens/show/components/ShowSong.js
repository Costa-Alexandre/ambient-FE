import React, {useContext} from "react";
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

export default function ShowSong({ callback=null }) {

  const { activeTrack } = useContext(MainContext);
  
  const noMusic = () => {
    return (
      <View style={styles.noMusicContainer}>
          <Text
            style={[fontStyles.subtitleSecondary, styles.noMusicText]}
            numberOfLines={1}
          >
            Tap to pick music
          </Text>
          <CustomButton icon="spotify" callback={callback} />
        </View>
    )
  };

  const playMusic = () => {
    return (
      <ImageBackground
        style={styles.image}
        source={activeTrack.imageUri}
        imageStyle={{ opacity: 0.1 }}
      >
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
            {activeTrack.artist}
          </Text>
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
  image: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    flexDirection: "row",
  },
  noMusicContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  noMusicText: {
    color: colorStyles.text,
  }
});

const dummyBGImage = "https://f4.bcbits.com/img/a1024330960_10.jpg";
const dummyColor = "#404040";
