import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomIcon from '../icons/CustomIcons';
import CustomButton from '../buttons/CustomButton';
import ShowName from './ShowName';
import UserPicture from '../userProfiles/UserPicture';
import PlayingSong from '../music/PlayingSong';


export default function LiveShow({ 
  showId="",
  showTitle="",
  showName="",
  showDescription="",
  amountSpeakers="",
  amountListeners="",
  imageUri=null,
  users=[], 
  listenCallback=null
}) {

  const userInfo = () => {
    return (
      <Text style={styles.userInfoContainer}>
        <Text style={[fontStyles.body, styles.userInfoText]}>{amountSpeakers}</Text>
        <View style={styles.descriptionSpacer}></View>
        <CustomIcon name={"microphone"} size={12} color={colorStyles.textSecondary} />

        <View style={styles.descriptionSpacer}></View>
        <View style={styles.descriptionSpacer}></View>

        <Text style={[fontStyles.body, styles.userInfoText]}>{amountListeners}</Text>
        <View style={styles.descriptionSpacer}></View>
        <CustomIcon name={"headphones"} size={12} color={colorStyles.textSecondary} />
      </Text>
    )
  }

  return (
    <View style={styles.outerContainer}>
      <ShowName name={showTitle}/>

      <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>{showName}</Text>

      <View style={styles.songContainer}>
        <PlayingSong
          uri={imageUri}
        />
      </View>

      <Text style={[fontStyles.body, styles.showDescription]}>{showDescription}{}</Text>
      {userInfo()}

      <View style={styles.buttonRowContainer}>
        <CustomButton title="Listen" color="buttonSolid" size="normalMediumWide" callback={() => listenCallback} />

        <View style={styles.userImageContainer}>
          {users.map(user => <View style={styles.userImage}>
            <UserPicture
              size={32}
              uri={null} 
              callback={() => {}}
            />
          </View>)}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  outerContainer: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: colorStyles.card,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userImageContainer: {
    flexDirection: 'row',
  },
  userInfoContainer: {
    marginBottom: 16
  },
  songContainer: {
    marginBottom: 16,
  },

  showName: {
    color: colorStyles.text,
    marginTop: 8,
    marginBottom: 16
  },
  showDescription: {
    color: colorStyles.textSecondary,
  },
  userInfoText: {
    color: colorStyles.textSecondary,
  },
  descriptionSpacer: {
    width: 4
  },
  userImage: {
    marginLeft: 8
  }
});