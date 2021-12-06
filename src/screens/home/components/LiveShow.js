import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colorStyles, fontStyles } from 'styles'
import { CustomIcon, CustomButton, UserPicture, PlayingSong } from 'ui';


export default function LiveShow({ 
  showName="",
  showDescription="",
  amountSpeakers="",
  amountListeners="",
  imageUri="",
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

      <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>{showName}</Text>

      <View style={styles.songContainer}>
        {imageUri !== "" && (<PlayingSong imageUri={imageUri} />)}
      </View>

      <Text style={[fontStyles.body, styles.showDescription]}>{showDescription}{". "}{userInfo()}</Text>
      

      <View style={styles.buttonRowContainer}>
        <CustomButton title="Listen" color="buttonSolid" size="normalMediumWide" callback={listenCallback}/>

        <View style={styles.userImageContainer}>
          {dummyUsers.map(user => <View style={styles.userImage}>
            <UserPicture
              size={32}
              uri={null}
              name={"-"}
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
    marginTop: 16,
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

const dummyUsers = [];