import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ButtonNormal from "./ButtonNormal";

export default function AllButtons() {
  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>All Buttons</Text>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.title}>Wide</Text>
            <ButtonNormal type='Accent' name='Accent' size='wide'/>
            <ButtonNormal type='Solid' name='Solid' size='wide' />
            <ButtonNormal type='Transparent' name='Transparent' size='wide' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Slim</Text>
            <ButtonNormal type='Accent' name='Accent' size='slim'/>
            <ButtonNormal type='Solid' name='Solid' size='slim' />
            <ButtonNormal type='Transparent' name='Transparent' size='slim' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Small</Text>
            <ButtonNormal type='Accent' name='Accent' size='small'/>
            <ButtonNormal type='Solid' name='Solid' size='small' />
            <ButtonNormal type='Transparent' name='Transparent' size='small' />
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