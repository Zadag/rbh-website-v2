"use client";
import { useEffect, useState } from "react";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
import { useUser } from "../hooks/UserContext";
import axios from "axios";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;

export default function Verify() {
  const [inDisc, setInDisc] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const userCtx = useUser();
  const apiUrl = config.EXPRESS_URL;

  if (userCtx === undefined) {
    throw new Error("User Context can only be used in a User Provider tree");
  }
  const { user, loading, session } = userCtx;

  const fetchDiscordStatus = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/verify`,
        {
          accessToken: session?.accessToken,
          username: session?.user?.name,
          inDisc: false,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      console.log(response.data);
      setInDisc(response.data);
    } catch (error) {
      console.error("Error fetching discord status:", error);
    }
  };

  useEffect(() => {
    fetchDiscordStatus();
  }, []);

  return (
    <>
      {!inDisc ? (
        <>
          <p className="text-slate-200">Please join the discord</p>
          <button className="bg-slate-300 hover:bg-slate-400">
            Check Discord status
          </button>
        </>
      ) : (
        <p className="text-slate-200">You are in RBH</p>
      )}
    </>
  );
}
