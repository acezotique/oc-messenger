import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import RootContainer from "@/libs/components/layout/RootContainer";
import Header from "@/page-components/ChatScreen/Header";
import Chats from "@/page-components/ChatScreen/Chats";
import Footer from "@/page-components/ChatScreen/Footer";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/libs/hooks/firebase";
import moment from "moment";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { useGetUserDataByUid } from "@/api-actions/user";
import { useGetChatById } from "@/api-actions/chat";
import { View } from "react-native";
import { MessageType } from "@/types/chat";

const ChatScreen = () => {
  const { chatId, chatName, emoji } = useLocalSearchParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { uid } = useUserSession();
  const { data: userProfile } = useGetUserDataByUid(uid!);
  const { data: chatData } = useGetChatById(chatId as string);
  const router = useRouter();

  const otherUsers = useMemo(() => {
    if (chatData) {
      return chatData.members.filter((item) => item !== uid);
    }
    return [];
  }, [chatData]);

  const handleSendMessage = async (message: string) => {
    const currentTimestamp = moment().toLocaleString();

    await runTransaction(db, async (transaction) => {
      const unread = otherUsers.map((item) => `unread.${item}`);
      unread.forEach((item) =>
        transaction.update(doc(db, "chat", chatId as string), {
          [item]: increment(1),
        })
      );
      transaction.update(doc(db, "chat", chatId as string), {
        lastSender: userProfile?.name,
        lastMessage: message,
        createdAt: currentTimestamp,
      });
    });

    addDoc(collection(db, "chat", chatId as string, "messages"), {
      uid: uid,
      name: userProfile?.name,
      message: message,
      avatar: userProfile?.profilePicture,
      createdAt: currentTimestamp,
    });
  };

  const retriveChats = (id: string) => {
    const q = query(
      collection(db, "chat", id, "messages"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MessageType[]
      );
    });
  };

  useEffect(() => {
    if (emoji) {
      handleSendMessage(emoji as string);
      router.setParams({ emoji: "" });
    }
  }, [emoji]);

  useLayoutEffect(() => {
    const unsub = retriveChats(chatId as string);
    return () => unsub();
  }, [chatId]);

  return (
    <RootContainer backgroundColor="background">
      <View style={{ flex: 1 }}>
        <Header
          name={chatName as string}
          uid={otherUsers}
          chatId={chatId as string}
          isGroup={chatData?.isGroup}
        />
        <Chats chats={messages} />
        <Footer
          handleSendMessage={(message) => handleSendMessage(message)}
          chatId={chatId as string}
          chatName={chatName as string}
          otherUsers={otherUsers}
        />
      </View>
    </RootContainer>
  );
};

export default ChatScreen;
