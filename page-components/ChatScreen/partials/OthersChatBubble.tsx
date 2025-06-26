import React, { useMemo } from "react";
import Row from "@/libs/components/layout/Row";
import Avatar from "@/libs/components/ui/Avatar";
import useThemeColor from "@/libs/hooks/theme";
import Label from "@/libs/components/elements/Label";
import moment from "moment";
import { useRouter } from "expo-router";
import { MessageType } from "@/types/chat";
import { Pressable } from "react-native-gesture-handler";

type OthersChatBubbleProps = {
  chat: MessageType;
};

const OthersChatBubble = ({ chat }: OthersChatBubbleProps) => {
  const router = useRouter();
  const color = useThemeColor();
  const timestamp = useMemo(() => {
    const datetime = moment(chat.createdAt);
    if (moment().diff(datetime, "days") > 0) {
      return datetime.format("DD/MM/YYYY").toString();
    }
    return datetime.format("HH:mm").toString();
  }, [chat.createdAt]);
  return (
    <Pressable style={{ alignItems: "flex-start" }}>
      <Row
        align="flex-end"
        justify="flex-start"
        margin={8}
        gap={8}
        style={{ maxWidth: "70%" }}
      >
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/profile/[uid]",
              params: { uid: chat.uid },
            })
          }
        >
          <Avatar size="md" source={chat.avatar as string} />
        </Pressable>
        <Pressable
          onLongPress={() => {}}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: color["otherMessageBubble"],
            gap: 4,
          }}
        >
          <Label label={chat.message} weight="normal" size="sm" />
          <Row justify="flex-end">
            <Label label={timestamp} weight="normal" size="xxsm" />
          </Row>
        </Pressable>
      </Row>
    </Pressable>
  );
};

export default OthersChatBubble;
