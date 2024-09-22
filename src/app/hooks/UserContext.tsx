"use client"
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { UserAndRoles } from "@/types/User";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
import { Session } from "next-auth";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;
const apiUrl = config!.EXPRESS_URL;

type UserContextType = {
  user: UserAndRoles | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  session: Session | null;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserAndRoles | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (status === "authenticated" && session?.accessToken) {
      fetchBackendUserData(session.accessToken, session.user!.name!);
    } else if (status !== "loading") {
      setLoading(false);
    }
  }, [session, status]);

  const fetchBackendUserData = async (
    accessToken: string,
    username: string
  ) => {
    try {
      const response = await axios.post(
        `${apiUrl}/profile`,
        { accessToken, username },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response) {
        setUser(response.data);
      } else {
        console.error("Failed to validate user with backend");
      }
    } catch (error) {
      console.error("Error fetching user data from backend:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = () => signIn("discord");
  const logout = () => {
    signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, session }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
