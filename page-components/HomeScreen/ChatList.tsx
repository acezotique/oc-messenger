import Label from "@/libs/components/elements/Label";
import Column from "@/libs/components/layout/Column";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/libs/hooks/firebase";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { ChatType } from "@/types/chat";
import ChatCard from "./partials/ChatCard";
import Divider from "@/libs/components/elements/Divider";

type ChatListProps = {
  keyword: string;
};

const ChatList = ({ keyword }: ChatListProps) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { uid } = useUserSession();
  const [chatData, setChatData] = useState<ChatType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const retrieveChatData = () => {
    const q = query(
      collection(db, "chat"),
      where("members", "array-contains", uid),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (querySnapshot) => {
      setChatData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatType[]
      );
    });
  };

  const onSearchChat = (query: string) => {
    if (!query) {
      retrieveChatData();
    }

    const filteredData = chatData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setChatData(filteredData);
  };

  const handleNavigation = async (chatId: string, chatName: string) => {
    const dataKey = `unread.${uid}`;
    await updateDoc(doc(db, "chat", chatId), { [dataKey]: 0 });

    router.push({
      pathname: "/chat/[chatId]",
      params: { chatId: chatId, chatName: chatName },
    });
  };

  useLayoutEffect(() => {
    const unsubscribe = retrieveChatData();

    return () => unsubscribe();
  }, [navigation]);

  useEffect(() => onSearchChat(keyword), [keyword]);

  return (
    <FlatList
      data={chatData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatCard chatData={item} handleNavigation={handleNavigation} />
      )}
      ItemSeparatorComponent={() => <Divider direction="horizontal" />}
      ListEmptyComponent={() => (
        <Column
          centered
          backgroundColor="primaryAccentColor"
          style={{ borderRadius: 8, marginVertical: 8, marginHorizontal: 16 }}
        >
          <Label label="No chats yet." weight="bold" size="sm" />
        </Column>
      )}
      onRefresh={() => {
        setRefreshing(true);
        retrieveChatData();
        setRefreshing(false);
      }}
      refreshing={refreshing}
    />
  );
};

export default ChatList;
