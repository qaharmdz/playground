DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `rating` DECIMAL(10,2) UNSIGNED NOT NULL DEFAULT '0.00',
  `status` TINYINT(1) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

INSERT INTO `post` (`post_id`, `title`, `content`, `rating`, `status`) VALUES
	(1, 'The First Post', 'The first post description. 1', 4.8, 1);
