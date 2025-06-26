import { View, Text } from "react-native";
import React from "react";
import Column from "@/libs/components/layout/Column";
import Label from "@/libs/components/elements/Label";
import { MessageType } from "@/types/chat";

type SystemMessageProps = {
  chat: MessageType;
};

const SystemMessage = ({ chat }: SystemMessageProps) => {
  return (
    <Column
      centered
      backgroundColor="searchBarBackground"
      style={{ borderRadius: 8, marginVertical: 8, marginHorizontal: 16 }}
    >
      <Label label={chat.message} weight="bold" size="sm" />
    </Column>
  );
};

export default SystemMessage;
