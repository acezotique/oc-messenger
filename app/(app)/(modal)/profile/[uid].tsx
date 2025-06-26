import { useGetUserDataByUid } from "@/api-actions/user";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import Label from "@/libs/components/elements/Label";
import Column from "@/libs/components/layout/Column";
import RootContainer from "@/libs/components/layout/RootContainer";
import Row from "@/libs/components/layout/Row";
import Avatar from "@/libs/components/ui/Avatar";
import useThemeColor from "@/libs/hooks/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Switch } from "react-native-gesture-handler";

const ProfileScreen = () => {
  const [dnb, setDnb] = useState<boolean>(false);
  const { uid } = useLocalSearchParams();
  const { data: user } = useGetUserDataByUid(uid as string);
  const router = useRouter();
  const borderColor = useThemeColor("primaryAccentColor");
  const pressedBackgroundColor = useThemeColor("pressedBackground");

  return (
    <RootContainer backgroundColor="background">
      <Row padding={16} justify="space-between" align="center">
        <Label label="User Info" color="primaryText" size="md" weight="bold" />
        <Button
          label={<Icon name="close" color="primaryText" size={16} />}
          onPress={() => router.back()}
          variant="round"
        />
      </Row>
      <Column align="center" gap={15} padding={16}>
        <Avatar source={user?.profilePicture ?? ""} size="xl" />
        <Column centered>
          <Label label={user?.name} weight="bold" size="md" />
          <Label label={user?.signature} weight="normal" size="sm" />
        </Column>
      </Column>
      <Row align="center" justify="space-between" padding={16}>
        <Row align="center" gap={8}>
          <Label label="Do Not Disturb" weight="bold" size="sm" />
          <Icon name="notifications-off" color="primaryText" size={20} />
        </Row>
        <Switch
          trackColor={{
            true: borderColor,
            false: pressedBackgroundColor,
          }}
          thumbColor={useThemeColor("white")}
          value={dnb}
          onValueChange={setDnb}
        />
      </Row>
      <Column style={{ paddingHorizontal: 16, paddingBottom: 16 }} gap={10}>
        <Button
          label={
            <Row align="center" gap={8}>
              <Label label="Clear Chat" weight="bold" size="sm" />
              <Icon name="trash" color="primaryText" size={20} />
            </Row>
          }
          backgroundColor="warning"
        />
        <Button
          label={
            <Row align="center" gap={8}>
              <Label label="Report" weight="bold" size="sm" />
              <Icon name="warning" color="primaryText" size={20} />
            </Row>
          }
          backgroundColor="error"
        />
      </Column>
    </RootContainer>
  );
};

export default ProfileScreen;
