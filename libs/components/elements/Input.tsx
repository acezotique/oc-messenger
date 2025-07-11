import useThemeColor from "@/libs/hooks/theme";
import { StyleProp, TextInput, TextStyle } from "react-native";

type InputNumberType = {
  value?: number;
};

type InputTextType = {
  value?: string;
};

type InputProps = {
  type?: "text" | "password" | "email" | "number";
  onChange: (e: { nativeEvent: { text: string } }) => void;
  onBlur?: () => void;
  placeholder?: string;
  multiline?: boolean;
  size?: "small" | "medium" | "large";
  error?: string;
  style?: StyleProp<TextStyle>;
} & (InputNumberType | InputTextType);

const Input = (props: InputProps) => renderInput(props);

function renderInput({
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  multiline,
  error,
  style,
}: InputProps) {
  const color = useThemeColor("light");

  if (type === "number") {
    return (
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={color["primaryText"]}
        keyboardType="numeric"
        value={value?.toString()}
        onChange={onChange}
        style={[
          {
            borderWidth: 2,
            borderRadius: 4,
            borderColor: error ? color["error"] : color["primaryAccentColor"],
            backgroundColor: color["background"],
            color: color["primaryText"],
            padding: 8,
          },
          style,
        ]}
      />
    );
  } else {
    return (
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={color["primaryText"]}
        secureTextEntry={type === "password"}
        keyboardType={type === "email" ? "email-address" : "default"}
        value={value?.toString()}
        onChange={onChange}
        onBlur={onBlur}
        multiline={multiline}
        style={{
          borderWidth: 2,
          borderRadius: 4,
          borderColor: error ? color["error"] : color["primaryAccentColor"],
          backgroundColor: color["background"],
          color: color["primaryText"],
          padding: 8,
        }}
      />
    );
  }
}

export default Input;
