import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/moj_church_db");

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 }
      );
    }

    await client.connect();
    const db = client.db();
    const users = db.collection("admin_users");

    // Check if user already exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const result = await users.insertOne({
      email,
      password: hashedPassword,
      name,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json(
      { 
        message: "Admin user created successfully",
        userId: result.insertedId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

// Get setup status
export async function GET() {
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection("admin_users");

    const userCount = await users.countDocuments();
    
    return NextResponse.json({
      hasAdminUser: userCount > 0,
      userCount
    });

  } catch (error) {
    console.error("Setup check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
} 