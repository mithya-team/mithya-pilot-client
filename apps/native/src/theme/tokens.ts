/** Semantic shape from mithya-ui-libs/token-contract.json (`native` keys). */
export type NativeTheme = {
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

export const lightTheme: NativeTheme = {
  colors: {
    bg: {
      surface: "#ffffff",
      accent: "#2563eb",
      muted: "#f4f4f5",
    },
    fg: {
      default: "#18181b",
      muted: "#71717a",
      onAccent: "#ffffff",
    },
    border: {
      default: "#e4e4e7",
      focus: "#2563eb",
    },
  },
  space: { control: controlSpace },
  radius: { control: 8 },
  typography: { label },
  opacity: { disabled: 0.5 },
};

export const darkTheme: NativeTheme = {
  colors: {
    bg: {
      surface: "#18181b",
      accent: "#2563eb",
      muted: "#27272a",
    },
    fg: {
      default: "#fafafa",
      muted: "#a1a1aa",
      onAccent: "#ffffff",
    },
    border: {
      default: "#3f3f46",
      focus: "#60a5fa",
    },
  },
  space: { control: controlSpace },
  radius: { control: 8 },
  typography: { label },
  opacity: { disabled: 0.5 },
};
