import React, { useState } from "react";
import { LobbyType } from "../../types/Lobby";

type LobbyPlayerProps = {
  lobbyInfo: LobbyType;
  onDropSelected: Function;
};

const LobbyPlayers = ({ lobbyInfo, onDropSelected }: LobbyPlayerProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleDropSelected = () => {
    onDropSelected(lobbyInfo.lobby_id, selectedUsers);
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-2">
      <ul className="space-y-1 mb-3 max-h-36 overflow-y-auto">
        {lobbyInfo.Users.map((user) => (
          <li
            key={user.user_id}
            className="bg-amber-100 px-2 py-1 rounded text-xs text-amber-800 flex justify-between items-center"
          >
            <span>{user.summoner_name}</span>
            <button
              onClick={() => toggleUserSelection(user.user_id)}
              className={`p-1 mr-2 rounded-full transition-colors ${
                selectedUsers.includes(user.user_id)
                  ? "bg-amber-500 text-white"
                  : "bg-amber-200 text-amber-800 hover:bg-amber-300"
              }`}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {selectedUsers.length > 0 && (
        <button
          onClick={handleDropSelected}
          className="w-full bg-red-600 hover:bg-red-700 text-amber-100 font-bold py-1 px-3 rounded text-sm transition duration-300 shadow-md hover:shadow-lg"
        >
          Drop Selected ({selectedUsers.length})
        </button>
      )}
    </div>
  );
};

export default LobbyPlayers;
