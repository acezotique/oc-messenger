import { View, Text } from "react-native";
import React from "react";
import Label from "../elements/Label";

type BadgeProps = {
  count: number;
};

const Badge = ({ count }: BadgeProps) => {
  return (
    <View
      style={{
        backgroundColor: "red",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 20,
        height: 20,
      }}
    >
      <Label
        label={count > 99 ? "99+" : count > 0 ? count.toString() : ""}
        size="xxsm"
        color="white"
        weight="bold"
      />
    </View>
  );
};

export default Badge;
