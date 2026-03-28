import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile, user }) {
            // On first sign-in, enrich the token with role info
            if (account && user) {
                // We do a dynamic import to avoid edge runtime issues
                const { students, teachers } = await import("@/lib/data")
                const searchEmail = user.email?.toLowerCase() || ""
                const allUsers = [...students, ...teachers]
                const foundUser = allUsers.find(u => u.email.toLowerCase() === searchEmail)

                if (foundUser) {
                    token.role = foundUser.role
                    token.userId = foundUser.id
                    token.department = foundUser.department
                    token.rollNumber = foundUser.rollNumber
                } else {
                    // Default: not in the system, assign student role
                    token.role = "student"
                    token.userId = "s_" + Date.now()
                }
            }
            return token
        },
        async session({ session, token }) {
            if (session.user && token) {
                ; (session.user as any).role = token.role
                    ; (session.user as any).id = token.userId
                    ; (session.user as any).department = token.department
                    ; (session.user as any).rollNumber = token.rollNumber
            }
            return session
        },
    },
    pages: {
        error: "/", // Redirect to home on error instead of showing the ugly error page
    },
})
