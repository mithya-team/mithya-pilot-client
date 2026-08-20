import type { Preview } from "@storybook/react-native";
import { withThemeSurface } from "../src/stories/story-decorators";

const preview: Preview = {
  decorators: [withThemeSurface],
  parameters: {
    layout: "padded",
  },
};

export default preview;
