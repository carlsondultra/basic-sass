import NextAuth from "next-auth"
import DiscordProvider from 'next-auth/providers/discord'

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_ID),
      clientSecret: String(process.env.DISCORD_SECRET),
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }