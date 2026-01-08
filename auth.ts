import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const runtime = "nodejs";

const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});

export { handlers, signIn, signOut, auth, runtime };
