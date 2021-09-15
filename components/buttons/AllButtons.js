import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ButtonNormal from "./ButtonNormal";

export default function AllButtons() {
  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>All Buttons</Text>
      <ButtonNormal type='Accent' name='Accent' />
      <ButtonNormal type='Solid' name='Solid' />
      <ButtonNormal type='Transparent' name='Transparent' />
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: "#000",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
} );