import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from 'react-native';
import { buttonStyles, colorStyles, fontStyles } from 'styles';
import CustomIcon from './CustomIcon';
import { TouchableOpacity} from 'react-native-gesture-handler'


export default function CustomButton({ title, color, size, icon, iconSize=20, callback=null, disabled=false, loading=false }) {

  const buttonStyle = StyleSheet.compose(
    buttonStyles[size],
    {
      backgroundColor: colorStyles[color],
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
        activeOpacity={callback!==null && !loading ? 0.8 : 1}
        onPress={loading ? null : callback}
      >
        {loading ? <ActivityIndicator color="white" size="small"/> : titleOrIcon(title, icon)}
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


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  }
})