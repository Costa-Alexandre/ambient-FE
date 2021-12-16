import React, { useContext, useState } from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";

import Logotype from 'assets/icons/Logotype';
import Logomark from 'assets/icons/Logomark';

import { colorStyles, fontStyles } from 'styles';

export default function LoginLogo({  }) {

  return (
    <View style={styles.logoContainer}>
      <View style={{width:120, height:120, marginBottom: 20}}>
        <Logomark />
      </View>
      <View style={{width: 160, height: 50}}>
        <Logotype />
      </View>
      <Text style={[fontStyles.subtitle, styles.demoText]}>DEMO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  demoText: {
    color: colorStyles.text
  },
});
