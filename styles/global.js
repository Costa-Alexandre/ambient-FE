import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  // touchable
  // color 
  accent: {
    backgroundColor: "#37BB64",
  },
  solid: {
    backgroundColor: "#404040",
  },
  transparent: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  warning: {
    backgroundColor: "#F32248",
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