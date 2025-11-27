import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to the CSV file inside the public folder
    const csvPath = path.join(
      process.cwd(),
      "public",
      "contacts_contact_rows.csv"
    );

    // Read the CSV file
    const fileContent = fs.readFileSync(csvPath, "utf8");

    // Parse CSV to JSON
    const contacts = parse(fileContent, {
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
