import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Path to your CSV file inside public/
    const csvPath = path.join(
      process.cwd(),
      "public",
      "agencies_agency_rows.csv"
    );

    // Read file
    const fileContent = fs.readFileSync(csvPath, "utf8");

    // Convert CSV to JSON
    const records: any = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to convert CSV" },
      { status: 500 }
    );
  }
}
