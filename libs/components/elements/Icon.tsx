import { ColorKeys } from "@/constants/Colors";
import useThemeColor from "@/libs/hooks/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

type IconProps = {
  name: IconNameKeys;
  size?: number;
  color?: ColorKeys | undefined;
};

const IconName = {
  chatbox: "chatbox",
  person: "person",
  search: "search",
  pin: "pin",
  add: "add",
  "chevron-back": "chevron-back",
  "ellipsis-vertical": "ellipsis-vertical",
  send: "send",
  happy: "happy",
  camera: "camera",
  mic: "mic",
  close: "close",
  warning: "warning",
  notifications: "notifications",
  "notifications-off": "notifications-off",
  trash: "trash",
  information: "information",
  megaphone: "megaphone",
  people: "people",
  pencil: "pencil",
};

export type IconNameKeys = keyof typeof IconName;

const Icon = ({ name, size, color }: IconProps) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={useThemeColor(color ?? "searchBarBackground")}
    />
  );
};

export default Icon;
