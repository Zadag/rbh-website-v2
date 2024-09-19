export type UserInLobby = User & {
  LobbyUsers: {
    created_at: string;
    updated_at: string;
    UserUserId: string;
    LobbyLobbyId: number;
  };
};

export type User = {
  created_at: string | null;
  created_by: string | null;
  join_date: string | null;
  last_daily_date: string | null;
  last_message_data: string | null;
  last_voet_date: string | null;
  primary_role: string | null;
  secondary_role: string | null;
  puuid: string | null;
  region_id: string | null;
  server_experience: number | null;
  server_level: number | null;
  server_money: number | null;
  summoner_name: string | null;
  tag_line: string | null;
  updated_at: string | null;
  user_id: string;
  verified: boolean;
  vote_streak: number | null;
};

export type UserAndRoles = User & {
  roles: any;
  permissions: {
    owner: string;
    knave: string;
    developer: string;
    admin: string;
    moderator: string;
    trainee: string;
    verified: string;
    muted: string;
    unverified: string;
    guest: string;
    lobby_participant: string;
  };
};
