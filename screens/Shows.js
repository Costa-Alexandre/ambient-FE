import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { fontStyles } from "../styles/fontStyles";
import LiveShow from '../components/shows/LiveShow';
import ShowName from '../components/shows/ShowName';


export default function Shows() {
  return (
    <ScrollView style={styles.container}>

      <ShowName name={"SHOW NAME"} />
      <LiveShow />

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