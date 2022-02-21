-- Doc:
--   - https://dev.to/gsudarshan/how-to-install-mysql-and-workbench-on-ubuntu-20-04-localhost-5828
--   - https://sql.sh/cours/create-table/primary-key
--   - https://www.w3schools.com/sql/sql_datatypes.asp
--   - https://www.w3schools.com/mySQl/mysql_create_table.asp

-- D'abord créer notre DB
-- create database nomdb
-- use 'nomdb'

-- ensuite créer nos tables
-- create table nom_table

-- créer un user
-- create table users ...


CREATE TABLE users (
    `id` int NOT NULL AUTO_INCREMENT,
    `username` varchar(255),
    `mail` varchar(255),
    `password` varchar(255),
    PRIMARY KEY (`id`) );

Ensuite, jouer avec les commandes SQL (Select, Insert into, Update, SET, where, delete)

------------------- COMMANDES --------------------------

-- // INSERT INTO
insert into nom_table (col1, col2, col3, ..)
values ('value1', 'value2', 'value3', ...);


-- // WHERE
SELECT * FROM nom_table
WHERE nom_col = 'col_value';
--> N'affiche que les éléments de la col sélectionnée


-- // UPDATE
UPDATE nom_table
SET nom_col = '..', nom_col2 = '..'
WHERE id = ..;


--// DELETE
DELETE FROM nom_table 
WHERE nom_col='value';



--// BETWEEN

SELECT * FROM nom_table
WHERE nom_col BETWEEN 'first_number' AND 'second_number';


--// ORDER BY
ORDER BY no



-- Ajouter new_col à une table --
ALTER TABLE nom_table
ADD nom_col datatype
;


---------------------- JOIN --------------------------


SELECT articles.title, articles.author_id, users.username, users.mail
    FROM  articles
    INNER JOIN users
    ON articles.author_id = 1
;


-- Auteur du comment = User ID
SELECT users.username, comments.author_id
    FROM users
    INNER JOIN comments
    ON users.id = comments.author_id
;

-- Article du Comment = Article ID
SELECT articles.title, comments.article_id
    FROM articles
    INNER JOIN comments
    ON articles.id = comments.article_id
;

-- Auteur de l'article
SELECT users.username, articles.title
FROM users
INNER JOIN articles
ON users.id = articles.author_id

--FILTRE ARTICLES PAR MATH
+ WHERE users.id = 1

--FILTRE PAR USERNAME
+ WHERE users.username = 'username'
;


-- Comments => Lier 3 tables (username, article title, comment content)

SELECT users.username, articles.title, comments.content 
FROM ((comments
INNER JOIN users ON users.id = comments.author_id)
INNER JOIN articles ON articles.id = comments.article_id);




-- Valeur par défaut de l'author_id
ALTER TABLE articles
ALTER author_id SET DEFAULT 1;


---------------------- DATA --------------------------

-- Table Tomes
insert into tomes (articles_id, number, img, name )
values ('1', '1', '...', 'Judge' );


-- SELECT tomes.name, tomes.number, tomes.img
-- FROM articles
-- INNER JOIN tomes
-- ON articles.name = tomes.name;

SELECT tomes.name, tomes.number, tomes.img
FROM articles
LEFT JOIN tomes 
ON articles.name = tomes.name;



SELECT  articles.name, tomes.name, tomes.number, tomes.img
FROM articles 
INNER JOIN tomes 
ON articles.name = tomes.name 
WHERE articles.id = ${req.params.id}
ORDER BY tomes.number;




SELECT  articles.name, tomes.name, tomes.number, tomes.img
FROM articles 
INNER JOIN tomes 
ON articles.name = tomes.name 
WHERE articles.id = ${req.params.id}



-- Blog
  SELECT  users.username, users.avatar, comments.content, comments.article_id
  FROM users 
  INNER JOIN comments 
  ON users.id = comments.author_id
  WHERE article_id = ${req.params.id}; 


avatar, content, username

author-id = users.id


-- Admin


SELECT users.username, users.avatar, articles.title, comments.content 
FROM ((comments
INNER JOIN users ON users.id = comments.author_id)
INNER JOIN articles ON articles.id = comments.article_id
);





 SELECT tomes.name, tomes.number, tomes.img 
 FROM  articles
 INNER JOIN tomes 
 ON articles.id = articles.id