import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: { params: { scope: "identify email guilds" } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and OAuth2 to the token right after signin
      if (account && user) {
        console.log("JWT Callback - Account:", account);
        console.log("JWT Callback - User:", user);
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
        };
      }
      console.log("JWT Callback - Token:", token);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("Session Callback - Token:", token);
      console.log("Session Callback - User:", user);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.username = token.username;
      console.log("Session Callback - Final Session:", session);
      return session;
    },
  },
  debug: true, // Enable debug messages in the console
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
