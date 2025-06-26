import React, { useLayoutEffect, useState } from "react";
import RootContainer from "@/libs/components/layout/RootContainer";
import Button from "@/libs/components/elements/Button";
import { useUserSession } from "@/libs/providers/AuthProvider";
import Avatar from "@/libs/components/ui/Avatar";
import Column from "@/libs/components/layout/Column";
import Label from "@/libs/components/elements/Label";
import { db } from "@/libs/hooks/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { z } from "zod";
import { useRouter } from "expo-router";
import Row from "@/libs/components/layout/Row";

const profileSchema = z.object({
  name: z.string(),
  signature: z.string(),
  profilePicture: z.string().optional().nullable(),
});

type ProfileFormType = z.infer<typeof profileSchema>;

const ProfileScreen = () => {
  const [user, setUser] = useState<ProfileFormType>();
  const { signOut, uid } = useUserSession();
  const router = useRouter();

  const retrieveUserData = () => {
    const docRef = doc(db, "user", uid!);
    return onSnapshot(docRef, (doc) => {
      setUser(doc.data() as { name: string; signature: string });
    });
  };

  useLayoutEffect(() => {
    const unsub = retrieveUserData();
    return () => unsub();
  }, []);

  return (
    <RootContainer backgroundColor="background" disableBottomSafeArea>
      <Column gap={15} flex padding={16} paddingOrientation="horizontal">
        <Row>
          <Label label="Profile" weight="bold" size="lg" color="primaryText" />
        </Row>
        <Column gap={10} centered>
          <Avatar size="xl" source={user?.profilePicture as string} />
          <Label
            label={user?.name}
            weight="bold"
            size="lg"
            color="primaryAccentColor"
          />
          <Label
            label={user?.signature}
            weight="bold"
            size="sm"
            color="primaryText"
          />
        </Column>
        <Button
          label="Edit Profile"
          onPress={() =>
            router.push({
              pathname: "/edit-profile",
              params: {
                name: user?.name,
                signature: user?.signature,
                profilePicture: user?.profilePicture,
              },
            })
          }
        />
        <Button label="Sign Out" onPress={signOut} />
      </Column>
    </RootContainer>
  );
};

export default ProfileScreen;
