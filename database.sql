CREATE TABLE "koalas" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50) NOT NULL,
	"gender" VARCHAR (1) NOT NULL,
	"age" VARCHAR (3),
    "ready_to_transfer" BOOLEAN DEFAULT FALSE,
    "notes" VARCHAR (200)
);

INSERT INTO "koalas" 
	("name", "gender", "age", "ready_to_transfer", "notes") 
VALUES 
	('Scotty', 'M', '4', 'true', 'Born in Guatemala'),
    ('Jean', 'F', '5', 'true', 'Allergic to lots of lava'),
    ('Ororo', 'F', '7', 'false', 'Loves listening to Paula (Abdul)'),
    ('Logan', 'M', '15', 'false', 'Loves the sauna'),
    ('Charlie', 'M', '9', 'true', 'Favorite band is Nirvana'),
    ('Betsy', 'F', '4', 'true', 'Has a pet iguana');


SELECT * FROM "koalas";