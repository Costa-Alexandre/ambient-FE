import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomButton, UserPicture } from 'ui';


export default function MenuHome({ user, size=40, callback=null }) {

  return (
    <View style={styles.container}>
      <View>
        <UserPicture uri={user.avatar} size={size} name={user.displayName[0]} />
      </View>
      <View style={styles.buttons}>
        <CustomButton icon='live' color='accent' size='rectangleSmall' callback={callback} />
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
    top: 1,
    left: 0,
    backgroundColor: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);`,
  },
  buttons: {
    width: 116,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});