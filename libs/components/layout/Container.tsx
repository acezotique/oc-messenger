import { View } from "react-native";
import React, { PropsWithChildren } from "react";
import { RootContainerProps, useContainerStyle } from "./RootContainer";

type ContainerProps = RootContainerProps;

const Container = ({
  children,
  ...rest
}: PropsWithChildren<ContainerProps>) => {
  const containerStyle = useContainerStyle(rest);
  return (
    <View
      style={[
        containerStyle,
      ]}
    >
      {children}
    </View>
  );
};

export default Container;
