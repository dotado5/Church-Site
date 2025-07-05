import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function setupAdminUser() {
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
    const existingUser = await users.findOne({ role: "admin" });
    if (existingUser) {
      console.log("⚠️  Admin user already exists!");
      const overwrite = await question("Do you want to create a new admin user? (y/N): ");
      if (overwrite.toLowerCase() !== 'y') {
        console.log("Setup cancelled.");
        return;
      }
    }

    // Get admin details
    const name = await question("Enter admin name: ");
    const email = await question("Enter admin email: ");
    let password = await question("Enter admin password (min 6 characters): ");

    // Validate inputs
    if (!name || !email || !password) {
      console.log("❌ All fields are required!");
      return;
    }

    if (password.length < 6) {
      console.log("❌ Password must be at least 6 characters long!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Please enter a valid email address!");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin user
    const adminUser = {
      name,
      email,
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await users.insertOne(adminUser);
    console.log(`✅ Admin user created successfully!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔐 Password: ${password}`);
    console.log(`🆔 User ID: ${result.insertedId}`);
    console.log(`\n🎉 Setup complete! You can now login to the admin panel at http://localhost:3000/login`);

  } catch (error) {
    console.error("❌ Error setting up admin user:", error);
  } finally {
    await client.close();
    rl.close();
  }
}

// Run setup
setupAdminUser(); 