import { Stack } from "expo-router";
import React from "react";

const ChatLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[chatId]" />
    </Stack>
  );
};

export default ChatLayout;
