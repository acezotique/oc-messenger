import React, { useEffect, useMemo, useState } from "react";
import Icon from "./Icon";
import Row from "../layout/Row";
import { TextInput } from "react-native";
import useThemeColor from "@/libs/hooks/theme";
import debounce from "lodash.debounce";
import { Pressable } from "react-native-gesture-handler";

type SearchBarProps = {
  onChange: (query: string) => void;
  placeholder?: string;
  showButton?: boolean;
};

const SearchBar = ({ onChange, placeholder, showButton }: SearchBarProps) => {
  const [value, setValue] = useState("");
  const color = useThemeColor();

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        onChange(query);
      }, 500),
    []
  );

  const handleOnChange = (query: string) => {
    setValue(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  return (
    <Row
      backgroundColor="searchBarBackground"
      width="100%"
      justify="center"
      align="center"
      padding={1}
      style={{
        borderRadius: 8,
      }}
    >
      <TextInput
        value={value}
        onChange={(e) =>
          showButton
            ? setValue(e.nativeEvent.text)
            : handleOnChange(e.nativeEvent.text)
        }
        placeholder={placeholder}
        placeholderTextColor={color["primaryText"]}
        style={{
          flex: 1,
          padding: 8,
          fontSize: 16,
          color: color["primaryText"],
        }}
      />
      {showButton && (
        <Pressable
          onPress={() => onChange(value)}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            paddingRight: 8,
          })}
        >
          <Icon name="search" size={24} color="secondaryText" />
        </Pressable>
      )}
    </Row>
  );
};

export default SearchBar;
