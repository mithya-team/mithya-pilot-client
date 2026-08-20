import * as React from "react"
import { Pressable, Text, type GestureResponderEvent } from "react-native"
import type { UnistylesVariants } from "react-native-unistyles"
import { buttonStyles } from "../../theme/variants/button"
import { layoutToStyle, type LayoutProps } from "./layout"

export type ButtonProps = {
  children?: React.ReactNode
  layout?: LayoutProps
  onPress?: (event: GestureResponderEvent) => void
} & UnistylesVariants<typeof buttonStyles>

export function Button({
  children,
  variant,
  size,
  disabled,
  layout,
  onPress,
}: ButtonProps) {
  // Babel scopes this stylesheet for the rest of the function. Do not wrap in another file.
  buttonStyles.useVariants({
    variant,
    size,
    disabled,
  })

  return (
    <Pressable
      accessibilityRole="button"
      disabled={Boolean(disabled)}
      onPress={onPress}
      style={[buttonStyles.root, layoutToStyle(layout)]}
    >
      <Text style={buttonStyles.label}>{children}</Text>
    </Pressable>
  )
}
