import { useState } from "react";
import { Text, View } from "react-native";
import { ClientBanner } from "@/components/product/client-banner";
import { ClientForm } from "@/components/product/client-form";
import { Button } from "@/components/ui/button";
import { mockClient } from "@/design-sandbox/mock-data";

export function DesignerSandbox() {
  const [savedName, setSavedName] = useState<string>();

  return (
    <View testID="designer-sandbox">
      <ClientBanner />
      <Text>Mock client: {mockClient.name}</Text>
      <Text>
        Plan: {mockClient.plan} · Status: {mockClient.status}
      </Text>
      <Text>Button variants</Text>
      <View testID="variant-solid">
        <Button variant="solid">Solid</Button>
      </View>
      <View testID="variant-ghost">
        <Button variant="ghost">Ghost</Button>
      </View>
      <ClientForm onSave={setSavedName} />
      {savedName ? <Text testID="save-status">Saved: {savedName}</Text> : null}
    </View>
  );
}
