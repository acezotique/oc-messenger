import {
  StyleProp,
  ViewStyle,
  Pressable,
  FlexAlignType,
  Text,
} from "react-native";
import React, { useMemo } from "react";
import useThemeColor from "@/libs/hooks/theme";
import Label from "./Label";
import Colors from "@/constants/Colors";

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
  variant?: "link";
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
}: ButtonProps) => {
  const buttonColor = useThemeColor("primaryAccentColor");
  const buttonStyle = useMemo(() => {
    if (typeof style === "function") {
      return style;
    } else {
      return ({ pressed }: { pressed: boolean }) => ({
        backgroundColor: pressed ? Colors.light.secondaryText : buttonColor,
        padding: 10,
        marginVertical: 10,
        alignItems: "center" as FlexAlignType,
        borderRadius: 4,
        ...(style as object),
      });
    }
  }, [style, buttonColor]);

  const buttonLabel = useMemo(() => {
    if (typeof label === "string") {
      return (
        <Label label={label} color="primaryText" weight="bold" size="sm" />
      );
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
    </Pressable>
  );
};

export default Button;
