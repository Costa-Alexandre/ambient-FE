import React from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import UserStage from "../../../ui/UserStage";
import UserPicture from "../../../ui/UserPicture";
import { fontStyles } from "../../../styles/fontStyles";
import { colorStyles } from "../../../styles/colorStyles";

export default function LiveUsers({ stage, requesting, listening}) {


  return (
    <View style={styles.outerContainer}>
      
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <FlatList 
              data={dummyStage}
              numColumns={6}
              renderItem={({item}) => (
                <View style={styles.itemBig}>
                  <UserStage 
                  uri={item.uri}
                  callback={null}
                  username="Username"
                  isMuted={item.isMuted}
                  isTalking={item.isTalking}
                  />
                </View>
              )}
            />
        </View>
      </ScrollView>
      
      <View style={styles.gap} />

      <Text style={composeSubtitle}>Wanting to speak (6)</Text>
      <ScrollView horizontal={true}>
        <View style={styles.container}>
          <FlatList 
              data={dummyRequesting}
              numColumns={6}
              renderItem={({item}) => (
                <View style={styles.itemBig}>
                  <UserStage 
                  uri={item.uri}
                  callback={null}
                  username="Username"
                  isMuted={false}
                  isTalking={false}
                  />
                </View>
              )}
            />
        </View>
      </ScrollView>

      <View style={styles.gap} />

      <Text style={composeSubtitle}>Listening (7)</Text>
      <FlatList 
        data={dummyListening}
        numColumns={7}
        renderItem={({item}) => (
          <View style={styles.itemSmall}>
            <UserPicture 
            uri={item.uri}
            callback={null}
            size={40}
            />
          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  container: {
    height: 84,
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
  },
  itemBig: {
    paddingLeft: 20,
  },
  itemSmall: {
    paddingLeft: 16,
    paddingBottom: 16,
  },
  subtitle: {
    color: colorStyles.textSecondary,
    marginBottom: 16,
    marginLeft: 20,
  },
  gap: {
    height: 32,
  }
});

const composeSubtitle = StyleSheet.compose([styles.subtitle, fontStyles.subtitle])


// Dummy Variables

const dummyStage = [
  {uri: "https://randomuser.me/api/portraits/men/1.jpg", isTalking: true, isMuted: false, key: 1},
  {uri: "https://randomuser.me/api/portraits/men/2.jpg", isTalking: false, isMuted: false, key: 2},
  {uri: "https://randomuser.me/api/portraits/women/1.jpg", isTalking: false, isMuted: true, key: 3},
  {uri: "https://randomuser.me/api/portraits/women/2.jpg", isTalking: false, isMuted: true, key: 4},
  {uri: "https://randomuser.me/api/portraits/men/3.jpg", isTalking: false, isMuted: true, key: 5},
  {uri: "https://randomuser.me/api/portraits/women/3.jpg", isTalking: false, isMuted: true, key: 6}
]

const dummyRequesting = [
  {uri: "https://randomuser.me/api/portraits/men/4.jpg", key: 1},
  {uri: "https://randomuser.me/api/portraits/men/5.jpg", key: 2},
  {uri: "https://randomuser.me/api/portraits/women/4.jpg", key: 3},
  {uri: "https://randomuser.me/api/portraits/women/5.jpg", key: 4},
  {uri: "https://randomuser.me/api/portraits/men/6.jpg", key: 5},
  {uri: "https://randomuser.me/api/portraits/women/6.jpg", key: 6}
]

const dummyListening = [
  {uri: "https://randomuser.me/api/portraits/men/7.jpg", key: 1},
  {uri: "https://randomuser.me/api/portraits/men/8.jpg", key: 2},
  {uri: "https://randomuser.me/api/portraits/women/9.jpg", key: 3},
  {uri: "https://randomuser.me/api/portraits/women/10.jpg", key: 4},
  {uri: "https://randomuser.me/api/portraits/men/11.jpg", key: 5},
  {uri: "https://randomuser.me/api/portraits/women/12.jpg", key: 6},
  {uri: "https://randomuser.me/api/portraits/women/13.jpg", key: 7},
  {uri: "https://randomuser.me/api/portraits/men/14.jpg", key: 8},
  {uri: "https://randomuser.me/api/portraits/women/15.jpg", key: 9}
]