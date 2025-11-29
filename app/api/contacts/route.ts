import { NextResponse } from "next/server";

import { parse } from "csv-parse/sync";
import csvRaw from "@/data/contacts_contact_rows.csv?raw";

export async function GET() {
  try {
    

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