import { Request, Response } from "express";
import connectDB from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const home = async (_: Request, res: Response) => {
  res.status(200).send({ message: "home" });
};

export const signup = async (req: Request, res: Response) => {
  const { fname, lname, email, password } = req.body;

  try {
    const db = await connectDB();
    const userExists = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (userExists.length > 0) {
      res
        .status(401)
        .send({ message: "Account with this email already exists" });
      return;
    }

    const hashedPassord: string = await bcrypt.hash(password, 10);
    const username: string = email.split("@")[0];

    await db.insert(users).values({
      email: email,
      username: username,
      fname: fname,
      lname: lname,
      hashedPassword: hashedPassord,
    });

    res.status(201).send({ message: "Account created successfully!" });
  } catch (error) {}
};
