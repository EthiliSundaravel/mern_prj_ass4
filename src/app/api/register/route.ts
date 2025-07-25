import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming request body:", body);

    const { name, email, password } = body;
    if (!name || !email || !password) {
      console.warn("Missing fields:", { name, email, password });
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      console.warn("Email already exists:", email);
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 12);
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    });

    console.log("User inserted:", result.insertedId);
    return NextResponse.json({ success: true, userId: result.insertedId });

  } catch (error) {
    console.error("Error in /api/register:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
