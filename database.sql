CREATE TABLE "tasks" (
	"id" serial primary key,
	"task" varchar(255),
	"completed" boolean default false,
	"date" DATE
	);


