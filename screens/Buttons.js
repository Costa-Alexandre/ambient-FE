import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import CustomButton from "../components/buttons/CustomButton";
import { fontStyles } from "../styles/fontStyles";


export default function Buttons() {
  return (
    <ScrollView style={styles.container}>

      <Text style={titleStyle}>Normal Buttons</Text>
      <View style={styles.content}>
        <CustomButton
          title="Button"
          color="button_solid"
          size="normalMediumWide" />
        <CustomButton
          title="Button"
          color="accent"
          size="normalMediumWide" />
        <CustomButton
          title="Button"
          color="button"
          size="normalMediumWide" />
        <CustomButton
          title="Button"
          color="button_solid"
          size="normalMediumSlim" />
        <CustomButton
          title="Button"
          color="accent"
          size="normalMediumSlim" />
        <CustomButton
          title="Button"
          color="button"
          size="normalMediumSlim" />
        <CustomButton
          title="Button"
          color="button_solid"
          size="normalSmall" />
        <CustomButton
          title="Button"
          color="accent"
          size="normalSmall" />
        <CustomButton
          title="Button"
          color="button"
          size="normalSmall" />
      </View>
      <Text style={titleStyle}>Square Buttons</Text>
      <View style={styles.content}>
        <CustomButton
          icon="like"
          color="button_solid"
          size="squareBig" />
        <CustomButton
          icon="like"
          color="accent"
          size="squareBig" />
        <CustomButton
          icon="like"
          color="warning"
          size="squareBig" />
        <CustomButton
          icon="like"
          color="button"
          size="squareBig" />
        <CustomButton
          icon="like"
          color="button_solid"
          size="squareMedium" />
        <CustomButton
          icon="like"
          color="accent"
          size="squareMedium" />
        <CustomButton
          icon="like"
          color="warning"
          size="squareMedium" />
        <CustomButton
          icon="like"
          color="button"
          size="squareMedium" />
        <CustomButton
          icon="like"
          color="button_solid"
          size="squareSmall" />
        <CustomButton
          icon="like"
          color="accent"
          size="squareSmall" />
        <CustomButton
          icon="like"
          color="warning"
          size="squareSmall" />
        <CustomButton
          icon="like"
          color="button"
          size="squareSmall" />
      </View>
      <Text style={titleStyle}>Rectangle Buttons</Text>
      <View style={styles.content}>
        <CustomButton
          icon="like"
          color="button_solid"
          size="rectangleSmall" />
        <CustomButton
          icon="like"
          color="accent"
          size="rectangleSmall" />
        <CustomButton
          icon="like"
          color="button"
          size="rectangleSmall" />
        <CustomButton
          icon="like"
          color="button_solid"
          size="rectangleWide" />
        <CustomButton
          icon="like"
          color="accent"
          size="rectangleWide" />
        <CustomButton
          icon="like"
          color="button"
          size="rectangleWide" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    flexBasis: 0.3,
    flexDirection: "row",
    flexWrap: "wrap",
  }
});

const titleStyle = StyleSheet.compose(
  fontStyles.title,
  { color: "#fff" }
)