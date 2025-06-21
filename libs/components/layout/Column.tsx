import { DimensionValue, StyleProp, View } from "react-native";
import React, { PropsWithChildren, useMemo } from "react";
import { RootContainerProps, useContainerStyle } from "./RootContainer";

type ColumnProps = RootContainerProps & {
  flex?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  margin?: DimensionValue;
  marginOrientation?: "horizontal" | "vertical";
  padding?: DimensionValue;
  paddingOrientation?: "horizontal" | "vertical";
  style?: StyleProp<View["props"]>;
  gap?: 2 | 4 | 6 | 8 | 10 | 15 | 20 | 25 | 30;
};

const Column = ({
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
}: PropsWithChildren<ColumnProps>) => {
  const containerStyle = useContainerStyle(rest);
  const rowStyle = useMemo(() => {
    return [
      {
        flex: flex ? 1 : undefined,
        flexDirection: "column",
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
    ] as StyleProp<View["props"]>;
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

export default Column;
