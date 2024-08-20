import jwt from "jsonwebtoken";
import { config } from "dotenv";

config({ path: ".env.local" });

export function tokenValid(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
