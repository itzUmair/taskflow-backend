import { Request, Response } from "express";
import connectDB, { closeDB } from "../database";
import { project_members, projects, role, users } from "../database/schema";
import { eq } from "drizzle-orm";

export const getUserProjects = async (req: Request, res: Response) => {
  const { userid } = req.params;

  try {
    const db = await connectDB();
    const response = await db
      .select({ project_id: projects.project_id, project_name: projects.name })
      .from(projects)
      .innerJoin(
        project_members,
        eq(projects.project_id, project_members.project_id)
      )
      .where(eq(project_members.user_id, Number(userid)));
    res.status(200).send({ projects: response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong! Please try again later" });
  } finally {
    await closeDB();
  }
};

export const getProjectMembers = async (req: Request, res: Response) => {
  const { projectid } = req.params;

  try {
    const db = await connectDB();
    const response = await db
      .select({
        user_id: users.user_id,
        fname: users.fname,
        username: users.username,
        role: role.role_name,
      })
      .from(users)
      .innerJoin(project_members, eq(users.user_id, project_members.user_id))
      .innerJoin(role, eq(project_members.role, role.role_id))
      .where(eq(project_members.project_id, Number(projectid)));
    res.status(200).send({ members: response });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong! Please try again later" });
  } finally {
    await closeDB();
  }
};
