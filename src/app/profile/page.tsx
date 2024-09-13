"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ProfileInfoCard from "../components/ProfileInfoCard";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState<any | null>(null);
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [lobbyInfo, setLobbyInfo] = useState<string | null>(null);

  const apiUrl = config!.EXPRESS_URL;
  console.log(apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session.accessToken) {
        console.log("Full Session Object:", JSON.stringify(session, null, 2));

        const token = session.accessToken;
        setToken(token);
        let username;
        if (session.user) {
          username = session.user.name!;
          setUsername(username);
        }

        try {
          console.log(username);
          const response = await axios.post(
            `${apiUrl}/profile`,
            { accessToken: token, username },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfileInfo(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfileInfo("Error fetching profile");
        }
      }
    };

    fetchData();
  }, [session, status]);

  const getLobbyById = async (lobbyId: number, username: string | null) => {
    try {
      const response = await axios.post(
        `${apiUrl}/lobby`,
        { game: "League of Legends", lobbyId, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //setLobbyInfo(JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching lobby", error);
      setLobbyInfo("Error fetching lobby");
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Access Denied</p>;

  return (
    <>{profileInfo ? <ProfileInfoCard profileInfo={profileInfo} /> : null}</>
  );
}
