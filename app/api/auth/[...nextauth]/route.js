import { Formlogin } from "@/app/(models)/mongodb";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const { username, password } = credentials;
                try {

                    const existingUser = await Formlogin.findOne({ username });
                    console.log("email", existingUser);

                    if (!existingUser) {
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, existingUser.password);

                    if (!passwordsMatch) {
                        return null;
                    }
                    return { email:existingUser.username};


                } catch (error) {
                    console.log("error", error);
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }