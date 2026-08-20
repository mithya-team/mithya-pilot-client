import type { Meta, StoryObj } from "@storybook/react-native";
import { ClientForm } from "@/components/product/client-form";

const meta = {
  title: "Product/ClientForm",
  component: ClientForm,
} satisfies Meta<typeof ClientForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};
export const Prefill: Story = { args: { initialName: "Ada Lovelace" } };
