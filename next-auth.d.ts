// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      first_name?: string;
      last_name?: string;
      profile_picture?: string;
    };
    accessToken: string;
  }

  interface JWT {
    id: string;
    accessToken: string;
  }
}
