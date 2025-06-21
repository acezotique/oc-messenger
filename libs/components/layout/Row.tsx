import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";
import React, { PropsWithChildren, useMemo } from "react";
import { RootContainerProps, useContainerStyle } from "./RootContainer";

type RowProps = RootContainerProps & {
  flex?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  margin?: DimensionValue;
  marginOrientation?: "horizontal" | "vertical";
  padding?: DimensionValue;
  paddingOrientation?: "horizontal" | "vertical";
  style?: StyleProp<ViewStyle>;
  gap?: 2 | 4 | 6 | 8 | 10 | 15 | 20 | 25 | 30;
};

const Row = ({
  flex,
  width,
  height,
  margin,
  marginOrientation,
  padding,
  paddingOrientation,
  style,
  gap,
  children,
  ...rest
}: PropsWithChildren<RowProps>) => {
  const containerStyle = useContainerStyle(rest);
  const rowStyle = useMemo(() => {
    return [
      {
        flex: flex ? 1 : undefined,
        flexDirection: "row",
        width: width,
        height: height,
        margin: !marginOrientation && margin,
        marginHorizontal: marginOrientation === "horizontal" && margin,
        marginVertical: marginOrientation === "vertical" && margin,
        padding: !paddingOrientation && padding,
        paddingHorizontal: paddingOrientation === "horizontal" && padding,
        paddingVertical: paddingOrientation === "vertical" && padding,
        gap: gap,
      },
      containerStyle,
      style,
    ] as StyleProp<ViewStyle>;
  }, [
    width,
    height,
    margin,
    marginOrientation,
    padding,
    paddingOrientation,
    style,
    containerStyle,
  ]);

  return <View style={rowStyle}>{children}</View>;
};

export default Row;
