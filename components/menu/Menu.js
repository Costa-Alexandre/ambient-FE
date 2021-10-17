import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomButton from '../buttons/CustomButton';
import CustomIcon from '../icons/CustomIcons';
import UserPicture from '../userProfiles/UserPicture';


export default function Menu({ user }) {

  const dummyUri = "https://images.unsplash.com/photo-1631701119265-33ca2b80d00d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"

  return (
    <View style={styles.container}>
      <View>
        <UserPicture uri={dummyUri} size={40} />
      </View>
      <View style={styles.buttons}>
        <CustomButton icon='live' color='accent' size='rectangleSmall' />
        <CustomButton icon='calendar' color='buttonSolid' size='squareSmall' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 72,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    top: 0,
    left: 0,
    backgroundColor: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);`,
  },
  buttons: {
    width: 116,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});