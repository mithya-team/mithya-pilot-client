import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemePreview } from "@/design-sandbox/theme-preview";

const meta = {
  title: "Theme/Tokens",
  component: ThemePreview,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ThemePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {};
