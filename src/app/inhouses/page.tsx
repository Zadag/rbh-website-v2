"use client";
import { LobbyType } from "@/types/Lobby";
import Lobby from "../components/Lobby";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";

const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;
const apiUrl = config.EXPRESS_URL;

export default function Inhouses() {
  const { data: session, status, update } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [lobbyInfo, setLobbyInfo] = useState<LobbyType[] | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const hostLobby = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/host`,
        { accessToken: token, game: "League of Legends", username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLobbyInfo(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session.accessToken) {
      console.log("Full Session Object:", JSON.stringify(session, null, 2));

      const token = session.accessToken;
      setToken(token);
      let username;
      if (session.user?.name && session.user.name !== username) {
        username = session.user.name;
        setUsername(username);
        update();
      }
    }
  }, [session, status, username]);

  useEffect(() => {
    const eventSource = new EventSource(`${apiUrl}/lobbyEvent`);

    eventSource.onmessage = (event) => {
      const lobbies: LobbyType[] = JSON.parse(event.data);
      console.log("Received updated lobbies:", lobbies);
      setLobbyInfo(
        lobbies.map((lobby) => ({
          ...lobby,
          Users: [...lobby.Users],
        }))
      );
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <div className="flex  min-h-full flex-1 flex-col pt-12 px-6 py-12 lg:px-8 bg-gradient-to-t from-red-950 to-black">
        <div className="flex-col justify-center mx-auto">
          {username ? (
            <button
              className="bg-green-600 hover:bg-green-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
              onClick={hostLobby}
            >
              Host
            </button>
          ) : null}
          <div className="flex flex-row flex-wrap gap-10">
            {lobbyInfo ? (
              lobbyInfo.map((lobby, index) => {
                return (
                  <Lobby
                    key={lobby.lobby_id}
                    lobby={lobbyInfo[index]}
                    token={token}
                    username={username}
                  />
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
