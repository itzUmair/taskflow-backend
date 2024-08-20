import { Request, Response } from "express";
import connectDB, { closeDB } from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { JWT, User } from "../types";
import { tokenValid } from "../lib/verifyToken";

config({ path: ".env.local" });

export const getUserByToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  if (!tokenValid(token)) {
    res.status(401).send({ message: "Invalid token" });
    return;
  }

  const { user_id } = jwt.decode(token) as JWT;

  try {
    const db = await connectDB();
    const user = await db
      .select({
        user_id: users.user_id,
        username: users.username,
        fname: users.fname,
        lname: users.lname,
        email: users.email,
      })
      .from(users)
      .where(eq(users.user_id, user_id));

    if (user.length === 0) {
      res.status(404).send({ message: "No user with this id was found" });
      return;
    }

    res.status(200).send({
      user: user[0],
    });

    await closeDB();
  } catch (error) {}
};
