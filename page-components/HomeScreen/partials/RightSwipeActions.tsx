import { ColorType } from "@/constants/Colors";
import Icon from "@/libs/components/elements/Icon";
import Label from "@/libs/components/elements/Label";
import useThemeColor from "@/libs/hooks/theme";
import React from "react";
import { Pressable } from "react-native-gesture-handler";
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type RightSwipeActionsProps = {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  onPin: () => void;
  onDelete: () => void;
};

const RightSwipeActions = ({
  prog,
  drag,
  onPin,
  onDelete,
}: RightSwipeActionsProps) => {
  const { pressedBackground, searchBarBackground, error } =
    useThemeColor() as ColorType;
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 144 }],
      width: 144,
      flexDirection: "row",
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <Pressable
        onPress={onPin}
        style={({ pressed }) => ({
          height: 72,
          width: 72,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: pressed ? pressedBackground : searchBarBackground,
          gap: 2,
        })}
      >
        <Icon name="pin" size={24} color="white" />
        <Label label="Pin" color="white" weight="bold" size="sm" />
      </Pressable>
      <Pressable
        onPress={onDelete}
        style={({ pressed }) => ({
          height: 72,
          width: 72,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: pressed ? pressedBackground : error,
          gap: 2,
        })}
      >
        <Icon name="trash" size={24} color="white" />
        <Label label="Delete" color="white" weight="bold" size="sm" />
      </Pressable>
    </Reanimated.View>
  );
};

export default RightSwipeActions;
