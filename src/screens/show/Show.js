import React, { useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { MainContext } from "store/MainProvider";
import ShowInfo from "./ShowInfo"
import ShowModalize from "./ShowModalize";
import { colorStyles } from "styles";

export default function Show({ route: { params: activeShow },  navigation }) {
  
  const { setActiveShow, joinShow, leaveShow } = useContext(MainContext);

  useEffect(() => {
    leaveShow();
    setActiveShow(activeShow);
    joinShow(activeShow);
    console.log(`Welcome to show ${activeShow.name}!`);
  }, []);

  return (
    <View style={styles.container}>
      <ShowInfo callback={(screen) => navigation.navigate(screen)} goBack={() => navigation.goBack()} />
      <ShowModalize />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorStyles.background
  }
})