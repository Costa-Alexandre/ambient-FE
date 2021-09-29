import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { buttonStyles } from '../../styles/buttonStyles';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomIcon from '../icons/CustomIcons';

export default function CustomButton({ title, color, size, icon, callback=null }) {

  const buttonStyle = StyleSheet.compose(
    buttonStyles[size],
    {backgroundColor: colorStyles[color]},
  );

  function titleOrIcon(title, icon) {
    if (title) {
      return title
    } else {
      return <CustomIcon name={icon} size={20} color='#fff' />
    }
  }

  
  return (
    <View>
      <TouchableOpacity
        style={buttonStyle}
        activeOpacity={callback!==null ? 0.8 : 1}
        onPress={callback}
      >
        <Text style={textStyle}>
          {titleOrIcon(title, icon)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

  const textStyle = StyleSheet.compose(
    fontStyles.button,
    {
      textAlign: 'center',
      textAlignVertical: "center",
      color: colorStyles.text,
      flex: 1,
    }
  );