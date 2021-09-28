import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CustomIcon from '../components/icons/CustomIcons';

export default function Icons() {

  const icons = require('../assets/icons.json');


    return (
      <View style={styles.page}>
        <View style={styles.iconContainer}>
          <FlatList 
            data={icons}
            numColumns={4}
            renderItem={({item}) => (
              <View style={styles.item}>
                <View style={styles.icon}>
                <CustomIcon name={item.name} size={20} color='#000' />
                </View>
                <Text style={styles.text}>{item.name} </Text>
              </View>
            )}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 20,
  },
  text: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  iconContainer: {
    flex: 1,
  },
  icon:{
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  item: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }
});