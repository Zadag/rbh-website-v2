import { LobbyType } from "../../types/Lobby";
import axios from "axios";
import LobbyPlayers from "./LobbyPlayers";

import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
import { useUser } from "../hooks/UserContext";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;

const apiUrl = config.EXPRESS_URL;

type LobbyProps = {
  lobby: LobbyType | null;
};

export default function Lobby({ lobby }: LobbyProps) {
  const userCtx = useUser();
  if (userCtx === undefined) {
    throw new Error("User Context can only be used in a User Provider tree");
  }
  const { user, loading, session } = userCtx;

  const joinLobby = async (lobbyId: number) => {
    try {
      const response = await axios.post(
        `${apiUrl}/join`,
        {
          accessToken: session?.accessToken,
          game: "League of Legends",
          lobbyId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching lobby:", error);
    }
  };

  const handleDropSelected = async (lobbyId: number, user_ids: string) => {
    console.log("hi", user_ids);
    const formattedUserIds = user_ids.toString();
    try {
      const response = await axios.post(
        `${apiUrl}/drop`,
        {
          accessToken: session?.accessToken,
          game: "League of Legends",
          user_ids,
          lobbyId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching lobby:", error);
    }
  };

  const dropFromLobby = async (lobbyId: number) => {
    try {
      const response = await axios.post(
        `${apiUrl}/drop`,
        {
          accessToken: session?.accessToken,
          game: "League of Legends",
          lobbyId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching lobby:", error);
    }
  };

  if (!lobby) return <p>Something went REALLY wrong</p>;
  return (
    <div className="bg-amber-50 shadow-[0_0_15px_rgba(255,200,100,0.3),0_0_5px_rgba(255,200,100,0.1)] rounded-lg overflow-hidden my-4 w-80 mx-auto transform hover:scale-103 hover:shadow-[0_0_25px_rgba(255,200,100,0.5),0_0_8px_rgba(255,200,100,0.2)] transition-all duration-300 ease-in-out">
      <div className="bg-amber-800 text-amber-100 p-3 flex-col justify-between items-center">
        <h2 className="text-xl font-bold truncate">{lobby.lobby_name}</h2>
        <p className="text-xs opacity-75">Host: {lobby.host_name}</p>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-amber-900">Players:</h3>
          <span className="text-xs font-extrabold font-serif text-amber-700">
            {lobby.Users.length} / 10
          </span>
        </div>
        <LobbyPlayers lobbyInfo={lobby} onDropSelected={handleDropSelected} />
        <div className="flex justify-between mt-3">
          <button
            onClick={() => joinLobby(lobby.lobby_id)}
            className="bg-green-600 hover:bg-green-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
          >
            Join
          </button>
          <button
            onClick={() => dropFromLobby(lobby.lobby_id)}
            className="bg-red-600 hover:bg-red-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
          >
            Drop
          </button>
        </div>
      </div>
    </div>
  );
}
