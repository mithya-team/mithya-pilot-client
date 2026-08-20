import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { lightTheme } from "@/theme/tokens";

type Swatch = {
  name: string;
  color: string;
};

const primitiveSwatches: Swatch[] = [
  { name: "white", color: lightTheme.primitive.white },
  { name: "gray50", color: lightTheme.primitive.gray50 },
  { name: "gray200", color: lightTheme.primitive.gray200 },
  { name: "gray500", color: lightTheme.primitive.gray500 },
  { name: "gray900", color: lightTheme.primitive.gray900 },
  { name: "blue600", color: lightTheme.primitive.blue600 },
];

const semanticSwatches: Swatch[] = [
  { name: "surface", color: lightTheme.colors.bg.surface },
  { name: "accent", color: lightTheme.colors.bg.accent },
  { name: "muted", color: lightTheme.colors.bg.muted },
  { name: "fg-default", color: lightTheme.colors.fg.default },
  { name: "fg-muted", color: lightTheme.colors.fg.muted },
  { name: "fg-on-accent", color: lightTheme.colors.fg.onAccent },
  { name: "border", color: lightTheme.colors.border.default },
  { name: "focus", color: lightTheme.colors.border.focus },
];

const componentSwatches: Swatch[] = [
  { name: "button-solid", color: lightTheme.component.button.solidBg },
  { name: "button-ghost", color: lightTheme.component.button.ghostBg },
  { name: "input", color: lightTheme.component.input.bg },
];

function SwatchRow({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.heading}>{title}</Text>
      <View style={styles.row}>
        {items.map((item) => (
          <View key={item.name} style={styles.swatch}>
            <View style={[styles.chip, { backgroundColor: item.color }]} />
            <Text style={styles.label}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function ThemePreview() {
  return (
    <View style={styles.root}>
      <SwatchRow title="Primitive" items={primitiveSwatches} />
      <SwatchRow title="Semantic" items={semanticSwatches} />
      <SwatchRow title="Component" items={componentSwatches} />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    gap: 24,
  },
  section: {
    gap: theme.space.control.gap,
  },
  heading: {
    color: theme.colors.fg.muted,
    ...theme.typography.label,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: theme.space.control.gap,
  },
  swatch: {
    width: 96,
    gap: theme.space.control.gap,
  },
  chip: {
    height: 48,
    borderRadius: theme.radius.control,
    borderWidth: 1,
    borderColor: theme.colors.border.default,
  },
  label: {
    color: theme.colors.fg.default,
    ...theme.typography.label,
  },
}));
