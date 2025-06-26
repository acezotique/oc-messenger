import AppProvider from "@/libs/providers/AppProvider";
import { Slot } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
};

export default RootLayout;
