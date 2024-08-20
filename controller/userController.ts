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
      .select()
      .from(users)
      .where(eq(users.user_id, user_id));

    if (user.length === 0) {
      res.status(404).send({ message: "No user with this id was found" });
      return;
    }

    res.status(200).send({
      user: {
        user_id: user[0].user_id,
        fname: user[0].fname,
        lname: user[0].lname,
        email: user[0].email,
      },
    });

    await closeDB();
  } catch (error) {}
};
