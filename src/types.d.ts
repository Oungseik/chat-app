import { Session } from "express-session";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string;
      username: string;
      email?: string;
      isAvatarImageSet: user.isAvatarImageSet;
      avatarImage: user.avatarImage;
    };
  }
}
