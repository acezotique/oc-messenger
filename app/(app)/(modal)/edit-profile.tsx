import { StyleSheet } from "react-native";
import React from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RootContainer from "@/libs/components/layout/RootContainer";
import Row from "@/libs/components/layout/Row";
import Label from "@/libs/components/elements/Label";
import Button from "@/libs/components/elements/Button";
import Icon from "@/libs/components/elements/Icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import AvatarField from "@/libs/components/forms/AvatarField";
import FormField from "@/libs/components/forms/FormField";
import Input from "@/libs/components/elements/Input";
import Column from "@/libs/components/layout/Column";
import { useUpdateUserProfile } from "@/api-actions/user";

const EditProfileSchema = z.object({
  name: z.string(),
  signature: z.string(),
  profilePicture: z.string().optional().nullable(),
});

type EditProfileFormType = z.infer<typeof EditProfileSchema>;

const EditProfileModal = () => {
  const { name, signature, profilePicture } = useLocalSearchParams();
  const router = useRouter();
  const { mutate: updateProfile } = useUpdateUserProfile();
  const { control, handleSubmit } = useForm<EditProfileFormType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      name: name as string,
      signature: signature as string,
      profilePicture: profilePicture as string,
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormType> = async (payload) => {
    updateProfile(payload, {
      onSuccess: () => router.back(),
    });
  };

  return (
    <RootContainer backgroundColor="background">
      <Row justify="space-between" padding={16}>
        <Label
          label="Edit Profile"
          weight="bold"
          size="lg"
          color="primaryText"
        />
        <Button
          label={<Icon name="close" color="primaryText" size={16} />}
          onPress={() => router.back()}
          variant="round"
        />
      </Row>
      <Row centered>
        <AvatarField
          control={control}
          name="profilePicture"
          label="Change Profile Picture"
          size="xl"
        />
      </Row>
      <Column style={style.formfield}>
        <FormField
          control={control}
          name="name"
          label="Name"
          renderField={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value as string}
              onChange={(e) => onChange(e.nativeEvent.text)}
              onBlur={onBlur}
            />
          )}
        />
      </Column>
      <Column style={style.formfield}>
        <FormField
          control={control}
          name="signature"
          label="Signature"
          renderField={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value as string}
              onChange={(e) => onChange(e.nativeEvent.text)}
              onBlur={onBlur}
            />
          )}
        />
      </Column>
      <Column style={style.formfield}>
        <Button label="Save" onPress={handleSubmit(onSubmit)} />
      </Column>
    </RootContainer>
  );
};

export default EditProfileModal;

const style = StyleSheet.create({
  formfield: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
