import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("Attempting MongoDB connection...");
    const client = await clientPromise;
    console.log("MongoDB connected ✅");

    const db = client.db();
    const collections = await db.listCollections().toArray();
    return NextResponse.json({ collections });

  } catch (error) {
    console.error("❌ Database connection error:", error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}
