export type UserInLobby = {
  user_id: string;
  summoner_name: string | null;
  tag_line: string | null;
  verified: boolean;
  puuid: string;
  server_experience: number;
  server_level: number;
  server_money: number;
  join_date: Date | string;
  last_daily_vote: string | Date | number | null; //could be better
  vote_streak: number;
  last_vote_date: string | Date | number | null; //could be better
  last_message_date: Date | string | null;
  region_id: string;
  primary_role: string;
  secondary_role: string;
  created_at: Date;
  updated_at: Date;
  created_by: string | null;
  LobbyUsers: {
    created_at: Date | string;
    updated_at: Date | string;
    UserUserId: string;
    LobbyLobbyId: number;
  };
};
