import { FlatList, View } from "react-native";
import React from "react";
import UserChatBubble from "./partials/UserChatBubble";
import OthersChatBubble from "./partials/OthersChatBubble";
import Label from "@/libs/components/elements/Label";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { MessageType } from "@/types/chat";
import SystemMessage from "./partials/SystemMessage";

export type ChatsProps = {
  chats: MessageType[];
};

const Chats = ({ chats }: ChatsProps) => {
  const { uid } = useUserSession();

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        item.uid === "system" ? (
          <SystemMessage chat={item} />
        ) : item.uid === uid ? (
          <UserChatBubble chat={item} />
        ) : (
          <OthersChatBubble chat={item} />
        )
      }
      ListEmptyComponent={() => (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            margin: 16,
            transform: [{ rotateX: "180deg" }],
          }}
        >
          <Label label="No messages yet" size="sm" />
        </View>
      )}
      contentContainerStyle={{ flex: 1 }}
      inverted
    />
  );
};

export default Chats;
