import React, { useContext, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colorStyles } from "styles";
import useAverageColor from 'hooks/averageColor';
import { MainContext } from "store/MainProvider";

export default function PlayingSong({ children, callback=null, bottomFlat=false }) {
  const { activeTrack } = useContext(MainContext);
  const [averageColor, setImageUri] = useAverageColor(activeTrack.imageUri?.uri, colorStyles.buttonSolid);

  useEffect(() => {
    setImageUri(activeTrack.imageUri?.uri)
  }, [activeTrack])

  return (
    <>
      <TouchableOpacity
        style={[bottomFlat ? styles.outerContainerFlat : styles.outerContainer, 
        { backgroundColor: averageColor}]}
        onPress={callback}
      >
        {children}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    height: 64,
    overflow: "hidden",
    borderRadius: 8,
  },
  outerContainerFlat: {
    height: 64,
    overflow: "hidden",
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
  }
});
