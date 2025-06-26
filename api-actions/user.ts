import { auth, db } from "@/libs/hooks/firebase";
import { useUserSession } from "@/libs/providers/AuthProvider";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const useGetAllUsers = (uid: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const usersRef = query(
        collection(db, "user"),
        where(documentId(), "!=", uid)
      );
      const usersSnapshot = await getDocs(usersRef);
      return usersSnapshot.docs.map((doc) => {
        return {
          uid: doc.id,
          ...doc.data(),
        };
      }) as User[];
    },
  });
};

export const useGetUserDataByUid = (uid: string) => {
  return useQuery({
    queryKey: ["user", uid],
    queryFn: async () => {
      try {
        const docRef = doc(db, "user", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          return docSnap.data() as User;
        } else {
          console.error("No such document!");
          return null;
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        return null;
      }
    },
    enabled: !!uid,
  });
};

export const useUpdateUserProfile = () => {
  const { uid } = useUserSession();
  return useMutation({
    mutationFn: async (payload: Omit<User, "uid">) => {
      await updateProfile(auth.currentUser!, {
        displayName: payload.name,
        photoURL: payload.profilePicture,
      });

      return await setDoc(doc(db, "user", uid!), payload);
    },
  });
};
