// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string;
//       accessToken?: string;
//       email?: string;
//       image?: string;
//     };
//   }
// }

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    username?: string;
  }
}
