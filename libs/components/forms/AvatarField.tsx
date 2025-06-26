import React, { useState } from "react";
import { Control, Controller, Path } from "react-hook-form";
import Column from "../layout/Column";
import Avatar from "../ui/Avatar";
import Button from "../elements/Button";
import * as ImagePicker from "expo-image-picker";

type AvatarFieldProps<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
};

const AvatarField = <T extends object>({
  control,
  name,
  label,
  size,
}: AvatarFieldProps<T>) => {
  const pickImage = async (onChange: (uri: string) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      onChange(result.assets[0].uri);
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <Column gap={10} centered>
          <Avatar source={value} size={size} />
          <Button
            label={label ?? "Change"}
            onPress={() => pickImage(onChange)}
          />
        </Column>
      )}
    />
  );
};

export default AvatarField;
