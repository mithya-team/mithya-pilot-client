import { ClientBanner } from "@/components/product/client-banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function App() {
  return (
    <main className="bg-surface text-fg-default min-h-screen p-8">
      <ClientBanner />
      <form className="mt-4 flex flex-col items-start gap-control">
        <Input name="name" placeholder="Name" />
        <Button type="submit">Save</Button>
      </form>
    </main>
  );
}
