import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "Phone number", type: "text", placeholder: "Enter Phone number", required: true },
                password: { label: "Password", type: "password", required: true }
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: any) {
            // Do zod validation, OTP validation here
                const existingUser = await db.user.findUnique({
                    where: {
                        phone_number: credentials.phone
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id,
                            name: existingUser.name,
                            email: existingUser.phone_number
                        }
                    }
                    return null;
                }
                return null
            },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    },
    pages: {
        signIn: "/signin"
    }
}
