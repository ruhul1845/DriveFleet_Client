import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, name, image, photo } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required to generate token." },
        { status: 400 }
      );
    }

    const secret = process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "JWT_SECRET is missing in .env.local" },
        { status: 500 }
      );
    }

    const token = await new SignJWT({
      email,
      name: name || "",
      image: image || photo || "",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(secret));

    return NextResponse.json({
      success: true,
      message: "JWT token created successfully.",
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to create token." },
      { status: 500 }
    );
  }
}
