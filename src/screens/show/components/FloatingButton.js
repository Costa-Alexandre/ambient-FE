import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomButton } from 'ui';

export default function FloatingButton({ active=false, callback=null, icon="mute" }) {

  return (
  <View style={styles.floating}>
    <CustomButton 
      icon={icon}
      size="squareBig"
      callback={callback}
      color={active ? "warning" : "button"}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  floating: {
    position: "absolute",
    top: -70,
    right: 20,
    zIndex: 10,
  }
})