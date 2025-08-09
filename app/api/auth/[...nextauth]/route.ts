// [...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    profile_picture?: string;
    // Add other user fields as needed
  };
}

interface User {
  id: string;
  email: string;
  accessToken: string;
  first_name?: string;
  last_name?: string;
  profile_picture?: string;
  // Add other user fields as needed
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const response = await fetch(process.env.BACK_END_URL + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        });

        if (response.ok) {
          const data: LoginResponse = await response.json();
          if (data.tokens) {
            const accessToken = data.tokens.access;
            const user: User = { ...data.user, accessToken };
            return user;
          } else {
            throw new Error('Invalid username or password');
          }
        } else {
          console.error(response);
          throw new Error('No Server Response');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const customUser = user as User;  // Cast user to your custom User type
        token.id = customUser.id;
        token.email = customUser.email;
        token.first_name = customUser.first_name;
        token.last_name = customUser.last_name;
        token.profile_picture = customUser.profile_picture;
        token.accessToken = customUser.accessToken;
      }
        if (trigger === 'update' && session?.user.first_name ||  session?.user.last_name || session?.user.profile_picture) {
        token.first_name = session.user.first_name;
        token.last_name = session.user.last_name;
        token.profile_picture = session.user.profile_picture;
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token) {
        session.user = session.user || {};   // Ensure session.user is initialized
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.first_name = token.first_name as string;
        session.user.last_name = token.last_name as string;
        session.user.profile_picture = token.profile_picture as string;
        session.accessToken = token.accessToken as string;
      }
      

      return session;
    },
  },
  session: {
    maxAge: 2 * 60 * 60, // 2 hours in seconds
    updateAge: 60 * 60,  // Update session every hour (optional)
  },
  pages: {
    signIn: '/', // Customize the login page URL
  },
});


export { handler as GET, handler as POST };
