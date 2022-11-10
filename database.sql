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
	('Scotty', 'M', '4', 'Y', 'Born in Guatemala'),
    ('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),
    ('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'),
    ('Logan', 'M', '15', 'N', 'Loves the sauna'),
    ('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana'),
    ('Betsy', 'F', '4', 'Y', 'Has a pet iguana');


SELECT * FROM "koalas";