import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Account, User } from "next-auth";
import prisma from '../../../../../lib/prisma/prisma';


const handleGoogleSignIn = async (user: User, account: Account | null) => {
    const email = user?.email || "";
    const name = user?.name || "";
    const [firstName, lastName] = name.split(" ");
    const provider = account?.provider;
    const providerUserId = account?.providerAccountId || "";

    try{
        let user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            user = await prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    role: "CLIENT"
                }
            });

            await prisma.credentials.create({
                data: {
                    userId: user.id,
                    provider,
                    providerUserId,
                    passwordHash: null
                }
            });
        } else {
            const credentials = await prisma.credentials.findFirst({
                where: {
                    userId: user.id,
                    provider: {
                        not: provider
                    }
                }
            });

            if(credentials)
                return false;
        }

        return true;
    } catch (error){
        return false;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User; account: Account | null }) {
            // const email = user?.email;
            // const name = user?.name || "";
            // const [firstName, lastName] = name.split(" ");
            // const providerUserId = account?.id || "";

            if (account?.provider === "google")
                return await handleGoogleSignIn(user, account);

            return false;

            // try {
            //     const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/Google/googleAuth`, {
            //         method: "POST",
            //         headers: { "Content-Type": "application/json" },
            //         body: JSON.stringify({ email, firstName, lastName, provider, providerUserId }),
            //     });

            //     if (!response.ok) return false;

            //     return true;
            // } catch (error) {
            //     console.error("Error saving user and credentials to database:", error);
            //     return false;
            // }
        },
    },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
