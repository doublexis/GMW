import { NextResponse } from "next/server";
import mockCustomers from "../../../data/mockCustomers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, fullName, phone } = body;

    if (action === "register") {
      const user = {
        id: `c_${Date.now()}`,
        fullName: fullName || "New Customer",
        email,
        phone,
      };
      // In a real backend, you'd persist the user and hash the password.
      return NextResponse.json({ success: true, user }, { status: 201 });
    }

    if (action === "login") {
      // Demo: accept any login and return a mock user if email matches demo list.
      const found = mockCustomers.find((c) => c.email === email) ?? {
        id: `c_${Date.now()}`,
        fullName: "Guest User",
        email,
        phone: phone ?? "",
      };
      return NextResponse.json({ success: true, user: found }, { status: 200 });
    }

    return NextResponse.json({ error: "unknown action" }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
