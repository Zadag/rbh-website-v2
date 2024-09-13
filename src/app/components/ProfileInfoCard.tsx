import React from "react";

interface User {
  user_id: string;
  summoner_name: string;
  tag_line: string;
  verified: boolean;
  puuid: string;
  server_experience: number;
  server_level: number;
  server_money: number;
  join_date: string;
  last_daily_date: string | null;
  vote_streak: number;
  last_vote_date: string | null;
  last_message_date: string | null;
  region_id: string;
  primary_role: string;
  secondary_role: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface RolesAndPerms {
  roles: Record<string, string>;
  permissions: Record<string, string>;
}

interface ProfileInfo {
  user: User;
  rolesAndPerms: RolesAndPerms;
  eloRating: any;
}

interface ProfileInfoCardProps {
  profileInfo: ProfileInfo;
}

interface InfoItemProps {
  icon: string;
  label: string;
  value: string | number;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ profileInfo }) => {
  const { user, rolesAndPerms } = profileInfo;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log(user, rolesAndPerms);

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-red-300">
      <div className="bg-red-900 text-white p-4">
        <h2 className="text-2xl font-bold flex items-center">
          <span className="mr-2">👤</span>
          {user.summoner_name}
          {user.verified ? (
            <span className="ml-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Verified
            </span>
          ) : (
            <>
              <span className="ml-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Unverified
              </span>
              <button className="bg-green-700 px-2 ml-2 rounded-md hover:bg-green-800">
                Click here to verify
              </button>
            </>
          )}
        </h2>
        <p className="text-red-300">#{user.tag_line}</p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <InfoItem
            icon="📅"
            label="Joined"
            value={formatDate(user.join_date)}
          />
          <InfoItem
            icon="🎮"
            label="Server Level"
            value={user.server_level.toString()}
          />
          <InfoItem icon="📍" label="Region" value={user.region_id} />
          <InfoItem icon="⚔️" label="Primary Role" value={user.primary_role} />
          <InfoItem
            icon="🎯"
            label="Secondary Role"
            value={user.secondary_role}
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-red-300">Roles</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(rolesAndPerms.roles).map(([role, id]) => (
              <span
                key={id}
                className="bg-red-900 text-white px-2 py-1 rounded-full text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center">
    <span className="text-xl mr-2" role="img" aria-label={label}>
      {icon}
    </span>
    <div>
      <p className="text-sm text-red-400">{label}</p>
      <p className="font-medium text-white">{value}</p>
    </div>
  </div>
);

export default ProfileInfoCard;
