import Colors, { ColorType } from "@/constants/Colors";
import { useColorScheme } from "react-native";

const useThemeColor = (theme?: "light" | "dark") => {
  const currentTheme = useColorScheme() ?? "light";

  if (theme) {
    return Colors[theme];
  }

  return Colors[currentTheme] || Colors.light;
};

export default useThemeColor;
