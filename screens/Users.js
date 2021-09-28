import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import UserBig from "../components/userProfiles/UserBig";
import UserPicture from "../components/userProfiles/UserPicture";
import UserStage from "../components/userProfiles/UserStage";

export default function AllUsers() {

  const dummyUri = "https://images.unsplash.com/photo-1631701119265-33ca2b80d00d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"

  return ( 
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Big</Text>
      <View style={styles.table}>
        <UserBig isLive={false} uri={dummyUri}/>
        <UserBig isLive={true} uri={dummyUri}/>
      </View>

      <Text style={styles.title}>Stage</Text>
      <View style={styles.table}>
        <UserStage isMuted={false} isTalking={false} username="Username" uri={dummyUri}/>
        <UserStage isMuted={false} isTalking={true} username="Username" uri={dummyUri}/>
        <UserStage isMuted={true} isTalking={false} username="Username" uri={dummyUri}/>
      </View>

      <Text style={styles.title}>Picture</Text>
      <View style={styles.table}>
        <UserPicture size={40} uri={dummyUri}/>
        <UserPicture size={32} uri={dummyUri}/>
        <UserPicture size={24} uri={dummyUri}/>
        <UserPicture size={20} uri={dummyUri}/>
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
    justifyContent: 'space-evenly',
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
} );