

// /app/api/schedule/route.ts (or pages/api/schedule.ts if using pages dir)
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options"; // adjust path as needed
import connectDB from "@/app/lib/mongodb";
import { Schedule } from "@/app/models/Schedule";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const data = await req.json();
    await connectDB();

    const newSchedule = new Schedule({
      ...data,
      userId: session.user.id, // associate schedule with user
    });

    await newSchedule.save();

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error("Schedule save error:", error);
    return new Response(JSON.stringify({ error: "Failed to save" }), { status: 500 });
  }
}

// export async function GET(req: Request) {
//   const session = await getServerSession(authOptions);

//   if (!session || !session.user) {
//     return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
//   }

//   try {
//     await connectDB();
//     const schedules = await Schedule.find({ userId: session.user.id });

//     return new Response(JSON.stringify(schedules), { status: 200 });
//   } catch (error) {
//     console.error("Schedule fetch error:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch schedules" }), { status: 500 });
//   }
// }



