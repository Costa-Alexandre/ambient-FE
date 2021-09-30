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
      
      <PlayingSong
        uri="https://f4.bcbits.com/img/a1024330960_10.jpg"
      />

      <LiveShow
        showTitle="SHOW NAME"
        showName="Show Name"
        showDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. fejspo eos jo o oeo "
        amountSpeakers="5"
        amountListeners="50"
        imageUri="https://f4.bcbits.com/img/a1024330960_10.jpg"
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 16
  },
});