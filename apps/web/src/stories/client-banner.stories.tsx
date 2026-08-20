import type { Meta, StoryObj } from "@storybook/react-vite";
import { ClientBanner } from "@/components/product/client-banner";

const meta = {
  title: "Product/ClientBanner",
  component: ClientBanner,
} satisfies Meta<typeof ClientBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
