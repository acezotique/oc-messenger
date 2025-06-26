import {
  StyleProp,
  ViewStyle,
  FlexAlignType,
  Text,
  ActivityIndicator,
} from "react-native";
import React, { useMemo } from "react";
import useThemeColor from "@/libs/hooks/theme";
import Label from "./Label";
import { Pressable } from "react-native-gesture-handler";
import { ColorKeys } from "@/constants/Colors";

type ButtonProps = {
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
  label?: string | React.ReactNode;
  disabled?: boolean;
  style?:
    | StyleProp<ViewStyle>
    | ((e: { pressed?: boolean }) => StyleProp<ViewStyle>);
  variant?: "link" | "round";
  transparent?: boolean;
  loading?: boolean;
  labelColor?: ColorKeys
  backgroundColor?: ColorKeys
};

const Button = ({
  label,
  onPress,
  onPressIn,
  onPressOut,
  onLongPress,
  disabled,
  style,
  variant,
  transparent = false,
  loading = false,
  labelColor = "white",
  backgroundColor = "primaryAccentColor",
}: ButtonProps) => {
  const buttonColor = useThemeColor(backgroundColor);
  const buttonPressedColor = useThemeColor("pressedBackground");
  const buttonStyle = useMemo(() => {
    if (typeof style === "function") {
      return style;
    } else {
      return ({ pressed }: { pressed: boolean }) => ({
        backgroundColor: pressed
          ? buttonPressedColor
          : transparent
          ? undefined
          : buttonColor,
        padding: 10,
        alignItems: "center" as FlexAlignType,
        justifyContent: "center",
        gap: 8,
        borderRadius: variant === "round" ? 50 : 4,
        flexDirection: 'row',
        ...(style as object),
      });
    }
  }, [style, buttonColor]);

  const buttonLabel = useMemo(() => {
    if (typeof label === "string") {
      return (
        <Label label={label} color={labelColor} weight="bold" size="sm" />
      );
    } else {
      return label;
    }
  }, [label]);

  if (variant === "link") {
    return (
      <Text
        style={{
          color: buttonColor,
          fontFamily: "Roboto_400Regular",
          fontSize: 16,
          textAlign: "center",
        }}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
      >
        {label}
      </Text>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      disabled={disabled}
      style={buttonStyle}
    >
      {buttonLabel}
      {loading && <ActivityIndicator />}
    </Pressable>
  );
};

export default Button;
