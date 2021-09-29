import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { fontStyles } from "../styles/fontStyles";
import LiveShow from '../components/shows/LiveShow';
import ShowName from '../components/shows/ShowName';
import PlayingSong from '../components/music/PlayingSong';


export default function Shows() {
  return (
    <ScrollView style={styles.container}>

      <ShowName name={"SHOW NAME"} />

      <LiveShow
        showTitle="SHOW NAME"
        showName="Show Name"
        showDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. fejspo eos jo o oeo eo  fes  s s"
        amountSpeakers="5"
        amountListeners="50"
      />

      <PlayingSong/>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 16
  },
});

const titleStyle = StyleSheet.compose(
  fontStyles.title,
  { color: "#fff" }
)