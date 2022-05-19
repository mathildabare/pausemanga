-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: mangaverse
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mangaverse`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mangaverse` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mangaverse`;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL DEFAULT '1',
  `genre_2` varchar(45) DEFAULT NULL,
  `genre_1` varchar(45) DEFAULT NULL,
  `synopsis` longtext,
  `img` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `img_UNIQUE` (`img`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_articles_user_idx` (`author_id`),
  CONSTRAINT `fk_articles_user` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (3,1,'Super-Heroes','Shonen','...','1647441980838_opm.webp','One Punch Man','One Punch Man'),(4,1,'Comedy','Sports','...','1647442005206_initialD.webp','Initial D','Initial D'),(5,1,'Comedy','Sports','...','1647446081920_slamdunk.webp','Slam Dunk','Slam Dunk'),(6,1,'Horror','Seinen','...','1647531916615_kuroshitsuji.webp','Black Butler','Black Butler');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL DEFAULT '1',
  `content` longtext NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_comments_users1_idx` (`author_id`),
  KEY `fk_comments_articles1_idx` (`article_id`),
  CONSTRAINT `fk_comments_articles1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (5,3,'ok',4),(7,2,'Déjà vu\r\nI’ve just been in this place before\r\nHigher on the street\r\nAnd I know it’s my time to go\r\nCalling you, and the search is a mystery\r\nStanding on my feet\r\nIt’s so hard when I try to be me, woah',4),(8,3,'Mais, vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres, des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi. Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée… Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l’interlocuteur en face, je dirais, le miroir qui vous aide à avancer. Alors ce n’est pas mon cas, comme je le disais là, puisque moi au contraire, j’ai pu ; et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie… Je ne suis qu’amour ! Et finalement, quand beaucoup de gens aujourd’hui me disent : « Mais comment fais-tu pour avoir cette humanité ? » Eh bien je leur réponds très simplement, je leur dis que c’est ce goût de l’amour, ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique, mais demain, qui sait, peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi…',4),(9,2,'J\'ai toujours aimé les grosses balles bien rondes',5),(10,1,'Trop cool !\r\n',4);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) NOT NULL,
  `name` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `content` longtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=217 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (3,'lucasj.ledoux@gmail.com','Juliodelavega','Exhibitor','Chère administratrice, \r\nMais, vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres, des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi. Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée… Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l’interlocuteur en face, je dirais, le miroir qui vous aide à avancer. Alors ce n’est pas mon cas, comme je le disais là, puisque moi au contraire, j’ai pu ; et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie… Je ne suis qu’amour ! Et finalement, quand beaucoup de gens aujourd’hui me disent : « Mais comment fais-tu pour avoir cette humanité ? » Eh bien je leur réponds très simplement, je leur dis que c’est ce goût de l’amour, ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique, mais demain, qui sait, peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi…'),(178,'00044281jarule33080040399ddwfd@yahoo.com','Henrywough','Visitor','Feel free to buy everything you want with the additional income. https://2f-2f.de/gotodate/promo '),(179,'47hat17@mailondandan.com','Henrywough','Other','We know how to make our future rich and do you? https://2f-2f.de/gotodate/promo '),(180,'undefined','undefined','undefined','undefined'),(181,'Tsidneyp@gmail.com','Henrywough','Other','Make dollars staying at home and launched this Bot. https://2f-2f.de/gotodate/promo '),(182,'foampeanut@gmail.com','Henrywough','Other','Have no money? It’s easy to earn them online here. https://2f-2f.de/gotodate/promo '),(183,'Orepach9a@gmail.com','Henrywough','Visitor','Invest $1 today to make $1000 tomorrow. https://2f-2f.de/gotodate/promo '),(184,'petkusm@eldred.k12.ny.us','Henrywough','Other','See how Robot makes $1000 from $1 of investment. https://2f-2f.de/gotodate/promo '),(185,'undefined','undefined','undefined','undefined'),(186,'santosh.kvg@gmail.com','Henrywough','Other','Wow! This Robot is a great start for an online career. https://2f-2f.de/gotodate/promo '),(187,'dannie_canavit@37.com','Henrywough','Other','See how Robot makes $1000 from $1 of investment. https://2f-2f.de/gotodate/promo '),(188,'undefined','undefined','undefined','undefined'),(189,'beachlife82.sw@googlemail.com','Henrywough','Other','We know how to become rich and do you? https://2f-2f.de/gotodate/promo '),(190,'ozcan_guvener@hotmail.com','Henrywough','Other','Make money in the internet using this Bot. It really works! https://2f-2f.de/gotodate/promo '),(191,'shambheeb@yahoo.com','Henrywough','Visitor','Try out the best financial robot in the Internet. https://2f-2f.de/gotodate/promo '),(192,'lastcall65@yahoo.com','Henrywough','Other','The huge income without investments is available, now! https://2f-2f.de/gotodate/promo '),(193,'ana.browne@chiccollection.com','Henrywough','Other','Make thousands of bucks. Pay nothing. https://2f-2f.de/gotodate/promo '),(194,'undefined','undefined','undefined','undefined'),(195,'abdultnj@yahoo.com','Henrywough','Visitor','The online job can bring you a fantastic profit. https://2f-2f.de/gotodate/promo '),(196,'undefined','undefined','undefined','undefined'),(197,'o.t.flex@gmail.com','Henrywough','Other','Only one click can grow up your money really fast. https://2f-2f.de/gotodate/promo '),(198,'undefined','undefined','undefined','undefined'),(199,'kevaughn15@yahoo.com','Henrywough','Other','The huge income without investments is available. https://2f-2f.de/gotodate/promo '),(200,'undefined','undefined','undefined','undefined'),(201,'brahim_bel_brahim@hotmail.com','Henrywough','Other','The financial Robot is your future wealth and independence. https://2f-2f.de/gotodate/promo '),(202,'undefined','undefined','undefined','undefined'),(203,'princewebfire@yahoo.com','Henrywough','Other','Money, money! Make more money with financial robot! https://2f-2f.de/gotodate/promo '),(204,'undefined','undefined','undefined','undefined'),(205,'virgkin@live.com','Henrywough','Other','The additional income for everyone. https://2f-2f.de/gotodate/promo '),(206,'fjptly035+badg002@gmail.com','Henrywough','Other','# 1 financial expert in the net! Check out the new Robot. https://2f-2f.de/gotodate/promo '),(207,'freakyfingaz2000@yahoo.com','Henrywough','Visitor','Your money work even when you sleep. https://2f-2f.de/gotodate/promo '),(208,'tubojunkee@gmail.com','Henrywough','Visitor','Money, money! Make more money with financial robot! https://2f-2f.de/gotodate/promo '),(209,'undefined','undefined','undefined','undefined'),(210,'jamiedbrown@gmail.com','Henrywough','Visitor','Financial robot is the best companion of rich people. https://2f-2f.de/gotodate/promo '),(211,'oboy420@excite.com','Henrywough','Other','Wow! This Robot is a great start for an online career. https://wough.187sued.de/gotodate/promo '),(212,'aloysia_m@hotmail.com','Henrywough','Visitor','See how Robot makes $1000 from $1 of investment. https://wough.187sued.de/gotodate/promo '),(213,'undefined','undefined','undefined','undefined'),(214,'infith@drugordr.com','Henrywough','Visitor','Using this Robot is the best way to make you rich. https://wough.187sued.de/gotodate/promo '),(215,'undefined','undefined','undefined','undefined'),(216,'raymond_hofste@hotmail.com','Henrywough','Other','Need money? Get it here easily! Just press this to launch the robot. https://wough.187sued.de/gotodate/promo ');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('-dadPumJqAFW2NJHG0wPrSvxrYzM9_g8',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('-hyBYiTwr5rCajhLFRsYcxZ_PyEkRt46',1653014583,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('2EZVihM02SFCPB-tY4xL8uSz8JkU6vsb',1652974015,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('2qNfnF2Vx8yYvVHqDPXVXluiuUHSlPsn',1652968986,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('3y-lrG6DoCM2rrNNWnpim_r-VqrocbnJ',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('5cGYKHOii9JUvFsG38eAFXIl7Un6RWI6',1653017283,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('Atru6UcGSpb19swHiWqZn4y9x2juxhwi',1652962495,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('Ejec53K-iXm_6bBVCwdm7dvQotm7gKXl',1652972909,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('ErXma2TwpfmVM9h7EK2jgNmO6bJOqyOB',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('FYR0c2AoZQ_40h5ho9L_cucWzU146oN5',1652971959,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('G8HWOcha-ExW0XpfIpT2b2TETavbtrtS',1652974015,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('GYRoOsWeSdrvpu_shimJXUVS9vasille',1652951910,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('GdokyYsb_T2Urh2W_M1mnq5VzJ6IwSKX',1652981783,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('HlGh_toeMsBvIvkUzfKZe3DBBBnc2tTv',1652951911,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('L5AX6uFy_lwaRVMLTNe6b1v3NwogQEjd',1652980860,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('LPC2ZvndGhPFYG2-sSRtjPouFp7_zEKq',1652950318,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('LT-hNuWfVbv1rDjNphi5l-m2MJy823Qo',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('LcQb4iMzRAdfmOMEEQHz-2-gY0t895fP',1652978337,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('NvpRKyO25x9KRxsLp23AI6gN7tMTahT9',1652975415,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('QXpOyaBUdZjLw7BTaBOmCyQ_W-m5gebf',1652985614,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('Qf-NOgxYPI-12hYrqTWB7OVAygoLETel',1653024248,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('R8Yv1RqxvFyyZLI6yHyt9gf4OAZ0C0Lv',1652950741,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('Ugk6TT-0uUQLBY_yzTbGCl6CIZyiJXHz',1653026914,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('V_oJBGDhFNCWWMjGFAVgl4d5blZ5sKSe',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('XiRfr8l9vqOny9lt3wUzj0WgbX_hcOKR',1653010238,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('YXub-v7CUnGZH-cuahhjx9LF7FqbTrPG',1652950922,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('Ykq6QT5SLrEkNBhuuh6uRzAlD_OUc9St',1652978146,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('dO0-xxMFdeGCOQqob2kfY5rRGN68GhDr',1652967225,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('erJVsHVTsbBHAW5l5wMIg__f-wjMBTjC',1652950503,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('gkGnYRc8KFsdLgahot8o82e6uZM9eWJl',1653026770,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('jqiERSNKTpFcoOPgkYC0PRscCuR5I_bn',1652988150,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('kEsTU1uKsqLDgt5tcDiBSYojugo3mTPY',1652951912,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('lsKHQ1tuYN8MPJ9g6DiqaP0uncBmBuFy',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('lyz687rVldtJT-SxDYyvo2_9bIMAp6Mc',1653027643,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('p5aE69zjvcC0Ghdq7OLfGKZGKMX8jjP1',1652962367,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('pqvReaBCDbjzBKk9vKNu821hLQylE6Wp',1653025823,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('qvMfy8CHr1XjCGKnxjRvLO6WvkqKYCoy',1653024248,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('r2UUOkhQENS_khY-8Ebimn5f9pJ8s5Tr',1653027284,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('rMpaWfeW1Cw_UDKVlo5RNeL0LkaUR70P',1653026526,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('sd3eCLKmCmuz9l3Tnkd0Q1IoSa-PUjhW',1652997942,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'),('tySrISgbuIUFyvpB55Ww6V3Vy-Br6YRR',1652964399,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tomes`
--

DROP TABLE IF EXISTS `tomes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tomes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` int NOT NULL,
  `img` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_tomes_articles1_idx` (`name`),
  CONSTRAINT `fk_tomes_articles1` FOREIGN KEY (`name`) REFERENCES `articles` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tomes`
--

LOCK TABLES `tomes` WRITE;
/*!40000 ALTER TABLE `tomes` DISABLE KEYS */;
/*!40000 ALTER TABLE `tomes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `biography` longtext,
  `avatar` varchar(255) DEFAULT NULL,
  `isAdmin` int NOT NULL DEFAULT '0',
  `isBan` int NOT NULL DEFAULT '0',
  `isVerified` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Silwana','mathildabare@gmail.com','$2b$10$Jt4lMAFO9LXd8Mp9/2QwzOlHJmDPIDQ/SToreU0vRbaEYdbecHBWC',NULL,'1647437722384_silwana.webp',1,0,0),(2,'Nina','nakadcontact@gmail.com','$2b$10$OjKkQx2qhkSuMytxkqfkYO0wObZxoNRfqL.Y6Tp5UIUdA8lXHtpN.',NULL,'1647437835566_comment2.webp',0,0,0),(3,'JuliodelaVega','lucasj.ledoux@gmail.com','$2b$10$kRj4L2G2C1lLF9pMuAXzi.bFahUlvd.i45yNWg8ofrcTD5HXUoPGq','Mais, vous savez, moi je ne crois pas qu’il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d’abord des rencontres, des gens qui m’ont tendu la main, peut-être à un moment où je ne pouvais pas, où j’étais seul chez moi. Et c’est assez curieux de se dire que les hasards, les rencontres forgent une destinée… Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l’interlocuteur en face, je dirais, le miroir qui vous aide à avancer. Alors ce n’est pas mon cas, comme je le disais là, puisque moi au contraire, j’ai pu ; et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie… Je ne suis qu’amour ! Et finalement, quand beaucoup de gens aujourd’hui me disent : « Mais comment fais-tu pour avoir cette humanité ? » Eh bien je leur réponds très simplement, je leur dis que c’est ce goût de l’amour, ce goût donc qui m’a poussé aujourd’hui à entreprendre une construction mécanique, mais demain, qui sait, peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi…','1647442220370_ruby.webp',0,0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-19  6:35:55
