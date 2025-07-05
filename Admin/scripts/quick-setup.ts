import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/moj_church_db";
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log("🏗️  Setting up MOJ Church Admin User...\n");

    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db();
    const users = db.collection("admin_users");

    // Check if admin user already exists
    const existingUser = await users.findOne({ email: "admin@mojchurch.com" });
    if (existingUser) {
      console.log("⚠️  Admin user already exists!");
      console.log("📧 Email: admin@mojchurch.com");
      console.log("🔐 Password: admin123");
      console.log("🎉 You can now login to the admin panel!");
      return;
    }

    // Admin user details
    const adminData = {
      name: "Church Administrator",
      email: "admin@mojchurch.com",
      password: "admin123"
    };

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    // Create admin user
    const adminUser = {
      name: adminData.name,
      email: adminData.email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await users.insertOne(adminUser);
    console.log(`✅ Admin user created successfully!`);
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔐 Password: ${adminData.password}`);
    console.log(`🆔 User ID: ${result.insertedId}`);
    console.log(`\n🎉 Setup complete! You can now login to the admin panel!`);

  } catch (error) {
    console.error("❌ Error setting up admin user:", error);
  } finally {
    await client.close();
  }
}

// Run setup
createAdminUser(); 