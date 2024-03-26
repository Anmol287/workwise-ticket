import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import { Formlogin } from "@/app/(models)/mongodb";

export async function POST(req) {
    try {
        const body = await req.json();
        const loginData = body.loginData;

        const existingUser = await Formlogin.findOne({ username: loginData.username });

        if (existingUser) {
            return NextResponse.json({ message: "User Already Existing" }, { status: 400 })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(loginData.password, 10);

        if (!loginData || !loginData.username || !hashedPassword) {
            console.error("Invalid login data:", loginData);
            return NextResponse.json({ message: "Invalid login data" }, { status: 400 });
        }
        const newUser = new Formlogin({
            username: loginData.username,
            password: hashedPassword
        });

        await newUser.save();

        return NextResponse.json({ message: "User Created" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
}
