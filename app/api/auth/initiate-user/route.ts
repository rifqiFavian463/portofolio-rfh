import { NextResponse, NextRequest } from "next/server";
import { initiateUser } from "@/services/user.services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await initiateUser(body);
    return NextResponse.json(
      {
        success: true,
        message: "Admin user created successfully",
        data: user,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error.message === "EMAIL_EXISTS") {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }
    if (error.message === "ADMIN_ALREADY_EXISTS") {
      return NextResponse.json({ error: "Admin user already exists" }, { status: 409 });
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
