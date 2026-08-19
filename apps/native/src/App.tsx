import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ClientBanner } from "@/components/product/client-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function App() {
  const [name, setName] = useState("");

  return (
    <View style={styles.screen} testID="pilot-screen">
      <ClientBanner />
      <View testID="name-input">
        <Input value={name} onChangeText={setName} placeholder="Name" />
      </View>
      <View testID="save-button">
        <Button>Save</Button>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.bg.surface,
    justifyContent: "center",
    padding: 32,
    gap: 12,
  },
}));
