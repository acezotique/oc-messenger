import Label from "@/libs/components/elements/Label";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const AppLayout = () => {
  const { token, isLoading } = useUserSession();
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    ...Ionicons.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded && isLoading) {
    return <Label label="Loading..." size="lg" color="primaryAccentColor" />;
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(modal)" options={{ presentation: "modal" }} />
    </Stack>
  );
};

export default AppLayout;
