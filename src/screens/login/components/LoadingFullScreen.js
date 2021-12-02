import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingFullScreen() {

  return (
    <View style={styles.container}>
      <ActivityIndicator color={"white"} size="large"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
