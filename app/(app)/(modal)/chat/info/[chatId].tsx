import React, { useEffect, useState } from "react";
import RootContainer from "@/libs/components/layout/RootContainer";
import Column from "@/libs/components/layout/Column";
import Label from "@/libs/components/elements/Label";
import Row from "@/libs/components/layout/Row";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import Avatar from "@/libs/components/ui/Avatar";
import { useGetChatById } from "@/api-actions/chat";
import SearchBar from "@/libs/components/elements/SearchBar";
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler";
import { User } from "@/types/user";

const GroupInfoModal = () => {
  const router = useRouter();
  const { chatId } = useLocalSearchParams();
  const { data: chatData } = useGetChatById(chatId as string);
  const [keyword, setKeyword] = useState("");
  const [members, setMembers] = useState<User[]>(chatData?.users || []);

  const onSearchMember = (keyword: string) => {
    if (!keyword) {
      setMembers(chatData?.users || []);
    }

    const filteredMembers = chatData?.users.filter((member) => {
      return member.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setMembers((filteredMembers || []) as User[]);
  };

  useEffect(() => {
    onSearchMember(keyword);
  }, [keyword]);

  return (
    <RootContainer backgroundColor="background">
      <ScrollView>
        <Row padding={16} justify="space-between" align="center">
          <Label
            label="Group Info"
            color="primaryText"
            size="md"
            weight="bold"
          />
          <Button
            label={<Icon name="close" color="primaryText" size={16} />}
            onPress={() => router.back()}
            variant="round"
          />
        </Row>
        <Column align="center" gap={15} padding={16}>
          <Avatar source={chatData?.avatar ?? ""} size="xl" />
          <Column centered>
            <Label label={chatData?.name} weight="bold" size="md" />
          </Column>
        </Column>
        <Row
          padding={16}
          paddingOrientation="horizontal"
          align="center"
          justify="space-between"
        >
          <Row gap={8} align="center">
            <Label label="Members" weight="bold" size="md" />
            <Icon name="people" color="primaryText" size={24} />
          </Row>
          <Button
            label={<Icon name="add" color="primaryText" size={16} />}
            onPress={() => {}}
            variant="round"
          />
        </Row>
        <Row padding={16}>
          <SearchBar
            onChange={setKeyword}
            placeholder="Search Member"
            showButton={false}
          />
        </Row>
        <Column>
          <FlatList
            data={members}
            keyExtractor={(item) => item.uid}
            renderItem={(item) => (
              <Pressable
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 8,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/profile/[uid]",
                    params: { uid: item.item.uid },
                  })
                }
              >
                <Avatar source={item.item.profilePicture!} size="lg" />
                <Label label={item.item.name} size="sm" />
                <Label
                  label={
                    chatData?.admin === item.item.uid ? "Admin" : undefined
                  }
                  size="sm"
                />
              </Pressable>
            )}
            horizontal
            ListEmptyComponent={() => (
              <Column centered padding={16}>
                <Label label="No Members Found" size="sm" />
              </Column>
            )}
          />
        </Column>
        <Row align="center" padding={16} justify="space-between">
          <Row gap={8} align="center">
            <Label label="Announcement" weight="bold" size="md" />
            <Icon name="megaphone" color="primaryText" size={24} />
          </Row>
          <Button
            label={<Icon name="pencil" color="primaryText" size={16} />}
            onPress={() => {}}
            variant="round"
          />
        </Row>
        <Column centered>
          <Label
            label={chatData?.announcement ?? "No announcement"}
            weight="normal"
            size="sm"
          />
        </Column>
        <Column padding={16}>
          <Button label="Leave Group" onPress={() => {}} />
        </Column>
      </ScrollView>
    </RootContainer>
  );
};

export default GroupInfoModal;
