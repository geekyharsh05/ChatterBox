import { AuthOptions, ISODateString } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export interface CustomSession {
    user?: CustomUser;
    expires: ISODateString;
  }
  export interface CustomUser {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    provider?: string | null;
    token?: string | null;
  }

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/",
    },

    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },
        }),
    ],
}