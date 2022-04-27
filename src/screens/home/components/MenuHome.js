import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomButton, UserPicture } from 'ui';

export default function MenuHome({ user, size = 40, callback = null }) {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)']}
      style={styles.container}
    >
      <>
        <UserPicture uri={user.avatar} size={size} name={user.displayName} />
      </>
      <View style={styles.buttons}>
        <CustomButton
          icon="live"
          color="accent"
          size="rectangleSmall"
          callback={callback}
        />
        <CustomButton icon="calendar" color="buttonSolid" size="squareSmall" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 74,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    top: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  buttons: {
    width: 116,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
