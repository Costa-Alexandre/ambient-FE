import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colorStyles } from '../styles/colorStyles';
import { fontStyles } from '../styles/fontStyles';
import CustomIcon from './CustomIcons';


export default function ShowName({ name }) {

  if (!name) {
    return <></>
  }

  return (
    <View style={styles.outerContainer}>
      <CustomIcon name={"live"} size={20} color={colorStyles.accent} />
      <Text style={[fontStyles.subtitleSecondary, styles.text]} numberOfLines={1}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
  },
  text: {
    color: colorStyles.accent,
    lineHeight: 20,
    marginLeft: 4,
    flex: 1
  }
});