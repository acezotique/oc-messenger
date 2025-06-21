import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  View as DefaultView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { PropsWithChildren, useMemo } from "react";
import Colors from "@/constants/Colors";
import useThemeColor from "@/libs/hooks/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export type RootContainerProps = {
  backgroundColor?: keyof typeof Colors.light | keyof typeof Colors.dark;
  align?: "center" | "start" | "end";
  justify?: "center" | "start" | "end" | "space-between" | "space-around";
  centered?: boolean;
};

const RootContainer = ({
  children,
  ...rest
}: PropsWithChildren<RootContainerProps>) => {
  const containerStyle = useContainerStyle(rest);

  return (
    <KeyboardAvoidingView
      style={[containerStyle, { flex: 1 }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export function useContainerStyle({
  backgroundColor = "background",
  align = "start",
  justify = "start",
  centered,
}: RootContainerProps): StyleProp<DefaultView["props"]> {
  const themeColor = useThemeColor(backgroundColor) ?? undefined;
  const containerAlign = centered ? "center" : align;
  const containerJustify = centered ? "center" : justify;
  return {
    alignItems: containerAlign,
    justifyContent: containerJustify,
    backgroundColor: themeColor,
  } as StyleProp<DefaultView["props"]>;
}

export default RootContainer;
