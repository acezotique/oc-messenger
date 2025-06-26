import { ColorKeys } from "@/constants/Colors";
import Icon from "@/libs/components/elements/Icon";
import Label from "@/libs/components/elements/Label";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "primaryAccentColor",
        tabBarInactiveTintColor: "searchBarBackground",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbox" size={size} color={color as ColorKeys} />
          ),
          tabBarLabel: ({ focused }) => (
            <Label
              label="Chats"
              size="xsm"
              weight={focused ? "bold" : "normal"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color as ColorKeys} />
          ),
          tabBarLabel: ({ focused }) => (
            <Label
              label="Profile"
              size="xsm"
              weight={focused ? "bold" : "normal"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
