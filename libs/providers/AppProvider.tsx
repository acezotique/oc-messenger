import React, { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppProvider = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme();
  const client = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default AppProvider;
