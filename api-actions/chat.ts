import { auth, db } from "@/libs/hooks/firebase";
import { ChatType } from "@/types/chat";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";

export const useRetrieveChatData = () => {
  return useQuery({
    queryKey: ["chat"],
    queryFn: () => {
      const q = query(collection(db, "chat"), orderBy("createdAt", "desc"));
      return onSnapshot(q, (querySnapshot) =>
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    },
  });
};

export const useGetChatById = (chatId: string) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      try {
        const docRef = doc(db, "chat", chatId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          console.error("No such document!");
          return null;
        }

        return docSnap.data() as ChatType;
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
    },
  });
};

export const useUpdateUnreadMessages = () => {
  return useMutation({
    mutationFn: async (payload: { chatId: string; uid: string }) => {
      const dataKey = `unread.${payload.uid}`;
      const docRef = doc(db, "chat", payload.chatId);
      return await updateDoc(docRef, { [dataKey]: 0 });
    },
  });
};

export const useCreateChat = () => {
  return useMutation({
    mutationFn: async (
      payload: Pick<
        ChatType,
        "name" | "members" | "isGroup" | "avatar" | "admin"
      >
    ) => {
      try {
        const authUser = auth.currentUser;

        if (!payload.isGroup) {
          const checkExistingQuery = query(collection(db, "chat"));
          const ceqSnapshot = await getDocs(checkExistingQuery);
          const existingChats = ceqSnapshot.docs.map((doc) =>
            doc.data()
          ) as ChatType[];
          existingChats.map((chat) => console.log(chat.members.length));
          if (
            existingChats.filter(
              (chat) =>
                chat.members.length === 2 &&
                chat.members.includes(payload.members[0]) &&
                chat.members.includes(payload.members[1])
            ).length > 0
          ) {
            throw new Error("Chat already exists");
          }
        }

        const getUsersQuery = query(
          collection(db, "user"),
          where(documentId(), "in", payload.members)
        );
        const usersSnapshot = await getDocs(getUsersQuery);
        const users = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(),
        })) as User[];

        const personalSystemMessage = `${
          users.find((user) => user.uid === authUser?.uid)?.name
        } started the conversation.`;

        const groupSystemMessage = `${
          users.find((user) => user.uid === authUser?.uid)?.name
        } created the group.`;

        const data = {
          ...payload,
          lastSender: "System",
          lastMessage: payload.isGroup
            ? groupSystemMessage
            : personalSystemMessage,
          users: users,
          unread: payload.members.map((member) => ({ [member]: 1 })),
          pinned: [],
          createdAt: moment().toString(),
        };

        const { id } = await addDoc(collection(db, "chat"), data);

        return await addDoc(collection(db, "chat", id, "messages"), {
          uid: "system",
          message: groupSystemMessage,
          createdAt: moment().toString(),
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onError: (error) => console.error(error),
  });
};

export const usePinChat = () => {
  return useMutation({
    mutationFn: async (payload: {
      uid: string;
      chatId: string;
      pinned: string[];
    }) => {
      return await updateDoc(doc(db, "chat", payload.chatId), {
        pinned: payload.pinned.includes(payload.uid)
          ? payload.pinned.filter((uid) => uid !== payload.uid)
          : [...payload.pinned, payload.uid],
      });
    },
  });
};

export const useDeleteChat = () => {
  return useMutation({
    mutationFn: async (payload: {
      chatId: string;
      uid: string;
      members: string[];
      users: User[];
    }) => {
      const docRef = doc(db, "chat", payload.chatId);
      if (payload.members.length > 1) {
        const filteredMembers = payload.members.filter(
          (member) => member !== payload.uid
        );

        const systemMessage = `${
          payload.users.find((user) => user.uid === payload.uid)?.name
        } deleted the chat. Please also delete this chat.`;

        await updateDoc(docRef, {
          members: filteredMembers,
          lastMessage: systemMessage,
          lastSender: "System",
        });

        return await addDoc(
          collection(db, "chat", payload.chatId, "messages"),
          {
            uid: "system",
            message: systemMessage,
            createdAt: moment().toString(),
          }
        );
      } else {
        return await deleteDoc(docRef);
      }
    },
  });
};

export const useDeleteMessage = () => {
  return useMutation({
    mutationFn: async (payload: { chatId: string; messageId: string }) => {
      const docRef = doc(
        db,
        "chat",
        payload.chatId,
        "messages",
        payload.messageId
      );
      return await deleteDoc(docRef);
    },
  });
};
