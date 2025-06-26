import Column from "@/libs/components/layout/Column";
import RootContainer from "@/libs/components/layout/RootContainer";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import EmojiSelector from "react-native-emoji-selector";

const PopupModal = () => {
  const { chatId, chatName, mode } = useLocalSearchParams();
  const router = useRouter();

  const onEmojiSelected = (emoji: string) => {
    router.dismissTo({
      pathname: "/(app)/chat/[chatId]",
      params: {
        chatId: chatId as string,
        chatName: chatName,
        emoji: emoji,
      },
    });
  };

  return (
    <RootContainer backgroundColor="background">
      <Column backgroundColor="background" flex padding={16}>
        <EmojiSelector onEmojiSelected={onEmojiSelected} />
      </Column>
    </RootContainer>
  );
};

export default PopupModal;
