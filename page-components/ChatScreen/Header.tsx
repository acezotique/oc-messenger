import React from "react";
import Column from "@/libs/components/layout/Column";
import Row from "@/libs/components/layout/Row";
import Label from "@/libs/components/elements/Label";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import { useRouter } from "expo-router";

type HeaderType = {
  name: string;
  uid?: string[];
  chatId?: string;
  isGroup?: boolean;
};

const Header = ({ name, uid, chatId, isGroup }: HeaderType) => {
  const router = useRouter();
  return (
    <Column>
      <Row
        style={{ paddingHorizontal: 16, paddingBottom: 16 }}
        justify="space-between"
        align="center"
      >
        <Button
          onPress={() => router.back()}
          label={<Icon name="chevron-back" size={24} color="primaryText" />}
          variant="round"
          transparent
        />
        <Label label={name} weight="bold" size="md" />
        <Button
          onPress={() =>
            !isGroup
              ? router.push({
                  pathname: "/profile/[uid]",
                  params: { uid: uid?.[0]! },
                })
              : router.push({
                  pathname: "/chat/info/[chatId]",
                  params: { chatId: chatId! },
                })
          }
          label={<Icon name="information" size={24} color="primaryText" />}
          variant="round"
          transparent
        />
      </Row>
    </Column>
  );
};

export default Header;
