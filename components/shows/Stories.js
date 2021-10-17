import React from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import UserBig from '../userProfiles/UserBig';


export default function Stories({ users }) {

  const dummyUri = [
    {uri: "https://randomuser.me/api/portraits/men/1.jpg", live: true, key: 1},
    {uri: "https://randomuser.me/api/portraits/men/2.jpg", live: true, key: 2},
    {uri: "https://randomuser.me/api/portraits/women/1.jpg", live: true, key: 3},
    {uri: "https://randomuser.me/api/portraits/women/2.jpg", live: false, key: 4},
    {uri: "https://randomuser.me/api/portraits/men/3.jpg", live: false, key: 5},
    {uri: "https://randomuser.me/api/portraits/women/3.jpg", live: false, key: 6}
  ]

  return (
    <ScrollView horizontal={true}>
    <View style={styles.container}>
      <FlatList 
          data={dummyUri}
          numColumns={6}
          renderItem={({item}) => (
            <View style={styles.item}>
              <UserBig isLive={item.live} uri={item.uri} />
            </View>
          )}
        />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 74,
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
  },
  item: {
    paddingLeft: 16,
  },
});