import { StyleSheet } from "react-native-unistyles";

export const inputStyles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: theme.component.input.bg,
    color: theme.component.input.fg,
    fontSize: theme.typography.label.fontSize,
    paddingHorizontal: theme.space.control.px,
    paddingVertical: theme.space.control.py,
    borderRadius: theme.radius.control,
    borderWidth: 1,
    borderColor: theme.component.input.border,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));
