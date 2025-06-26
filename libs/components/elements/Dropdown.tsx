import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import Label from "./Label";
import useThemeColor from "@/libs/hooks/theme";
import { Pressable } from "react-native-gesture-handler";

type DropdownProps<T extends object> = {
  data: T[];
  idKey: keyof T;
  labelKey: keyof T;
  placeholder?: string;
  value?: string | number | null;
  onChange: (value: string | number | null) => void;
  onBlur?: () => void;
  error?: string;
};

const Dropdown = <T extends object>({
  data,
  idKey,
  labelKey,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: DropdownProps<T>) => {
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const dropdownPlaceholder = placeholder || "Select an option";

  const dropdownData = useMemo(() => {
    return [{ [idKey]: null, [labelKey]: dropdownPlaceholder }, ...data] as T[];
  }, [data, idKey, labelKey]);

  const handleSelect = (item: T) => {
    onChange(item[idKey] as string | number);
    setDropdownVisible(false);
  };

  const color = useThemeColor();

  return (
    <View>
      <Pressable
        style={({ pressed }) => ({
          padding: 8,
          backgroundColor: pressed
            ? color["pressedBackground"]
            : color["searchBarBackground"],
          borderRadius: 8,
          borderColor: error ? color["error"] : color["primaryAccentColor"],
          borderWidth: 2,
          alignItems: "center",
        })}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <Label
          label={value ? (value as string) : dropdownPlaceholder}
          color="primaryText"
          size="sm"
        />
      </Pressable>
      {isDropdownVisible && (
        <FlatList
          data={dropdownData}
          keyExtractor={(item) => String(item[idKey])}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => ({
                padding: 8,
                backgroundColor: pressed ? "#fff" : undefined,
                borderColor: color["primaryAccentColor"],
                borderRadius: 5,
                elevation: 3,
                shadowColor: "#000000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
              })}
              onPress={() => handleSelect(item)}
            >
              <Label
                label={item[labelKey] as string}
                color="primaryText"
                size="sm"
              />
            </Pressable>
          )}
          style={{
            marginTop: 8,
            backgroundColor: color["searchBarBackground"],
            borderRadius: 8,
            borderColor: color["primaryAccentColor"],
            borderWidth: 2,
            zIndex: 100,
          }}
        />
      )}
    </View>
  );
};

export default Dropdown;
