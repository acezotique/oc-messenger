import Label from "@/libs/components/elements/Label";
import Column from "@/libs/components/layout/Column";
import Row from "@/libs/components/layout/Row";
import useThemeColor from "@/libs/hooks/theme";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList } from "react-native";
import moment from "moment";
import { useContainerStyle } from "@/libs/components/layout/RootContainer";
import Icon from "@/libs/components/elements/Icon";
import Avatar from "@/libs/components/ui/Avatar";
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
import Badge from "@/libs/components/ui/Badge";
import { Pressable } from "react-native-gesture-handler";
import { ChatType } from "@/types/chat";

type ChatListProps = {
  keyword: string;
};

const ChatList = ({ keyword }: ChatListProps) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { uid } = useUserSession();
  const containerStyle = useContainerStyle({ justify: "space-between" });
  const pressedBackgroundColor = useThemeColor("pressedBackground");
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
      renderItem={({
        item: {
          id,
          name,
          lastMessage,
          createdAt,
          pinned,
          isGroup,
          avatar,
          users,
          unread,
        },
      }) => (
        <Pressable
          style={({ pressed }) => ({
            ...(containerStyle as object),
            backgroundColor: pressed ? pressedBackgroundColor : undefined,
            height: 72,
            flexDirection: "row",
            paddingHorizontal: 16,
          })}
          onPress={() =>
            handleNavigation(
              id,
              isGroup ? name : users.find((user) => user.uid !== uid)?.name!
            )
          }
        >
          <Column justify="center" align="center" width="15%">
            <Avatar
              size="md"
              source={
                isGroup
                  ? avatar
                  : users.find((user) => user.uid !== uid)?.profilePicture!
              }
            />
          </Column>
          <Column justify="flex-start" flex padding={8}>
            <Label
              label={
                isGroup ? name : users.find((user) => user.uid !== uid)?.name
              }
              size="sm"
              color="primaryText"
              weight="bold"
            />
            <Label
              label={lastMessage}
              size="sm"
              color="primaryText"
              truncate
              numberOfLines={2}
            />
          </Column>
          <Column
            justify="space-between"
            align="flex-end"
            width="15%"
            padding={2}
            paddingOrientation="vertical"
          >
            <Row height="33%" align="flex-start">
              {pinned && (
                <Icon name="pin" size={16} color="primaryAccentColor" />
              )}
            </Row>
            <Row height="33%" align="center">
              {unread && unread[uid!] > 0 && <Badge count={unread[uid!]} />}
            </Row>
            <Row height="33%" align="flex-end">
              <Label
                label={moment(createdAt).format("HH:mm").toString()}
                size="sm"
                color="primaryText"
              />
            </Row>
          </Column>
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <Row
          style={{
            borderColor: useThemeColor("primaryText"),
            borderWidth: 1,
            opacity: 0.1,
          }}
        />
      )}
      ListEmptyComponent={() => (
        <Row
          centered
          backgroundColor="primaryAccentColor"
          margin={16}
          padding={8}
          style={{ borderRadius: 10 }}
        >
          <Label label="No chats yet" size="sm" weight="bold" color="white" />
        </Row>
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
