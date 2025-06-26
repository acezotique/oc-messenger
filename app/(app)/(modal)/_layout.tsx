import { Stack } from "expo-router";
import React from "react";

const ModalLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="create-chat" options={{ presentation: "modal" }} />
      <Stack.Screen name="edit-profile" options={{ presentation: "modal" }} />
      <Stack.Screen name="chat-modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="profile/[uid]" options={{ presentation: "modal" }} />
      <Stack.Screen
        name="chat/info/[chatId]"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
};

export default ModalLayout;
