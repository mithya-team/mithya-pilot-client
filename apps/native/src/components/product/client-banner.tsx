import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function ClientBanner() {
  return (
    <View style={styles.root}>
      <Text style={styles.label}>Mithya pilot client</Text>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.colors.bg.accent,
    borderRadius: theme.radius.control,
    paddingHorizontal: theme.space.control.px,
    paddingVertical: theme.space.control.py,
  },
  label: {
    color: theme.colors.fg.onAccent,
    ...theme.typography.label,
  },
}));
