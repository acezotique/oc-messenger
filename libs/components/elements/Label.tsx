import { Text } from "react-native";
import React, { useMemo } from "react";
import useThemeColor from "@/libs/hooks/theme";
import { ColorKeys } from "@/constants/Colors";

type LabelProps = {
  label?: string;
  weight?: "normal" | "bold";
  color?: ColorKeys;
  size?: "xsm" | "sm" | "md" | "lg";
};

const Label = ({
  label,
  weight = "normal",
  color = "primaryText",
  size = "md",
}: LabelProps) => {
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
      default:
        return 16;
    }
  }, [size]);

  return (
    <Text
      style={{
        color: useThemeColor(color),
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {label}
    </Text>
  );
};

export default Label;
