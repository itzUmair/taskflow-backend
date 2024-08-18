CREATE TABLE IF NOT EXISTS "priority" (
	"priority_id" integer PRIMARY KEY NOT NULL,
	"priority_name" varchar(100) NOT NULL,
	CONSTRAINT "priority_priority_name_unique" UNIQUE("priority_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_members" (
	"project_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"role" integer,
	"joined_at" date DEFAULT CURRENT_DATE,
	CONSTRAINT "project_members_project_id_user_id_pk" PRIMARY KEY("project_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"project_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"role_id" integer PRIMARY KEY NOT NULL,
	"role_name" varchar(100) NOT NULL,
	CONSTRAINT "role_role_name_unique" UNIQUE("role_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status" (
	"status_id" integer PRIMARY KEY NOT NULL,
	"status_name" varchar(100) NOT NULL,
	CONSTRAINT "status_status_name_unique" UNIQUE("status_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_data_updates" (
	"status_data_id" serial PRIMARY KEY NOT NULL,
	"task" integer NOT NULL,
	"member" integer NOT NULL,
	"updated_on" date DEFAULT CURRENT_DATE
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_status_updates" (
	"status_update_id" serial PRIMARY KEY NOT NULL,
	"task" integer NOT NULL,
	"member" integer NOT NULL,
	"updated_on" date DEFAULT CURRENT_DATE,
	"status" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tasks" (
	"task_id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"description" varchar(256) NOT NULL,
	"status" integer NOT NULL,
	"date_of_creation" date DEFAULT CURRENT_DATE,
	"created_by" integer NOT NULL,
	"priority_id" integer NOT NULL,
	"project" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_projects_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "project_members" ADD CONSTRAINT "project_members_role_role_role_id_fk" FOREIGN KEY ("role") REFERENCES "public"."role"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_data_updates" ADD CONSTRAINT "task_data_updates_task_tasks_task_id_fk" FOREIGN KEY ("task") REFERENCES "public"."tasks"("task_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_data_updates" ADD CONSTRAINT "task_data_updates_member_users_user_id_fk" FOREIGN KEY ("member") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_status_updates" ADD CONSTRAINT "task_status_updates_task_tasks_task_id_fk" FOREIGN KEY ("task") REFERENCES "public"."tasks"("task_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_status_updates" ADD CONSTRAINT "task_status_updates_member_users_user_id_fk" FOREIGN KEY ("member") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_status_updates" ADD CONSTRAINT "task_status_updates_status_status_status_id_fk" FOREIGN KEY ("status") REFERENCES "public"."status"("status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_status_status_status_id_fk" FOREIGN KEY ("status") REFERENCES "public"."status"("status_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_users_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_priority_id_priority_priority_id_fk" FOREIGN KEY ("priority_id") REFERENCES "public"."priority"("priority_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_projects_project_id_fk" FOREIGN KEY ("project") REFERENCES "public"."projects"("project_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
