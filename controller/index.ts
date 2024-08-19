import { Request, Response } from "express";
import connectDB from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config({ path: ".env.local" });

export const home = async (_: Request, res: Response) => {
  res.status(200).send({ message: "home" });
};

export const signup = async (req: Request, res: Response) => {
  const { fname, lname, email, password } = req.body;

  if (!fname || !lname || !email || !password) {
    res.status(400).send({ message: "All fields are required" });
    return;
  }

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
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "All fields are required" });
    return;
  }

  try {
    const db = await connectDB();
    const user = await db.select().from(users).where(eq(users.email, email));
    if (user.length === 0) {
      res.status(400).send({ message: "Incorrect email or password" });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user[0].hashedPassword
    );

    if (!passwordMatch) {
      res.status(400).send({ message: "Incorrect email or password" });
      return;
    }

    const token = jwt.sign(
      { user_id: user[0].user_id },
      process.env.JWT_SECRET as string,
      { expiresIn: 7 * 24 * 60 * 60 }
    );

    res.status(200).send({
      message: "Logged in successfully!",
      token,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};
