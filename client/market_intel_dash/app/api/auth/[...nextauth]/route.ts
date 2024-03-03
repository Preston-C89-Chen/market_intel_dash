import { authOptions } from "@/lib/auth-options";
import NextAuth from "next-auth/next";
console.log(process.env.NODE_ENV);
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
