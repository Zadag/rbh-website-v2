import { useState, useEffect } from "react";
import { LobbyType } from "../../types/Lobby";
import axios from "axios";
import LobbyPlayers from "./LobbyPlayers";

import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;

const apiUrl = config.EXPRESS_URL;

type LobbyProps = {
  lobby: LobbyType | null;
  token: string | null;
  username: string | null;
};

export default function Lobby({ lobby, token, username }: LobbyProps) {
  const [lobbyInfo, setLobbyInfo] = useState<LobbyType | null>(lobby);

  useEffect(() => {
    setLobbyInfo(lobby);
  }, [lobby]);

  const joinLobby = async (lobbyId: number, username: string | null) => {
    try {
      const response = await axios.post(
        `${apiUrl}/join`,
        { accessToken: token, game: "League of Legends", lobbyId, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.lobby_id) setLobbyInfo(response.data); // only render if lobbies were returned
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
          accessToken: token,
          game: "League of Legends",
          username,
          user_ids,
          lobbyId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching lobby:", error);
    }
  };

  const dropFromLobby = async (lobbyId: number, username: string | null) => {
    try {
      const response = await axios.post(
        `${apiUrl}/drop`,
        { accessToken: token, game: "League of Legends", username, lobbyId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching lobby:", error);
    }
  };

  if (!lobbyInfo) return <p>Something went REALLY wrong</p>;
  return (
    // <>
    //   <div className="bg-amber-50 shadow-[0_0_15px_rgba(255,200,100,0.3),0_0_5px_rgba(255,200,100,0.1)] rounded-lg overflow-hidden my-4 w-80 mx-auto transform hover:scale-103 hover:shadow-[0_0_25px_rgba(255,200,100,0.5),0_0_8px_rgba(255,200,100,0.2)] transition-all duration-300 ease-in-out">
    //     <div className="bg-amber-800 text-amber-100 p-3 flex-col justify-between items-center">
    //       <h2 className="text-xl font-bold truncate">{lobbyInfo.lobby_name}</h2>
    //       <p className="text-xs opacity-75">Host: {lobbyInfo.host_id}</p>
    //     </div>
    //     <div className="p-3">
    //       <div className="flex justify-between items-center mb-2">
    //         <h3 className="text-sm font-semibold text-amber-900">Players:</h3>
    //         <span className="text-xs font-extrabold font-serif text-amber-700">
    //           {lobbyInfo.Users.length} / 10
    //         </span>
    //       </div>
    //       <ul className="space-y-1 mb-3 max-h-24 overflow-y-auto">
    //         {lobbyInfo.Users.map((user) => (
    //           <li
    //             key={user.user_id}
    //             className="bg-amber-100 px-2 py-1 rounded text-xs text-amber-800"
    //           >
    //             {user.summoner_name}
    //           </li>
    //         ))}
    //       </ul>
    //       <div className="flex justify-between">
    //         <button
    //           onClick={() => joinLobby(lobbyInfo.lobby_id, username)}
    //           className="bg-green-600 hover:bg-green-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
    //         >
    //           Join
    //         </button>
    //         <button
    //           onClick={() => dropFromLobby(lobbyInfo.lobby_id, username)}
    //           className="bg-red-600 hover:bg-red-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
    //         >
    //           Drop
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <div className="bg-amber-50 shadow-[0_0_15px_rgba(255,200,100,0.3),0_0_5px_rgba(255,200,100,0.1)] rounded-lg overflow-hidden my-4 w-80 mx-auto transform hover:scale-103 hover:shadow-[0_0_25px_rgba(255,200,100,0.5),0_0_8px_rgba(255,200,100,0.2)] transition-all duration-300 ease-in-out">
      <div className="bg-amber-800 text-amber-100 p-3 flex-col justify-between items-center">
        <h2 className="text-xl font-bold truncate">{lobbyInfo.lobby_name}</h2>
        <p className="text-xs opacity-75">Host: {lobbyInfo.host_id}</p>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold text-amber-900">Players:</h3>
          <span className="text-xs font-extrabold font-serif text-amber-700">
            {lobbyInfo.Users.length} / 10
          </span>
        </div>
        <LobbyPlayers
          lobbyInfo={lobbyInfo}
          onDropSelected={handleDropSelected}
        />
        <div className="flex justify-between mt-3">
          <button
            onClick={() => joinLobby(lobbyInfo.lobby_id, username)}
            className="bg-green-600 hover:bg-green-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
          >
            Join
          </button>
          <button
            onClick={() => dropFromLobby(lobbyInfo.lobby_id, username)}
            className="bg-red-600 hover:bg-red-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
          >
            Drop
          </button>
        </div>
      </div>
    </div>
  );
}
