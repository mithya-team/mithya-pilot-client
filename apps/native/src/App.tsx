import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { DesignerSandbox } from "@/design-sandbox/DesignerSandbox";

export default function App() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      testID="pilot-screen"
      keyboardShouldPersistTaps="handled"
    >
      <DesignerSandbox />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.surface,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
}));
