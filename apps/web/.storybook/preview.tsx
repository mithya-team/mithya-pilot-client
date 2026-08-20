import type { Preview } from "@storybook/react-vite";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="bg-surface text-fg-default min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
};

export default preview;
