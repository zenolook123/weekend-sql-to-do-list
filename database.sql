CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(255),
	"completed" boolean default false
	);
	
INSERT INTO "tasks" ("task", "completed")
VALUES ('Go on a walk', false);

-- DROP TABLE "tasks"