import useThemeColor from "@/libs/hooks/theme";
import React from "react";
import Row from "../layout/Row";

export type DividerProps = {
  direction: "horizontal" | "vertical";
};

const Divider = ({ direction }: DividerProps) => {
  const color = useThemeColor();
  if (direction === "horizontal") {
    <Row
      style={{
        borderColor: color["primaryText"],
        borderWidth: 1,
        opacity: 0.1,
      }}
    />;
  }

  return (
    <Row
      style={{
        borderColor: color["primaryText"],
        borderWidth: 1,
        opacity: 0.1,
      }}
    />
  );
};

export default Divider;
