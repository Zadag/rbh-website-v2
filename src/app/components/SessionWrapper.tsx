"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, ReactNode } from "react";

type SessionWrapperProps = {
  children: ReactNode;
};

export function SessionWrapper({ children }: SessionWrapperProps) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex  min-h-full flex-1 flex-col pt-12 px-6 py-12 lg:px-8 bg-gradient-to-t from-red-950 to-black"></div>
    );
  }

  return children;
}
