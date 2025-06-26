import { User } from "./user";

export type ChatType = {
  id: string;
  name: string;
  lastSender: string;
  lastMessage: string;
  members: string[];
  pinned: string[];
  users: User[];
  unread: { [key: string]: number };
  createdAt: string;
  avatar?: string;
  isGroup: boolean;
  admin?: string;
  announcement?: string;
};

export type MessageType = {
  id: string;
  uid: string;
  name: string;
  message: string;
  avatar?: string | null;
  createdAt: string;
};
