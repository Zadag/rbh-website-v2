"use client";
import { LobbyType } from "@/types/Lobby";
import Lobby from "../components/Lobby";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
import { useUser } from "../hooks/UserContext";
import canHost from "../utils/canHost";

const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;
const apiUrl = config.EXPRESS_URL;

export default function Inhouses() {
  // const { data: session, status } = useSession();
  // const [token, setToken] = useState<string | null>(null);
  const [lobbyInfo, setLobbyInfo] = useState<LobbyType[] | null>(null);
  // const [username, setUsername] = useState<string | null>(null);
  const userCtx = useUser();
  if (userCtx === undefined) {
    throw new Error("User Context can only be used in a User Provider tree");
  }
  const { user, loading, session } = userCtx;

  const hostLobby = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/host`,
        { accessToken: session?.accessToken, game: "League of Legends" },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      setLobbyInfo(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

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

  const canUserHost = canHost(user?.roles ?? {});

  if (!session)
    return (
      <p className="text-slate-100 mx-auto my-40 font-bold text-2xl">
        Log in with discord to access inhouses
      </p>
    );

  return (
    <>
      <div className="flex-col justify-center mx-auto">
        {canUserHost ? (
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
              return <Lobby key={lobby.lobby_id} lobby={lobbyInfo[index]} />;
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
