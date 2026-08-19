import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ClientFormProps = {
  initialName?: string;
  onSave?: (name: string) => void;
};

export function ClientForm({ initialName = "", onSave }: ClientFormProps) {
  const [name, setName] = useState(initialName);

  return (
    <form
      className="mt-4 flex flex-col items-start gap-control"
      onSubmit={(event) => {
        event.preventDefault();
        onSave?.(name);
      }}
    >
      <Input
        name="name"
        placeholder="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit">Save</Button>
    </form>
  );
}
