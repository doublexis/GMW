import { NextResponse } from "next/server";
import mockCustomers from "../../../data/mockCustomers";

export async function GET() {
  return NextResponse.json({ customers: mockCustomers });
}
