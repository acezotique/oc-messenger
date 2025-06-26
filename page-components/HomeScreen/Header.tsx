import React from "react";
import Row from "@/libs/components/layout/Row";
import Label from "@/libs/components/elements/Label";
import Column from "@/libs/components/layout/Column";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();
  return (
    <Column>
      <Row
        style={{ paddingHorizontal: 16, paddingBottom: 16 }}
        justify="space-between"
        align="center"
      >
        <Label label="Messages" weight="bold" size="lg" />
        <Button
          label={<Icon name="add" size={24} color="white" />}
          variant="round"
          onPress={() => router.push("/create-chat")}
        />
      </Row>
    </Column>
  );
};

export default Header;
