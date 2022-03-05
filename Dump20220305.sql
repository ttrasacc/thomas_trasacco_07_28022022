CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `toAnswer` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `toArticle` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_author` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `answer_toAnswer_fkey` (`toAnswer`),
  KEY `answer_toArticle_fkey` (`toArticle`),
  KEY `answer_id_author_fkey` (`id_author`),
  CONSTRAINT `answer_id_author_fkey` FOREIGN KEY (`id_author`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `answer_toAnswer_fkey` FOREIGN KEY (`toAnswer`) REFERENCES `answer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `answer_toArticle_fkey` FOREIGN KEY (`toArticle`) REFERENCES `article` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES ('03250fd5-bbd2-41a0-b108-a7300354fe3e',NULL,'47225206-d3ac-4533-9099-d1181f3938ac','hey','972bb5c5-20cf-4c57-9307-9e948f8f00db','2022-03-05 13:48:55'),('1bea8a1d-f2ac-427f-950f-edc54387677e',NULL,'3985d93c-8b02-4abc-8689-4e78d3aff206','test3','972bb5c5-20cf-4c57-9307-9e948f8f00db','2022-03-05 13:57:57'),('4cd74827-444e-412d-a61e-9cb978ff0500',NULL,'a3e02ad7-8b90-46ec-81fa-92c0dcc1df5b','Salut !','972bb5c5-20cf-4c57-9307-9e948f8f00db','2022-03-05 14:04:29'),('6bd9ef83-a82a-40c5-9c76-18ecfb6fc753',NULL,'3985d93c-8b02-4abc-8689-4e78d3aff206','test','972bb5c5-20cf-4c57-9307-9e948f8f00db','2022-03-05 13:57:05'),('8d8a7e41-edf9-4afa-6455-e784faf7ed4e',NULL,'be6c737d-f089-4ed4-92be-78412ee2353d','+1','29794dca-1c51-48a6-a264-5c20d8166b30','2022-02-28 21:31:13'),('8d8a7e41-edf9-4afa-8062-e784faf7ed4d',NULL,'be6c737d-f089-4ed4-92be-78412ee2353d','Ce post est inintéressant...','29794dca-1c51-48a6-a264-5c20d8166b30','2022-02-28 20:31:13');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `body` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_author` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creationDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `article_id_author_fkey` (`id_author`),
  KEY `article_id_category_fkey` (`id_category`),
  CONSTRAINT `article_id_author_fkey` FOREIGN KEY (`id_author`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `article_id_category_fkey` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES ('1ff27609-8547-49d1-9b5f-a9debd48a94f','Oh nan j\'ai refresh, j\'ai perdu mon texte :\'(','Soutenez-moi c\'est dur ....','972bb5c5-20cf-4c57-9307-9e948f8f00db',NULL,'2022-02-28 16:31:13'),('3985d93c-8b02-4abc-8689-4e78d3aff206','Ce titre va etre beaucoup trop looooooong','C\'est chiaaannnnt','972bb5c5-20cf-4c57-9307-9e948f8f00db',NULL,'2022-02-28 18:31:15'),('47225206-d3ac-4533-9099-d1181f3938ac','Et la normalement ca s\'ajoute tout seul c\'est trop fort','Ou pas ?','972bb5c5-20cf-4c57-9307-9e948f8f00db',NULL,'2022-02-28 16:33:34'),('5921e9c0-0fcc-41ea-b145-758aa1f12198','Mon deuxieme post va vous étonner','Mon deuxième post est super long !\nEn plus il a des retours à la ligne, je me demande bien s\'il va y avoir besoin de parser cette string ou pas\nEt la ca part en spam parce que j\'ai plus d\'idée ....\nazertrhrp,ojqobndbjnfjnwfvndwbnwdfbnwdfbwbdwf\nbfdb\nf\nstf\nnbs\nbs\nbgsb,fsb,fpb,f ','972bb5c5-20cf-4c57-9307-9e948f8f00db',NULL,'2022-02-28 16:22:29'),('59bd6540-f00f-4581-82fe-dd84a71ccb06','On peut dire que c\'est fini ?','Allez quoi :)','972bb5c5-20cf-4c57-9307-9e948f8f00db',NULL,'2022-03-05 14:06:43'),('a3e02ad7-8b90-46ec-81fa-92c0dcc1df5b','Premier post','Bonjour, c\'est mon premier post ici !','972bb5c5-20cf-4c57-9307-9e948f8f00db','bbad95fb-26d7-4e96-aaa9-fa1ea279b0fa','2022-02-27 14:02:57'),('be6c737d-f089-4ed4-92be-78412ee2353d','Ce titre va etre beaucoup trop looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong','C\'est chiaaannnnt','972bb5c5-20cf-4c57-9307-9e948f8f00db',NULL,'2022-02-28 18:31:24');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_label_key` (`label`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('bbad95fb-26d7-4e96-aaa9-fa1ea279b0fa','other','');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hashed_password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_username_key` (`username`),
  UNIQUE KEY `user_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('29794dca-1c51-48a6-a264-5c20d8166b30','tomtom@gmail.com','tomtom@gmail.com','$2b$10$mmT63XDCzqFo1RTkUHz8XerX9GZk2/oEMy4IwQXitmC1rTmUa3OGK',5),('972bb5c5-20cf-4c57-9307-9e948f8f00db','thomas2@gmail.com','thomas2@gmail.com','$2b$10$mmT63XDCzqFo1RTkUHz8XerX9GZk2/oEMy4IwQXitmC1rTmUa3OGK',5),('e02ce3bc-b5bf-4ea1-8eb2-0dc092637f61','thomas@gmail.com','thomas@gmail.com','$2b$10$Im9oxsj8LMuMkNCfkM53FOGgJ7S/nckknqMsZtBzmOP86jnxJ7YqW',5);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-05 15:45:47
