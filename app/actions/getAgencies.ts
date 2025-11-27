"use server";

// import { Contact } from "@/types/contact"; // make sure you have a Contact type

export async function getContacts(): Promise<any[]> {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/contacts`, // your API route for contacts
      {
        cache: "no-store", // always fetch fresh data
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch contacts");
    }

    const data: any = await res.json();
    return data;
  } catch (error) {
    console.error("getContacts error:", error);
    return [];
  }
}
