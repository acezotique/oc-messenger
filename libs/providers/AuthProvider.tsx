import { createContext, PropsWithChildren, useContext } from "react";
import { useStorageState } from "../hooks/secureStore";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../hooks/firebase";

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  token: string | null;
  uid: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  signIn: async () => false,
  signOut: () => null,
  token: null,
  uid: null,
  isLoading: false,
});

export function useUserSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be used within an AuthProvider");
  }
  return value;
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [[isLoading, token], setToken] = useStorageState("token");
  const [[isUserLoading, uid], setUser] = useStorageState("uid");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (email: string, password: string) => {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          if (!user) {
            console.log("Login Failed.")
            return false;
          }
          const token = await user.getIdToken();
          if (!token) {
            console.log("Login Failed.")
            return false;
          }
          setToken(token);
          setUser(user.uid);
          return true;
        },
        signOut: () => {
          try {
            signOut(auth);
          } catch (error) {
            console.error("Sign out failed", error);
          }
          setToken(null);
          setUser(null);
          console.log("Signed out");
        },
        token,
        uid,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
