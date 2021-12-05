import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colorStyles } from "styles";

export default function PlayingSong({ children, callback=null }) {

  return (
    <TouchableOpacity
      style={[styles.outerContainer, { backgroundColor: colorStyles.buttonSolid }]}
      onPress={callback}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 8,
    height: 64,
    overflow: "hidden",
    backgroundColor: colorStyles.buttonSolid,
  }
});
