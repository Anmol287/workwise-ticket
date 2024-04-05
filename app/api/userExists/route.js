
import { connectMongoDB } from "@/app/lib/mongodb";
import { User } from "@/app/models/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const { email } = await req.json();
        const user = await User.findOne({ email }).select("_id");
        return NextResponse.json({ user },)
    } catch (error) {
        console.log(error);
    }
}