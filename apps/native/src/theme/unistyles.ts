import { StyleSheet } from "react-native-unistyles";
import { darkTheme, lightTheme, type NativeTheme } from "./tokens";

const appThemes: { light: NativeTheme; dark: NativeTheme } = {
  light: lightTheme,
  dark: darkTheme,
};

type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
});
