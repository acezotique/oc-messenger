import { ColorType } from "@/constants/Colors";
import Icon from "@/libs/components/elements/Icon";
import Label from "@/libs/components/elements/Label";
import Column from "@/libs/components/layout/Column";
import { useContainerStyle } from "@/libs/components/layout/RootContainer";
import Row from "@/libs/components/layout/Row";
import Avatar from "@/libs/components/ui/Avatar";
import Badge from "@/libs/components/ui/Badge";
import useThemeColor from "@/libs/hooks/theme";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { ChatType } from "@/types/chat";
import moment from "moment";
import React from "react";
import { Pressable } from "react-native-gesture-handler";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";
import RightSwipeActions from "./RightSwipeActions";
import { usePinChat } from "@/api-actions/chat";

type ChatCardProps = {
  chatData: ChatType;
  handleNavigation: (chatId: string, chatName: string) => Promise<void>;
};

const ChatCard = ({
  chatData: {
    id,
    isGroup,
    name,
    avatar,
    lastMessage,
    users,
    pinned,
    unread,
    createdAt,
  },
  handleNavigation,
}: ChatCardProps) => {
  const { uid } = useUserSession();
  const { mutate: pinChat } = usePinChat();
  const containerStyle = useContainerStyle({ justify: "space-between" });
  const { pressedBackground } = useThemeColor() as ColorType;

  return (
    <ReanimatedSwipeable
      friction={2}
      rightThreshold={40}
      renderRightActions={(
        prog: SharedValue<number>,
        drag: SharedValue<number>,
        method: SwipeableMethods
      ) => (
        <RightSwipeActions
          prog={prog}
          drag={drag}
          onPin={() => {
            pinChat({ uid: uid!, chatId: id, pinned: pinned });
            method.close();
          }}
          onDelete={() => {}}
        />
      )}
    >
      <Pressable
        style={({ pressed }) => ({
          ...(containerStyle as object),
          backgroundColor: pressed ? pressedBackground : undefined,
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
            {pinned.includes(uid!) && (
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
    </ReanimatedSwipeable>
  );
};

export default ChatCard;
