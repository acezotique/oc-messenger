import { View, Image } from "react-native";
import React, { useMemo } from "react";
import Icon from "../elements/Icon";
import useThemeColor from "@/libs/hooks/theme";

type AvatarProps = {
  source?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const Avatar = ({ source, size }: AvatarProps) => {
  const color = useThemeColor();
  const bgColor = color["primaryAccentColor"];
  const dimension = useMemo(() => {
    switch (size) {
      case "sm":
        return 25;
      case "md":
        return 50;
      case "lg":
        return 100;
      case "xl":
        return 150;
      default:
        return 50;
    }
  }, [size]);

  const iconSize = useMemo(() => {
    switch (size) {
      case "sm":
        return 20;
      case "md":
        return 40;
      case "lg":
        return 80;
      case "xl":
        return 120;
      default:
        return 40;
    }
  }, [size]);

  return (
    <View
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: bgColor,
        borderRadius: dimension,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {source ? (
        <Image
          source={{ uri: source }}
          width={dimension}
          height={dimension}
          borderRadius={50}
        />
      ) : (
        <Icon name="person" size={iconSize} />
      )}
    </View>
  );
};

export default Avatar;
