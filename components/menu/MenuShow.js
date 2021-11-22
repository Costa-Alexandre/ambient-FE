import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../buttons/CustomButton";
import CustomIcon from "../icons/CustomIcons";
import { fontStyles } from "../../styles/fontStyles";
import { colorStyles } from "../../styles/colorStyles";

export default function MenuShow(){

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.leftMenu}>
          <View style={styles.arrowDown}>
            <CustomIcon name='arrow_left' color={colorStyles.text} size={20}/>
          </View>
          <Text style={composeTitle}>Show</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.rightMenu}>
        <CustomButton title="Leave" color="button" size="normalSmall" callback={() => {}}/>
        <TouchableOpacity style={styles.moreIcon}>
        <CustomIcon name='more' size={20} color={colorStyles.text} />
        </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  leftMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightMenu: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowDown: {
    transform: [{rotate: '-90deg'}],
    marginRight: 20,
  },
  title: {
    color: colorStyles.text,
  },
  moreIcon: {
    padding: 10,
    marginLeft: 16
  }
});

const composeTitle = StyleSheet.compose([styles.title, fontStyles.section]);