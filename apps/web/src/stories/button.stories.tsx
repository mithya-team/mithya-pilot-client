import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Theme/Button",
  component: Button,
  args: { children: "Button" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Solid: Story = { args: { variant: "solid" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Disabled: Story = {
  args: { variant: "solid", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-control">
      <Button variant="solid">Solid</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="solid" disabled>
        Disabled solid
      </Button>
      <Button variant="ghost" disabled>
        Disabled ghost
      </Button>
    </div>
  ),
};
