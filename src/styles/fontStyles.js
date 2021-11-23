import { StyleSheet } from "react-native";

// destructure styles generated from DesignToken exported from Figma
const importStyles = require("./fontStyles.json");
const {
  title,
  section,
  button,
  subtitle,
  body,
  "title secondary": titleSecondary,
  "subtitle secondary": subtitleSecondary,
  "body secondary": bodySecondary,
  subtext
} = importStyles

export const fontStyles = StyleSheet.create({
  title,
  section,
  button,
  subtitle,
  body,
  titleSecondary,
  subtitleSecondary,
  bodySecondary,
  subtext
});