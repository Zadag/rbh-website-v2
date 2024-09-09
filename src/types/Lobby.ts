import { UserInLobby } from "./User";

export type LobbyType = {
  lobby_id: number;
  season_id: number;
  season_lobby_id: number;
  lobby_name: string;
  closed_date: string | null;
  host_id: string;
  draft_id: string | number | null; // verify string or number
  match_id: string | number | null; //verify string or number
  game_id: number;
  message_id: string;
  thread_id: string | number | null; //verify string or number
  game_mode_id: number;
  region_id: string;
  created_at: Date;
  updated_at: Date;
  Users: UserInLobby[];
  Game: {
    game_id: 1;
    name: "League of Legends";
    icon_url: null;
    emote: null;
    enabled: boolean;
    created_at: Date | string;
    updated_at: Date | string;
  };
};
