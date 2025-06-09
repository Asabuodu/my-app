


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "@/app/lib/mongodb";
// import { User } from "@/app/models/User";
// import bcrypt from "bcryptjs";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if ( !credentials?.username || !credentials?.email || !credentials?.password) return null;

//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });

//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Invalid credentials");

//         return { id: user._id, email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = String(token.id);
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },

//   async authorize(credentials) {
//   const { email, password } = credentials ?? {};

//   if (!email || !password) {
//     throw new Error("Missing email or password");
//   }

//   await connectDB();
//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new Error("No user found");
//   }

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) {
//     throw new Error("Invalid credentials");
//   }

//   return { id: user._id, email: user.email };
// },

// };

// const handler = NextAuth(authOptions);

// export { authOptions }; // ✅ Export it here
// export { handler as GET, handler as POST };



// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "@/app/lib/mongodb";
// import { User } from "@/app/models/User";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { email, password } = credentials ?? {};

//         if (!email || !password) throw new Error("Missing email or password");

//         await connectDB();
//         const user = await User.findOne({ email });

//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(password, user.password);
//         if (!isValid) throw new Error("Invalid credentials");

//         return { id: user._id, email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = String(token.id);
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
// });

// export { handler as GET, handler as POST };



import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/app/lib/mongodb";
import { User } from "@/app/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};

        if (!email || !password) throw new Error("Missing email or password");

        await connectDB();
        const user = await User.findOne({ email });

        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: user._id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
