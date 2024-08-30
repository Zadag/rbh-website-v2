"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Test() {
  const [profileInfo, setProfileInfo] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session) {
        console.log("Full Session Object:", JSON.stringify(session, null, 2));

        const token = session.accessToken;
        const username = session.user.name;

        if (!token) {
          console.error("No access token available");
          setProfileInfo("Error: No access token available");
          return;
        }

        try {
          const response = await axios.post(
            "http://localhost:3001/profile",
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
