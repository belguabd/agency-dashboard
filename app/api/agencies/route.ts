import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import csvRaw from "@/data/agencies_agency_rows.csv?raw";

export async function GET() {
 
  try {
    const records = parse(csvRaw, {
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
