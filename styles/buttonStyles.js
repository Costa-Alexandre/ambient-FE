import { StyleSheet } from "react-native";

const colors = require('./colorStyles.json')

export const globalStyles = StyleSheet.create({

  accent: {
    backgroundColor: colors.accent,
  },
  buttonSolid: {
    backgroundColor: colors.button_solid,
  },
  button: {
    backgroundColor: colors.button,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  // Button Normal 
  wideNormal: {
    width: 120,
    height: 44,
    borderRadius: 22,
  },
  slimNormal: {
    width: 90,
    height: 44,
    borderRadius: 22,
  },
  smallNormal: {
    width: 90,
    height: 40,
    borderRadius: 20,
  },
  // Button Square 
  bigSquare: {
    width: 50,
    height: 50,
    borderRadius: 23,
  },
  mediumSquare: {
    width: 44,
    height: 44,
    borderRadius: 20,
  },
  smallSquare: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  // Button Rect 
  wideRect: {
    width: 120,
    height: 44,
    borderRadius: 20,
  },
  smallRect: {
    width: 60,
    height: 40,
    borderRadius: 18,
  },
});