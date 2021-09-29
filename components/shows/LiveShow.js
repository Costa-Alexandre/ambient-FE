import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomIcon from '../icons/CustomIcons';


export default function LiveShow({  }) {

  return (
    <View style={styles.outerContainer}>
      <Text style={{color:'white'}}>show name</Text>
      <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>Name of the show</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: colorStyles.card,
  },
  showName: {
    color: colorStyles.text
  }
});