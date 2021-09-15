import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ButtonNormal from "./ButtonNormal";
import ButtonSquare from "./ButtonSquare";

export default function AllButtons() {
  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Normal Buttons</Text>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.title}>Wide</Text>
            <ButtonNormal type='accent' name='Accent' size='wide'/>
            <ButtonNormal type='solid' name='Solid' size='wide' />
            <ButtonNormal type='transparent' name='Transparent' size='wide' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Slim</Text>
            <ButtonNormal type='accent' name='Accent' size='slim'/>
            <ButtonNormal type='solid' name='Solid' size='slim' />
            <ButtonNormal type='transparent' name='Transparent' size='slim' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Small</Text>
            <ButtonNormal type='accent' name='Accent' size='small'/>
            <ButtonNormal type='solid' name='Solid' size='small' />
            <ButtonNormal type='transparent' name='Transparent' size='small' />
          </View>
      </View>
      <Text style={styles.title}>Square Buttons</Text>
      <View style={styles.table}>
        <View style={styles.column}>
        <Text style={styles.title}>Big</Text>
            <ButtonSquare type='accent' size='big' image='like-icon'/>
            <ButtonSquare type='solid' size='big' image='like-icon' />
            <ButtonSquare type='warning' size='big' image='like-icon' />
            <ButtonSquare type='transparent' size='big' image='like-icon' />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Medium</Text>
          <ButtonSquare type='accent' size='medium' image='like-icon'/>
          <ButtonSquare type='solid' size='medium' image='like-icon' />
          <ButtonSquare type='warning' size='medium' image='like-icon' />
          <ButtonSquare type='transparent' size='medium' image='like-icon' />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Small</Text>
          <ButtonSquare type='accent' size='small' image='like-icon'/>
          <ButtonSquare type='solid' size='small' image='like-icon' />
          <ButtonSquare type='warning' size='small' image='like-icon' />
          <ButtonSquare type='transparent' size='small' image='like-icon' />
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