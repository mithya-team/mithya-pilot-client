import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignerSandbox } from "@/design-sandbox/DesignerSandbox";

const meta = {
  title: "Sandbox/DesignerSandbox",
  component: DesignerSandbox,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DesignerSandbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
