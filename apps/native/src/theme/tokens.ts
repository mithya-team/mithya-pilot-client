/** Client theme. Hex lives in `primitive` only. */

export type NativeTheme = {
  primitive: {
    white: string;
    gray50: string;
    gray200: string;
    gray500: string;
    gray900: string;
    blue600: string;
  };
  colors: {
    bg: {
      surface: string;
      accent: string;
      muted: string;
    };
    fg: {
      default: string;
      muted: string;
      onAccent: string;
    };
    border: {
      default: string;
      focus: string;
    };
  };
  space: {
    control: {
      px: number;
      py: number;
      gap: number;
    };
  };
  radius: {
    control: number;
  };
  typography: {
    label: {
      fontSize: number;
      lineHeight: number;
      fontWeight: "400" | "500" | "600" | "700";
      letterSpacing: number;
    };
  };
  opacity: {
    disabled: number;
  };
  component: {
    button: {
      solidBg: string;
      solidFg: string;
      ghostBg: string;
      ghostFg: string;
    };
    input: {
      bg: string;
      fg: string;
      border: string;
    };
  };
};

type PrimitiveKey = keyof NativeTheme["primitive"];

type SemanticMap = {
  bg: { surface: PrimitiveKey; accent: PrimitiveKey; muted: PrimitiveKey };
  fg: {
    default: PrimitiveKey;
    muted: PrimitiveKey;
    onAccent: PrimitiveKey;
  };
  border: { default: PrimitiveKey; focus: PrimitiveKey };
};

const controlSpace: NativeTheme["space"]["control"] = {
  px: 12,
  py: 8,
  gap: 8,
};

const label: NativeTheme["typography"]["label"] = {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: "500",
  letterSpacing: 0,
};

function makeTheme(
  primitive: NativeTheme["primitive"],
  semantic: SemanticMap,
): NativeTheme {
  const colors: NativeTheme["colors"] = {
    bg: {
      surface: primitive[semantic.bg.surface],
      accent: primitive[semantic.bg.accent],
      muted: primitive[semantic.bg.muted],
    },
    fg: {
      default: primitive[semantic.fg.default],
      muted: primitive[semantic.fg.muted],
      onAccent: primitive[semantic.fg.onAccent],
    },
    border: {
      default: primitive[semantic.border.default],
      focus: primitive[semantic.border.focus],
    },
  };

  return {
    primitive,
    colors,
    space: { control: controlSpace },
    radius: { control: 8 },
    typography: { label },
    opacity: { disabled: 0.5 },
    component: {
      button: {
        solidBg: colors.bg.accent,
        solidFg: colors.fg.onAccent,
        ghostBg: "transparent",
        ghostFg: colors.fg.default,
      },
      input: {
        bg: colors.bg.surface,
        fg: colors.fg.default,
        border: colors.border.default,
      },
    },
  };
}

const lightSemantic: SemanticMap = {
  bg: { surface: "white", accent: "blue600", muted: "gray50" },
  fg: { default: "gray900", muted: "gray500", onAccent: "white" },
  border: { default: "gray200", focus: "blue600" },
};

const darkSemantic: SemanticMap = {
  bg: { surface: "gray900", accent: "blue600", muted: "gray50" },
  fg: { default: "white", muted: "gray500", onAccent: "white" },
  border: { default: "gray200", focus: "blue600" },
};

export const lightTheme = makeTheme(
  {
    white: "#ffffff",
    gray50: "#f4f4f5",
    gray200: "#e4e4e7",
    gray500: "#71717a",
    gray900: "#18181b",
    blue600: "#2563eb",
  },
  lightSemantic,
);

export const darkTheme = makeTheme(
  {
    white: "#fafafa",
    gray50: "#27272a",
    gray200: "#3f3f46",
    gray500: "#a1a1aa",
    gray900: "#18181b",
    blue600: "#2563eb",
  },
  darkSemantic,
);
