"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data } = useSession();
  return (
    <div>
      <h1>Profile Page</h1>
      <hr />
      <div className="flex flex-col">
        <span>{data?.user?.name}</span>
        <span>{data?.user?.email}</span>
        <span>{data?.user?.image}</span>
        <span>{data?.user?.id}</span>
        <span>{data?.user?.roles}</span>
      </div>
    </div>
  );
}
