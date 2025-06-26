import React, { PropsWithChildren, useMemo } from "react";
import { View } from "react-native";

type GridProps = {
  items: Omit<GridItemProps, "cols">[];
  cols?: 1 | 2 | 3;
  identifier: string;
};

type GridItemProps = {
  item: React.ReactNode;
  cols?: 1 | 2 | 3;
  colSpan?: 1 | 2 | 3;
};

const Grid = ({ items, identifier, cols = 1 }: GridProps) => {
  const renderItems = useMemo(() => {
    return items.map(({ colSpan, item }, index) => (
      <GridItem
        cols={cols}
        colSpan={colSpan}
        item={item}
        key={`item-${identifier}-${index}`}
      />
    ));
  }, []);
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {renderItems}
    </View>
  );
};

const GridItem = ({ cols = 1, colSpan = 1, item }: GridItemProps) => (
  <View
    style={{
      flexBasis: `${(100 / cols) * colSpan}%`,
    }}
  >
    {item}
  </View>
);

export default Grid;
