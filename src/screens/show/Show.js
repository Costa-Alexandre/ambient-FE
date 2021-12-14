import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { MainContext } from "store/MainProvider";
import ShowInfo from "./ShowInfo"
import ShowModalize from "./ShowModalize";
import { colorStyles } from "styles";

export default function Show({ route: { params: activeShow },  navigation }) {
  
  const { joinShow } = useContext(MainContext);

  useEffect(() => {
    joinShow(activeShow)
    console.log(`Welcome to show ${activeShow.name}!`)
  }, []);

  return (
    <View style={styles.container}>
      <ShowInfo {...dummyShowInfo} callback={(screen) => navigation.navigate(screen)} goBack={() => navigation.goBack()} />
      <ShowModalize />
    </View>
  );
}

// Dummy variables - DELETE

const dummyBGImage = { uri: "https://f4.bcbits.com/img/a1024330960_10.jpg" };

const dummyShowInfo = {
  showId: "1",
  showTitle: "SHOW NAME",
  showName: "Some show",
  showDescription: "this is a description",
  amountSpeakers: "10",
  amountListeners: "20",
  imageUri: dummyBGImage.uri,
  users: [],
  listenCallback: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorStyles.background
  }
})