import { connectMongoDB } from "@/app/lib/mongodb";
import { Ticket } from "../../models/schema";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await connectMongoDB(); 
        const tickets = await Ticket.find();
    
        return NextResponse.json({ tickets }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const ticketData = body.formData;
        await connectMongoDB()
        await Ticket.create(ticketData);

        return NextResponse.json({ message: "Ticket Created" }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}

