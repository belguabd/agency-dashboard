"use server";

import { Agency } from "@/types"; 

export async function getAgencies(): Promise<Agency[]> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/agencies`,
      {
        cache: "no-store", // always fetch fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch agencies");
    }

    const data: Agency[] = await res.json();
    return data;
  } catch (error) {
    console.error("getAgencies error:", error);
    return [];
  }
}
