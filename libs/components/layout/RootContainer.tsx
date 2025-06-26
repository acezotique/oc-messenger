import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  View as DefaultView,
  Keyboard,
} from "react-native";
import React, { PropsWithChildren, useMemo } from "react";
import { ColorKeys } from "@/constants/Colors";
import useThemeColor from "@/libs/hooks/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";

export type RootContainerProps = {
  backgroundColor?: ColorKeys;
  align?: "center" | "flex-start" | "flex-end";
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around";
  centered?: boolean;
  disableBottomSafeArea?: boolean;
};

const RootContainer = ({
  children,
  disableBottomSafeArea = false,
  ...rest
}: PropsWithChildren<RootContainerProps>) => {
  const containerStyle = useContainerStyle(rest);

  return (
    <GestureHandlerRootView style={[containerStyle, { flex: 1 }]}>
      <KeyboardAvoidingView
        style={[containerStyle, { flex: 1 }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <SafeAreaView
            style={{ flex: 1 }}
            edges={disableBottomSafeArea ? ["top"] : undefined}
          >
            {children}
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

export function useContainerStyle({
  backgroundColor = "transparent",
  align,
  justify,
  centered,
}: RootContainerProps): StyleProp<DefaultView["props"]> {
  const color = useThemeColor();
  const themeColor = color[backgroundColor];
  const containerAlign = centered ? "center" : align;
  const containerJustify = centered ? "center" : justify;
  return {
    alignItems: containerAlign,
    justifyContent: containerJustify,
    backgroundColor: themeColor,
  } as StyleProp<DefaultView["props"]>;
}

export default RootContainer;
