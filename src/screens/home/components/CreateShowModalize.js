import React, {useRef, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';
import { CustomButton } from "ui";
import { fontStyles, colorStyles } from "styles";
import { postShow } from "api/shows";

export default function CreateShowModalize({ openModal, onClose, callback=null }) {

  const { ref, open, close } = useModalize();
  const [showName, setShowName] = useState("");
  const [showDescription, setShowDescription] = useState("");

  useEffect(() => {
    openModal && open();
  }, [])

  const createShow = async () => {
    const newShow = await postShow({
      name: showName,
      description: showDescription
    });
    close();
    callback(newShow);
  }


  return (
      <Modalize
          ref={ref}
          handlePosition={"inside"}
          handleStyle={{width: 44, height: 6, borderRadius: 14, backgroundColor: colorStyles.textSecondary}}
          onClose={onClose}
          modalHeight={353}
          withOverlay={true}
          modalStyle={styles.rootModalize}
        >
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <View style={styles.frame}>
              <Text style={composeText}>Show Name</Text>
              <TextInput 
                onChangeText={(showName) => setShowName(showName)}
                value={showName}
                style={[composeInput, {height: 46}]}
                placeholder="Name your show..."
                placeholderTextColor="#ffffff50"
              />
            </View>
            <View style={styles.frame}>
              <Text style={composeText}>Description</Text>
              <TextInput 
                onChangeText={(showDescription) => setShowDescription(showDescription)}
                value={showDescription}
                style={[composeInput, {height: 73}]}
                placeholder="Quickly describe your shows content here..."
                placeholderTextColor="#ffffff50"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
          <CustomButton size="startShowButton" color="button" title="Schedule" callback={null} />
          <CustomButton 
            size="startShowButton" 
            color="accent" 
            title="Start Show" 
            callback={() => createShow(
            )} />
          </View>
        </View>
      </Modalize>
  )
}


  const styles = StyleSheet.create({
    rootModalize: {
      backgroundColor: colorStyles.card,
      flex: 1,
    },
    text: {
      color: colorStyles.textSecondary,
    },
    content: {
      marginHorizontal: 20,
      marginTop: 54,
      marginBottom: 32,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    inputContainer: {
      flexDirection: "column",
    },
    frame: {
      flexDirection: "column",
      marginBottom: 32,
    },
    input: {
      width: "100%",
      backgroundColor: colorStyles.input,
      borderRadius: 8,
      color: colorStyles.text,
      paddingHorizontal: 20,
      marginTop: 8,
    },
  });

  const composeText = StyleSheet.compose([styles.text, fontStyles.subtext]);
  const composeInput = StyleSheet.compose(styles.input, fontStyles.body);