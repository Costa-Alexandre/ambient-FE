import React, {useRef, useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { CustomButton } from "ui";
import { fontStyles, colorStyles } from "styles";

export default function CreateShowModalize() {

  const modalizeRef = useRef(null);
  const [showName, setShowName] = useState("");
  const [showDescription, setShowDescription] = useState("");

  const onOpen = () => {
    modalizeRef.current?.open("");
  };

  useEffect(() => {
    onOpen();
  }, [])


  return (
    <Modalize
        ref={modalizeRef}
        handlePosition={"inside"}
        handleStyle={{width: 44, height: 6, borderRadius: 14, backgroundColor: colorStyles.textSecondary}}
        HeaderComponent={() => {}}
        FooterComponent={() => {}}
        modalHeight={353}
        withOverlay={false}
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
        <CustomButton size="startShowButton" color="button" title="Schedule" callback={() => {}} />
        <CustomButton size="startShowButton" color="accent" title="Start Show" callback={() => {}} />
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