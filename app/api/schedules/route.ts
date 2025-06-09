// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const client = await clientPromise;
//     const db = client.db("timerApp");

//     const result = await db.collection("schedules").insertOne(body);

//     return NextResponse.json({ success: true, id: result.insertedId });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("timerApp");

//     const schedules = await db.collection("schedules").find().toArray();
//     return NextResponse.json(schedules);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }


// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";
// import clientPromise from "@/app/lib/mongodb";

// export async function POST(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) return new Response("Unauthorized", { status: 401 });

//   const body = await req.json();
//   const client = await clientPromise;
//   const db = client.db("your-db-name");

//   await db.collection("schedules").insertOne({
//     userId: session.user.id,
//     ...body,
//     createdAt: new Date(),
//   });

//   return new Response("Saved", { status: 200 });
// }


import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectToDatabase from "@/app/lib/mongodb";
import { Schedule } from "@/app/models/Schedule";


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // if (!session || !session.user?.email) {
  //   return new Response("Unauthorized", { status: 401 });
  // }

   if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });

  const body = await req.json();

  await connectToDatabase();

  const newSchedule = new Schedule({
    userEmail: session.user.email,
    title: body.title,
    duration: body.duration,
    categories: body.categories,
    createdAt: new Date(),
  });

  await newSchedule.save();

  return new Response(JSON.stringify({ success: true }), { status: 201 });
}
