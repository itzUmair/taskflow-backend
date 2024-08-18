import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  primaryKey,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  fname: varchar("fname", { length: 100 }).notNull(),
  lname: varchar("lname", { length: 100 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  hashedPassword: varchar("password", { length: 100 }).notNull(),
});

export const projects = pgTable("projects", {
  project_id: serial("project_id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
});

export const role = pgTable("role", {
  role_id: integer("role_id").primaryKey(),
  role_name: varchar("role_name", { length: 100 }).notNull().unique(),
});

export const project_members = pgTable(
  "project_members",
  {
    project_id: integer("project_id")
      .notNull()
      .references(() => projects.project_id),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.user_id),
    role: integer("role").references(() => role.role_id),
    joined_at: date("joined_at").default(sql`CURRENT_DATE`),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.project_id, table.user_id] }),
    };
  }
);

export const status = pgTable("status", {
  status_id: integer("status_id").primaryKey(),
  status_name: varchar("status_name", { length: 100 }).notNull().unique(),
});

export const priority = pgTable("priority", {
  priority_id: integer("priority_id").primaryKey(),
  priority_name: varchar("priority_name", { length: 100 }).notNull().unique(),
});

export const tasks = pgTable("tasks", {
  task_id: serial("task_id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  status: integer("status")
    .notNull()
    .references(() => status.status_id),
  date_of_creation: date("date_of_creation").default(sql`CURRENT_DATE`),
  created_by: integer("created_by")
    .notNull()
    .references(() => users.user_id),
  priority: integer("priority_id")
    .notNull()
    .references(() => priority.priority_id),
  project: integer("project")
    .notNull()
    .references(() => projects.project_id),
});

export const task_status_updates = pgTable("task_status_updates", {
  status_update_id: serial("status_update_id").primaryKey(),
  task: integer("task")
    .notNull()
    .references(() => tasks.task_id),
  member: integer("member")
    .notNull()
    .references(() => users.user_id),
  updated_on: date("updated_on").default(sql`CURRENT_DATE`),
  from_state: integer("status")
    .notNull()
    .references(() => status.status_id),
  to_state: integer("status")
    .notNull()
    .references(() => status.status_id),
});

export const task_data_updates = pgTable("task_data_updates", {
  status_data_id: serial("status_data_id").primaryKey(),
  task: integer("task")
    .notNull()
    .references(() => tasks.task_id),
  member: integer("member")
    .notNull()
    .references(() => users.user_id),
  updated_on: date("updated_on").default(sql`CURRENT_DATE`),
});
