import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { parse } from "csv-parse/sync";
import csvRaw from "@/data/contacts_contact_rows.csv?raw";

export async function GET() {
  try {
    // Authenticate the request
    const { userId } = await auth();
    
    // If no user is authenticated, return 401 Unauthorized
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Parse CSV to JSON
    const contacts = parse(csvRaw, {
      columns: true, // Use the first row as column names
      skip_empty_lines: true, // Ignore empty lines
    });

    // Return as JSON
    return NextResponse.json(contacts);
  } catch (error) {
    console.error("Error reading CSV:", error);
    return NextResponse.json(
      { error: "Failed to convert CSV to contacts JSON" },
      { status: 500 }
    );
  }
}