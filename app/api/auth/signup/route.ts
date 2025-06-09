


// // app/api/auth/signup/route.ts

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import connectDB from "@/app/lib/mongodb";
// import { User } from "@/app/models/User";

// export async function POST(req: Request) {

 


//   try {
//     const { email, password, username } = await req.json();

//     // Validate fields
//     if (!email || !password || !username) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     await connectDB();

//     // Check if email or username is taken
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return NextResponse.json({ error: "Email or username already in use" }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ email, password: hashedPassword, username });
//     await newUser.save();

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (err) {
//     console.error("Signup error:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/models/User";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
