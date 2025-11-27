"use server";

import { Contact } from "@/types";

export async function getContacts(): Promise<Contact[]> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/contacts`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const data: Contact[] = await res.json();
    return data;
  } catch (error) {
    console.error("getContacts error:", error);
    return [];
  }
}
