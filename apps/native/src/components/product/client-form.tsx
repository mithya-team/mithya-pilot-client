import { useState } from "react";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ClientFormProps = {
  initialName?: string;
  onSave?: (name: string) => void;
};

export function ClientForm({ initialName = "", onSave }: ClientFormProps) {
  const [name, setName] = useState(initialName);

  return (
    <View>
      <View testID="name-input">
        <Input value={name} onChangeText={setName} placeholder="Name" />
      </View>
      <View testID="save-button">
        <Button onPress={() => onSave?.(name)}>Save</Button>
      </View>
    </View>
  );
}
