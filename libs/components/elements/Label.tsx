import { Text } from "react-native";
import React, { useMemo } from "react";
import useThemeColor from "@/libs/hooks/theme";
import { ColorKeys } from "@/constants/Colors";

type LabelProps = {
  label?: string;
  weight?: "normal" | "bold";
  color?: ColorKeys;
  size?: "xxsm" | "xsm" | "sm" | "md" | "lg";
  truncate?: boolean;
  numberOfLines?: number;
};

const Label = ({
  label,
  weight = "normal",
  color: textColor = "primaryText",
  size = "md",
  truncate = false,
  numberOfLines,
}: LabelProps) => {
  const color = useThemeColor();
  const fontFamily =
    weight === "normal" ? "Roboto_400Regular" : "Roboto_700Bold";

  const fontSize = useMemo(() => {
    switch (size) {
      case "sm":
        return 16;
      case "md":
        return 24;
      case "lg":
        return 32;
      case "xsm":
        return 12;
      case "xxsm":
        return 10;
      default:
        return 16;
    }
  }, [size]);

  return (
    <Text
      style={{
        color: color[textColor],
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
      numberOfLines={truncate ? numberOfLines : undefined}
      ellipsizeMode={truncate ? "tail" : undefined}
    >
      {label}
    </Text>
  );
};

export default Label;
