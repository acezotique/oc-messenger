import React, { useMemo } from "react";
import Row from "@/libs/components/layout/Row";
import Avatar from "@/libs/components/ui/Avatar";
import useThemeColor from "@/libs/hooks/theme";
import Label from "@/libs/components/elements/Label";
import Column from "@/libs/components/layout/Column";
import moment from "moment";
import { Pressable } from "react-native-gesture-handler";
import { MessageType } from "@/types/chat";

type UserChatBubbleProps = {
  chat: MessageType;
};

const UserChatBubble = ({ chat }: UserChatBubbleProps) => {
  const timestamp = useMemo(() => {
    const datetime = moment(chat.createdAt);
    if (moment().diff(datetime, "days") > 0) {
      return datetime.format("DD/MM/YYYY").toString();
    }
    return datetime.format("HH:mm").toString();
  }, [chat.createdAt]);

  return (
    <Column align="flex-end">
      <Row
        align="flex-end"
        justify="flex-end"
        padding={8}
        gap={8}
        style={{ maxWidth: "70%" }}
      >
        <Pressable
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: useThemeColor("userMessageBubble"),
            gap: 4
          }}
        >
          <Label label={chat.message} weight="normal" size="sm" />
          <Label
            label={timestamp}
            weight="normal"
            size="xxsm"
          />
        </Pressable>
        <Pressable onLongPress={() =>console.log(chat.avatar)}>
          <Avatar size="md" source={chat.avatar as string} />
        </Pressable>
      </Row>
    </Column>
  );
};

export default UserChatBubble;
