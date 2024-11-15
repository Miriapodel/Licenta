import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Account, User } from "next-auth";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }: { user: User; account: Account | null }) {
            const email = user?.email;
            const name = user?.name || "";
            const [firstName, lastName] = name.split(" ");
            const provider = "google";
            const providerUserId = account?.id || "";

            try {
                const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/Google/googleAuth`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, firstName, lastName, provider, providerUserId }),
                });

                if (!response.ok) return false;

                return true;
            } catch (error) {
                console.error("Error saving user and credentials to database:", error);
                return false;
            }
        },
    },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
