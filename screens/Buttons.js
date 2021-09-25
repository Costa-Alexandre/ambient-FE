import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ButtonNormal from "../components/buttons/ButtonNormal";
import ButtonSquare from "../components/buttons/ButtonSquare";
import ButtonRect from "../components/buttons/ButtonRect";

export default function Buttons() {
  return ( 
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Normal Buttons</Text>
        <View style={styles.table}>
          <View style={styles.column}>
            <Text style={styles.title}>Wide</Text>
            <ButtonNormal type='accent' title='Accent' size='wideNormal'/>
            <ButtonNormal type='solid' title='Solid' size='wideNormal' />
            <ButtonNormal type='transparent' title='Transparent' size='wideNormal' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Slim</Text>
            <ButtonNormal type='accent' title='Accent' size='slimNormal'/>
            <ButtonNormal type='solid' title='Solid' size='slimNormal' />
            <ButtonNormal type='transparent' title='Transparent' size='slimNormal' />
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Small</Text>
            <ButtonNormal type='accent' title='Accent' size='smallNormal'/>
            <ButtonNormal type='solid' title='Solid' size='smallNormal' />
            <ButtonNormal type='transparent' title='Transparent' size='smallNormal' />
          </View>
      </View>
      <Text style={styles.title}>Square Buttons</Text>
      <View style={styles.table}>
        <View style={styles.column}>
        <Text style={styles.title}>Big</Text>
            <ButtonSquare type='accent' size='bigSquare' name='like' />
            <ButtonSquare type='solid' size='bigSquare' name='like'  />
            <ButtonSquare type='warning' size='bigSquare' name='like'  />
            <ButtonSquare type='transparent' size='bigSquare' name='like'  />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Medium</Text>
          <ButtonSquare type='accent' size='mediumSquare' name='like' />
          <ButtonSquare type='solid' size='mediumSquare' name='like'  />
          <ButtonSquare type='warning' size='mediumSquare' name='like'  />
          <ButtonSquare type='transparent' size='mediumSquare' name='like'  />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Small</Text>
          <ButtonSquare type='accent' size='smallSquare' name='like' />
          <ButtonSquare type='solid' size='smallSquare' name='like'  />
          <ButtonSquare type='warning' size='smallSquare' name='like'  />
          <ButtonSquare type='transparent' size='smallSquare' name='like'  />
        </View>
      </View>
      <Text style={styles.title}>Rectangle Buttons</Text>
      <View style={styles.table}>
        <View style={styles.column}>
        <Text style={styles.title}>Wide</Text>
            <ButtonRect type='accent' size='wideRect' name='like' />
            <ButtonRect type='solid' size='wideRect' name='like'  />
            <ButtonRect type='transparent' size='wideRect' name='like'  />
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Small</Text>
          <ButtonRect type='accent' size='smallRect' name='like' />
          <ButtonRect type='solid' size='smallRect' name='like'  />
          <ButtonRect type='transparent' size='smallRect' name='like'  />
        </View>
      </View>
    </ScrollView>
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