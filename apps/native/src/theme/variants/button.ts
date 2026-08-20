import { StyleSheet } from "react-native-unistyles";

export const buttonStyles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.space.control.px,
    paddingVertical: theme.space.control.py,
    gap: theme.space.control.gap,
    borderRadius: theme.radius.control,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    variants: {
      variant: {
        solid: {
          backgroundColor: theme.component.button.solidBg,
        },
        ghost: {
          backgroundColor: theme.component.button.ghostBg,
        },
        default: {
          backgroundColor: theme.component.button.solidBg,
        },
      },
      size: {
        md: {},
        default: {},
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  label: {
    fontSize: theme.typography.label.fontSize,
    variants: {
      variant: {
        solid: {
          color: theme.component.button.solidFg,
        },
        ghost: {
          color: theme.component.button.ghostFg,
        },
        default: {
          color: theme.component.button.solidFg,
        },
      },
      size: {
        md: {},
        default: {},
      },
      disabled: {
        true: {},
      },
    },
  },
}));
