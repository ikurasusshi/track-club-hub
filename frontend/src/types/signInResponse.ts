import type { User } from "./user";

export type SignInResponse = {
  signIn: {
    accessToken: string;
    user: User;
  };
};
