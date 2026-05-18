import { SignJWT } from "jose";
import { NextResponse } from "next/server";

async function signLocalToken({ email, name, image, photo }) {
  const secret = process.env.JWT_SECRET || process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is missing in .env.local");
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

  return token;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, image, photo } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required to generate token." },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    // Prefer token from the live API (always matches server verification secret)
    if (apiUrl) {
      try {
        const upstream = await fetch(`${apiUrl}/api/auth/jwt`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, image, photo }),
          cache: "no-store",
        });

        const data = await upstream.json().catch(() => ({}));

        if (upstream.ok && data.token) {
          return NextResponse.json({
            success: true,
            message: "JWT token created successfully.",
            token: data.token,
          });
        }
      } catch {
        // fall through to local signing
      }
    }

    const token = await signLocalToken({ email, name, image, photo });

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
