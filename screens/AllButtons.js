import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ButtonNormal from "../components/buttons/ButtonNormal";
import ButtonSquare from "../components/buttons/ButtonSquare";
import ButtonRect from "../components/buttons/ButtonRect";

export default function AllButtons() {
  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Normal Buttons</Text>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.title}>Wide</Text>
            <ButtonNormal type='accent' name='Accent' size='wideNormal'/>
            <ButtonNormal type='solid' name='Solid' size='wideNormal' />
            <ButtonNormal type='transparent' name='Transparent' size='wideNormal' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Slim</Text>
            <ButtonNormal type='accent' name='Accent' size='slimNormal'/>
            <ButtonNormal type='solid' name='Solid' size='slimNormal' />
            <ButtonNormal type='transparent' name='Transparent' size='slimNormal' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Small</Text>
            <ButtonNormal type='accent' name='Accent' size='smallNormal'/>
            <ButtonNormal type='solid' name='Solid' size='smallNormal' />
            <ButtonNormal type='transparent' name='Transparent' size='smallNormal' />
          </View>
      </View>
      <Text style={styles.title}>Square Buttons</Text>
      <View style={styles.table}>
        <View style={styles.column}>
        <Text style={styles.title}>Big</Text>
            <ButtonSquare type='accent' size='bigSquare' image='like-icon'/>
            <ButtonSquare type='solid' size='bigSquare' image='like-icon' />
            <ButtonSquare type='warning' size='bigSquare' image='like-icon' />
            <ButtonSquare type='transparent' size='bigSquare' image='like-icon' />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Medium</Text>
          <ButtonSquare type='accent' size='mediumSquare' image='like-icon'/>
          <ButtonSquare type='solid' size='mediumSquare' image='like-icon' />
          <ButtonSquare type='warning' size='mediumSquare' image='like-icon' />
          <ButtonSquare type='transparent' size='mediumSquare' image='like-icon' />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Small</Text>
          <ButtonSquare type='accent' size='smallSquare' image='like-icon'/>
          <ButtonSquare type='solid' size='smallSquare' image='like-icon' />
          <ButtonSquare type='warning' size='smallSquare' image='like-icon' />
          <ButtonSquare type='transparent' size='smallSquare' image='like-icon' />
        </View>
      </View>
      <Text style={styles.title}>Rectangle Buttons</Text>
      <View style={styles.table}>
        <View style={styles.column}>
        <Text style={styles.title}>Wide</Text>
            <ButtonRect type='accent' size='wideRect' image='like-icon'/>
            <ButtonRect type='solid' size='wideRect' image='like-icon' />
            <ButtonRect type='transparent' size='wideRect' image='like-icon' />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Small</Text>
          <ButtonRect type='accent' size='smallRect' image='like-icon'/>
          <ButtonRect type='solid' size='smallRect' image='like-icon' />
          <ButtonRect type='transparent' size='smallRect' image='like-icon' />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: "#000",
  },
  table: {
    flexDirection: "row",
    borderColor: "#fff",
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
} );