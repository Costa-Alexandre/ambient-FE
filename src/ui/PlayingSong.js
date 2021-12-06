import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colorStyles } from "styles";
import useAverageColor from 'hooks/averageColor';
import { MainContext } from "store/MainProvider";

export default function PlayingSong({ children, callback=null }) {
  const { activeTrack } = useContext(MainContext);
  const [averageColor, setImageUri] = useAverageColor(activeTrack.imageUri.uri, "#1B1B1F")

  useEffect(() => {
    setImageUri(activeTrack.imageUri.uri)
  }, [activeTrack])

  return (
    <TouchableOpacity
      style={[styles.outerContainer, { backgroundColor: averageColor }]}
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
