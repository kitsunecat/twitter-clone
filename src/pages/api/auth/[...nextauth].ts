import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID || '',
      clientSecret: process.env.TWITTER_SECRET || '',
      version: "2.0",
    }),
  ],
}

export default NextAuth(authOptions)
