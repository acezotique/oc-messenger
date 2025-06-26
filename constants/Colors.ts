export type ColorType = {
  background: string;
  primaryText: string;
  secondaryText: string;
  userMessageBubble: string;
  otherMessageBubble: string;
  primaryAccentColor: string;
  error: string;
  white: string
  transparent?: string;
  searchBarBackground?: string;
  pressedBackground?: string;
  warning?: string
};

const light: ColorType = {
  background: "#ffffff",
  primaryText: "#000000",
  secondaryText: "#999999",
  userMessageBubble: "#dcf8c6",
  otherMessageBubble: "#f1f1f1",
  primaryAccentColor: "#3483fa",
  white: "#ffffff",
  error: "#ff0000",
  searchBarBackground: "#bbbbbb",
  pressedBackground: "#f1f1f1",
  warning: "#e6b800"
};

const dark: ColorType = {
  background: "#121212",
  primaryText: "#ffffff",
  secondaryText: "#bbbbbb",
  userMessageBubble: "#3a3a3a",
  otherMessageBubble: "#2a2a2a",
  primaryAccentColor: "#3483fa",
  white: "#ffffff",
  error: "#ff0000",
  searchBarBackground: "#999999",
  pressedBackground: "#f1f1f1",
  warning: "#e6b800"
};

export type ColorKeys = keyof ColorType;

export default {
  light,
  dark,
};
