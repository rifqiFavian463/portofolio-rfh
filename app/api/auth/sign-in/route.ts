import { NextResponse, NextRequest } from "next/server";
import { signIn } from "@/services/user.services";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await signIn(body);

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return NextResponse.json({
      success: true,
      message: "User signed in successfully",
      data: { user: { id: user.id, email: user.email, name: user.name }, token },
    });
  } catch (error: any) {
    if (error.message == "USER_NOT_FOUND") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    if (error.message == "INVALID_PASSWORD") {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
