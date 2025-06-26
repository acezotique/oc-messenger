import { View, ScrollView, FlatList, Switch } from "react-native";
import React, { useEffect, useState } from "react";
import RootContainer from "@/libs/components/layout/RootContainer";
import Label from "@/libs/components/elements/Label";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { useGetAllUsers } from "@/api-actions/user";
import { useCreateChat } from "@/api-actions/chat";
import { User } from "@/types/user";
import useThemeColor from "@/libs/hooks/theme";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import Row from "@/libs/components/layout/Row";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import SearchBar from "@/libs/components/elements/SearchBar";
import Column from "@/libs/components/layout/Column";
import Avatar from "@/libs/components/ui/Avatar";
import AvatarField from "@/libs/components/forms/AvatarField";
import FormField from "@/libs/components/forms/FormField";
import Input from "@/libs/components/elements/Input";
import { Pressable } from "react-native-gesture-handler";

const ChatCreationSchema = z
  .object({
    avatar: z.string().optional(),
    name: z.string().optional(),
    members: z
      .object({
        uid: z.string(),
      })
      .array()
      .min(2, "Select at least a member."),
    isGroup: z.boolean(),
    admin: z.string().optional(),
  })
  .superRefine((obj, ctx) => {
    if (obj.isGroup) {
      if (obj.members.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["members"],
          message: "Group must have at least 2 members",
        });
      }
    }
  });

type ChatCreationFormType = z.infer<typeof ChatCreationSchema>;

const CreateChatModal = () => {
  const router = useRouter();
  const { uid: currentUid } = useUserSession();
  const { data: users, refetch } = useGetAllUsers(currentUid!);
  const { mutate: createChat } = useCreateChat();
  const [members, setMembers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const borderColor = useThemeColor("primaryAccentColor");
  const pressedBackgroundColor = useThemeColor("pressedBackground");

  const { control, handleSubmit, watch } = useForm<ChatCreationFormType>(
    {
      resolver: zodResolver(ChatCreationSchema),
      defaultValues: {
        avatar: "",
        name: "",
        members: [{ uid: currentUid! }],
        isGroup: false,
      },
    }
  );

  const [selectedMembers, isGroup] = watch(["members", "isGroup"]);

  const { append, remove, replace } = useFieldArray({
    control: control,
    name: "members",
  });

  const onSelectMember = async (uid: string) => {
    if (!isGroup) {
      if (selectedMembers.length > 1) {
        remove(
          selectedMembers.findIndex((member) => member.uid !== currentUid)
        );
        append({ uid: uid });
      } else if (selectedMembers.length === 1) {
        append({ uid: uid });
      }
    } else {
      if (selectedMembers.some((member) => member.uid === uid)) {
        remove(selectedMembers.findIndex((member) => member.uid === uid));
      } else {
        append({ uid: uid });
      }
    }
  };

  const onSearchMember = (keyword: string) => {
    if (!keyword) {
      setMembers(users || []);
    }

    const filteredMembers = users?.filter((member) => {
      return member.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setMembers((filteredMembers || []) as User[]);
  };

  const onRefreshMembers = () => {
    refetch();
    const filteredMembers = users?.filter(
      (member) => member.uid !== currentUid
    );
    setMembers(filteredMembers || []);
  };

  const onCreateChat: SubmitHandler<ChatCreationFormType> = async (payload) => {
    const members = payload.members.map((member) => member.uid);
    createChat(
      {
        ...payload,
        name: payload.name!,
        members,
        admin: payload.isGroup ? currentUid! : "",
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };

  useEffect(() => {
    onRefreshMembers();
  }, [users]);

  useEffect(() => {
    onSearchMember(keyword);
  }, [keyword]);

  return (
    <RootContainer backgroundColor="background">
      <ScrollView>
        <View>
          <Row padding={16} justify="space-between" align="center">
            <Label
              label="Create new Chat/Group"
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
          <Row padding={16} paddingOrientation="horizontal">
            <Label label="Members" weight="bold" size="md" />
          </Row>
          <Row padding={16}>
            <SearchBar
              onChange={setKeyword}
              placeholder="Search Member"
              showButton={false}
            />
          </Row>
          <Controller
            control={control}
            name="members"
            render={({ fieldState: { error } }) => (
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
                      onPress={() => onSelectMember(item.item.uid)}
                    >
                      <Column
                        style={{
                          borderRadius: 50,
                          borderWidth: 3,
                          borderColor: selectedMembers.some(
                            (member) => member.uid === item.item.uid
                          )
                            ? borderColor
                            : undefined,
                        }}
                      >
                        <Avatar source={item.item.profilePicture!} size="lg" />
                      </Column>
                      <Label label={item.item.name} size="sm" />
                    </Pressable>
                  )}
                  horizontal
                  onStartReached={() => refetch()}
                  ListEmptyComponent={() => (
                    <Column centered padding={16}>
                      <Label label="No Members Found" size="sm" />
                    </Column>
                  )}
                />
                <Row centered>
                  <Label label={error?.message} color="error" size="xsm" />
                </Row>
              </Column>
            )}
          />
          <Controller
            control={control}
            name="isGroup"
            render={({ field: { onChange, value } }) => (
              <Row padding={16} align="center" gap={8}>
                <Label label="Create Group: " size="sm" />
                <Switch
                  trackColor={{
                    true: borderColor,
                    false: pressedBackgroundColor,
                  }}
                  thumbColor={useThemeColor("white")}
                  value={value}
                  onValueChange={(e) => {
                    onChange(e);
                    replace([{ uid: currentUid! }]);
                  }}
                />
              </Row>
            )}
          />
          {isGroup && (
            <>
              <Row padding={16}>
                <Label label="Group Details" weight="bold" size="md" />
              </Row>
              <Column centered>
                <AvatarField
                  control={control}
                  name="avatar"
                  size="xl"
                  label="Change Avatar"
                />
              </Column>
              <Column padding={16}>
                <FormField
                  control={control}
                  name="name"
                  label="Group Name"
                  direction="column"
                  renderField={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      value={value as string}
                      onChange={(e) => onChange(e.nativeEvent.text)}
                      onBlur={onBlur}
                      type="text"
                    />
                  )}
                />
              </Column>
            </>
          )}
          <Column padding={16} gap={8}>
            <Button label="Create" onPress={handleSubmit(onCreateChat)} />
          </Column>
        </View>
      </ScrollView>
    </RootContainer>
  );
};

export default CreateChatModal;
