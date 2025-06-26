import React, { useState } from "react";
import RootContainer from "@/libs/components/layout/RootContainer";
import Column from "@/libs/components/layout/Column";
import Header from "@/page-components/HomeScreen/Header";
import ChatList from "@/page-components/HomeScreen/ChatList";
import SearchBar from "@/libs/components/elements/SearchBar";

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <RootContainer backgroundColor="background">
      <Column justify="space-between" flex>
        <Header />
        <Column flex gap={15}>
          <Column padding={16} paddingOrientation="horizontal">
            <SearchBar onChange={setSearchQuery} placeholder="Search Chat" />
          </Column>
          <ChatList keyword={searchQuery} />
        </Column>
      </Column>
    </RootContainer>
  );
};

export default HomeScreen;
