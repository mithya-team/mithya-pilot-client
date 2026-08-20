type Swatch = {
  name: string;
  className: string;
};

const primitiveSwatches: Swatch[] = [
  { name: "white", className: "bg-primitive-white" },
  { name: "gray-50", className: "bg-primitive-gray-50" },
  { name: "gray-200", className: "bg-primitive-gray-200" },
  { name: "gray-500", className: "bg-primitive-gray-500" },
  { name: "gray-900", className: "bg-primitive-gray-900" },
  { name: "blue-600", className: "bg-primitive-blue-600" },
];

const semanticSwatches: Swatch[] = [
  { name: "surface", className: "bg-surface" },
  { name: "accent", className: "bg-accent" },
  { name: "muted", className: "bg-muted" },
  { name: "fg-default", className: "bg-fg-default" },
  { name: "fg-muted", className: "bg-fg-muted" },
  { name: "fg-on-accent", className: "bg-fg-on-accent" },
  { name: "border", className: "bg-default" },
  { name: "focus", className: "bg-focus" },
];

const componentSwatches: Swatch[] = [
  { name: "button-solid", className: "bg-button-solid" },
  { name: "button-ghost", className: "bg-button-ghost" },
  { name: "input", className: "bg-input" },
];

function SwatchRow({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <section className="flex flex-col gap-control">
      <p className="text-label text-fg-muted">{title}</p>
      <div className="flex flex-wrap gap-control">
        {items.map((item) => (
          <div key={item.name} className="flex w-28 flex-col gap-control">
            <div
              className={`border-default h-12 rounded-control border ${item.className}`}
            />
            <p className="text-label text-fg-default">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ThemePreview() {
  return (
    <div className="flex flex-col gap-8">
      <SwatchRow title="Primitive" items={primitiveSwatches} />
      <SwatchRow title="Semantic" items={semanticSwatches} />
      <SwatchRow title="Component" items={componentSwatches} />
    </div>
  );
}
