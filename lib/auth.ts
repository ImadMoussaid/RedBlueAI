import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const founderEmail = process.env.FOUNDER_EMAIL;
        const founderHash = process.env.FOUNDER_PASSWORD_HASH;

        if (!founderEmail || !founderHash) return null;
        if (credentials.email !== founderEmail) return null;

        const valid = await compare(credentials.password, founderHash);
        if (!valid) return null;

        return { id: 'founder', email: founderEmail, name: 'Founder' };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    }
  }
};
