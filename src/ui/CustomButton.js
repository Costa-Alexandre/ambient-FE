import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { buttonStyles, colorStyles, fontStyles } from 'styles';
import CustomIcon from './CustomIcon';

export default function CustomButton({ title, color, size, icon, iconSize=20, callback=null, disabled=false }) {

  const buttonStyle = StyleSheet.compose(
    buttonStyles[size],
    {
      backgroundColor: colorStyles[color],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  );

  function titleOrIcon(title, icon) {
    if (title) {
      return <Text style={[textStyle, {opacity:(disabled||!callback) ? 0.3 : 1}]}>{title}</Text>
    } else {
      return <CustomIcon name={icon} size={iconSize} color={(disabled||!callback) ? colorStyles.textSecondary : colorStyles.text} />
    }
  }

  
  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={callback!==null ? 0.8 : 1}
      onPress={callback}
    >
      {titleOrIcon(title, icon)}
    </TouchableOpacity>
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