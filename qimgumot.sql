-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 12 juin 2019 à 22:17
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `qimgumot`
--

-- --------------------------------------------------------

--
-- Structure de la table `solution`
--

DROP TABLE IF EXISTS `solution`;
CREATE TABLE IF NOT EXISTS `solution` (
  `idsoluce` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `motsoluce` varchar(255) NOT NULL,
  PRIMARY KEY (`idsoluce`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COMMENT='Table des mots soluces pour le projet 4 images 1 mot';

--
-- Déchargement des données de la table `solution`
--

INSERT INTO `solution` (`idsoluce`, `motsoluce`) VALUES
(1, 'FEU'),
(2, 'TERRE'),
(3, 'FROID'),
(4, 'BRUIT'),
(5, 'CROIX'),
(6, 'CHALEUR'),
(7, 'FRANGE'),
(8, 'CEREALE'),
(9, 'BLESSURE'),
(10, 'COURONNE'),
(11, 'NUE'),
(12, 'VELO');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
