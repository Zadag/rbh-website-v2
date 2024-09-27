"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import ProfileInfoCard from "../components/ProfileInfoCard";
import configProd from "../../../config.prod.json";
import configLocal from "../../../config.local.json";
import { useUser } from "../hooks/UserContext";
const config =
  process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? configLocal : configProd;

export default function Profile() {
  const apiUrl = config!.EXPRESS_URL;
  console.log(apiUrl);

  const userCtx = useUser();
  if (userCtx === undefined) {
    throw new Error("User Context can only be used in a User Provider tree");
  }
  const { user, loading, session } = userCtx;

  if (loading) return <p>Loading...</p>;

  return <>{user ? <ProfileInfoCard userProps={user} /> : null}</>;
}
