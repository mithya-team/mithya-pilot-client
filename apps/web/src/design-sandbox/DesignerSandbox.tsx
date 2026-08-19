import { useState } from "react";
import { ClientBanner } from "@/components/product/client-banner";
import { ClientForm } from "@/components/product/client-form";
import { Button } from "@/components/ui/button";
import { mockClient } from "@/design-sandbox/mock-data";

export function DesignerSandbox() {
  const [savedName, setSavedName] = useState<string>();

  return (
    <main
      className="bg-surface text-fg-default min-h-screen p-8"
      data-testid="designer-sandbox"
    >
      <ClientBanner />
      <section className="mt-4 flex max-w-md flex-col gap-control">
        <p className="text-label text-fg-muted">
          Mock client: {mockClient.name}
        </p>
        <p className="text-label text-fg-muted">
          Plan: {mockClient.plan} · Status: {mockClient.status}
        </p>
        <p className="text-label text-fg-muted">Button variants</p>
        <div className="flex gap-control">
          <Button variant="solid">Solid</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <ClientForm onSave={setSavedName} />
        {savedName ? (
          <p className="text-label text-fg-default" role="status">
            Saved: {savedName}
          </p>
        ) : null}
      </section>
    </main>
  );
}
