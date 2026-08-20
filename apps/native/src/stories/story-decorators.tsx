import type { Decorator } from "@storybook/react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg.surface,
    padding: 16,
    gap: theme.space.control.gap,
  },
}));

export const withThemeSurface: Decorator = (Story) => (
  <View style={styles.root}>
    <Story />
  </View>
);
