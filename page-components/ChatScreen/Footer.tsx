import React, { useState } from "react";
import Row from "@/libs/components/layout/Row";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import Input from "@/libs/components/elements/Input";
import Column from "@/libs/components/layout/Column";
import { useRouter } from "expo-router";

type FooterProps = {
  handleSendMessage: (message: string) => void;
  chatId: string;
  chatName: string;
  otherUsers: string[];
};

const Footer = ({
  handleSendMessage,
  chatId,
  chatName,
  otherUsers,
}: FooterProps) => {
  const [text, setText] = useState("");
  const router = useRouter();

  const onSendMessage = () => {
    handleSendMessage(text);
    setText("");
  };

  return (
    <Row
      style={{ paddingHorizontal: 16 }}
      align="flex-end"
      justify="space-between"
    >
      <Column style={{ marginRight: 8 }} flex>
        <Input
          value={text}
          type="text"
          onChange={(e) => setText(e.nativeEvent.text)}
          multiline
        />
      </Column>
      <Row gap={2}>
        <Button
          onPress={() =>
            router.push({
              pathname: "/chat-modal",
              params: {
                chatId: chatId,
                chatName: chatName,
                mode: "media",
              },
            })
          }
          label={<Icon name="ellipsis-vertical" size={18} color="white" />}
          variant="round"
        />
        <Button
          onPress={() =>
            router.push({
              pathname: "/chat-modal",
              params: {
                chatId: chatId,
                chatName: chatName,
                mode: "emoji",
              },
            })
          }
          label={<Icon name="happy" size={18} color="white" />}
          variant="round"
        />
        <Button
          onPress={() =>
            router.push({
              pathname: "/chat-modal",
              params: {
                chatId: chatId,
                chatName: chatName,
                mode: "emoji",
              },
            })
          }
          label={<Icon name="mic" size={18} color="white" />}
          variant="round"
        />
        <Button
          onPress={onSendMessage}
          label={<Icon name="send" size={18} color="white" />}
          variant="round"
          disabled={otherUsers.length === 1 || !text}
        />
      </Row>
    </Row>
  );
};

export default Footer;
