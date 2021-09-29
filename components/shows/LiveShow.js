import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomIcon from '../icons/CustomIcons';
import CustomButton from '../buttons/CustomButton';
import ShowName from './ShowName';
import UserPicture from '../userProfiles/UserPicture';


export default function LiveShow({ showTitle="", showName="", showDescription="", amountSpeakers="", amountListeners="", users=[] }) {

  const userInfo = () => {
    return (
      <>
        <View style={styles.descriptionSpacer}></View>
        <View style={styles.descriptionSpacer}></View>

        <Text style={[fontStyles.body, styles.userInfoText]}>{amountSpeakers}</Text>
        <View style={styles.descriptionSpacer}></View>
        <CustomIcon name={"microphone"} size={12} color={colorStyles.text_secondary} />

        <View style={styles.descriptionSpacer}></View>
        <View style={styles.descriptionSpacer}></View>

        <Text style={[fontStyles.body, styles.userInfoText]}>{amountListeners}</Text>
        <View style={styles.descriptionSpacer}></View>
        <CustomIcon name={"headphones"} size={12} color={colorStyles.text_secondary} />
      </>
    )
  }

  return (
    <View style={styles.outerContainer}>
      <ShowName name={showTitle}/>

      <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>{showName}</Text>

      <Text style={[fontStyles.body, styles.showDescription]}>{showDescription}{userInfo()}</Text>

      <View style={styles.buttonRowContainer}>
        <CustomButton title="Listen" color="button_solid" size="normalMediumWide"/>

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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: 'blue',
  },

  showName: {
    color: colorStyles.text,
    marginTop: 8,
    marginBottom: 16
  },
  showDescription: {
    color: colorStyles.text_secondary,
    marginBottom: 16
  },
  userInfoText: {
    color: colorStyles.text_secondary,
  },
  descriptionSpacer: {
    width: 4
  },
  userImage: {
    marginLeft: 8
  }
});