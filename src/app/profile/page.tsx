"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;

export default function Profile() {
  const [profileInfo, setProfileInfo] = useState<string | null>(null);
  const { data: session, status } = useSession();

  const apiUrl = config!.EXPRESS_URL;
  console.log(apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session.accessToken) {
        console.log("Full Session Object:", JSON.stringify(session, null, 2));

        const token = session.accessToken;
        let username;
        if (session.user) {
          username = session.user.name;
        }

        try {
          const response = await axios.post(
            `${apiUrl}/profile`,
            { accessToken: token, username },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfileInfo(JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfileInfo("Error fetching profile");
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Access Denied</p>;

  return <p>{profileInfo || "No profile info available"}</p>;
}
