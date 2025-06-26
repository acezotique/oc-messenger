import Colors, { ColorKeys } from "@/constants/Colors";
import { useColorScheme } from "react-native";

type ThemeProps = ColorKeys;

const useThemeColor = (variant: ThemeProps, theme?: "light" | "dark") => {
  const currentTheme = useColorScheme() ?? "light";

  if (variant === "transparent") {
    return undefined;
  }

  if (theme) {
    return Colors[theme][variant];
  }
  
  return Colors[currentTheme][variant] || Colors.light[variant];
};

export default useThemeColor;
