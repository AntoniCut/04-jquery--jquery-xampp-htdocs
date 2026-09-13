-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: classicmodels
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productCode` varchar(15) NOT NULL,
  `productName` varchar(70) NOT NULL,
  `productLine` varchar(50) NOT NULL,
  `productScale` varchar(10) NOT NULL,
  `productVendor` varchar(50) NOT NULL,
  `productDescription` text NOT NULL,
  `quantityInStock` smallint(6) NOT NULL,
  `buyPrice` decimal(10,2) NOT NULL,
  `MSRP` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('S10_1678','1969 Harley Davidson Ultimate Chopper','Motorcycles','1:10','Min Lin Diecast','This replica features working kickstand, steering, suspension, gear-shift lever, footbrake lever, drive chain, wheels and steering. All parts are particularly delicate due to their precise scale and require special care and attention.',7933,48.81,95.70),('S10_1949','1952 Alpine Renault 1300','Classic Cars','1:10','Classic Metal Creations','Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',7305,98.58,214.30),('S12_1099','1968 Ford Mustang','Classic Cars','1:12','Autoart Studio Design','Hood, doors and trunk all open to reveal highly detailed interior features. Steering wheel actually turns the front wheels. Color dark green.',9350,68.99,118.94),('S12_1108','2001 Ferrari Enzo','Classic Cars','1:12','Second Gear Diecast','Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',3619,95.59,207.80),('S12_1666','1961 Chevrolet Impala','Classic Cars','1:18','Welly Diecast Productions','This 1:18 scale replica features opening doors, hood and trunk. Color white.',7869,32.33,80.84),('S18_1097','1940 Ford Pickup Truck','Trucks and Buses','1:18','Carousel Diecast Legends','This model features soft rubber tires, working steering, rubber mud guards, authentic Ford logos, detailed undercarriage, opening doors and hood, removable split rear gate.',2613,58.33,121.08),('S18_1129','1937 Lincoln Berline','Vintage Cars','1:18','Gearbox Collectibles','Features opening hood, opening doors, opening trunk, wide white wall tires and front door arm rests. Has a hood ornament.',9032,49.30,146.32),('S18_1589','1969 Dodge Charger','Classic Cars','1:18','Welly Diecast Productions','1:18 scale replica of the 1969 Dodge Charger. Hood, doors and trunk all open to reveal highly detailed interior features.',8043,58.73,115.16),('S18_1749','1936 Mercedes-Benz 500K Special Roadster','Vintage Cars','1:18','Studio M','This 1:18 scale replica is truly a masterpiece. It features doors, hood, and trunk that open.',2081,24.26,94.99),('S18_1885','1936 Mercedes-Benz 500K Special','Vintage Cars','1:18','Exoto Designs','Features opening hood, opening doors, opening trunk, wide white wall tires and front door arm rests.',2992,72.56,141.54),('S18_1984','1970 Triumph Spitfire','Classic Cars','1:18','Min Lin Diecast','Features include: Turnable front wheels; steering function; detailed interior; detailed engine; opening hood; opening trunk; opening doors; and detailed chassis.',8014,19.91,143.62),('S18_2238','1968 Ford Mustang GT 390 Fastback','Classic Cars','1:18','Min Lin Diecast','1:18 scale replica of the 1968 Mustang GT 390 Fastback featured in the movie Bullitt.',9350,68.99,118.94),('S18_2248','1971 Alpine Renault 1600s','Classic Cars','1:18','Classic Metal Creations','This 1:18 scale replica of the 1971 Alpine Renault 1600s is a limited edition.',7993,38.58,61.23),('S18_2325','1969 Corvette ZR1','Classic Cars','1:18','Classic Metal Creations','This model features: opening hood, opening doors, detailed engine, detailed interior, and trunk.',8606,50.31,118.32),('S18_2795','1913 Ford Model T Tourer','Vintage Cars','1:18','Exoto Designs','Features opening hood, opening doors, opening trunk, wide white wall tires and front door arm rests.',8990,33.30,68.36),('S18_2870','1996 Moto Guzzi 1100i','Motorcycles','1:10','Min Lin Diecast','Official Moto Guzzi logos and insignias, saddle bag located on side of motorcycle, detailed engine, working steering, front and rear suspension.',7627,68.99,118.94),('S18_3029','1996 Peterbilt 379 Stake Bed with Outrigger','Trucks and Buses','1:18','Min Lin Diecast','This model features, opening doors, detailed engine, working steering, tinted windows, detailed interior, dual exhaust stacks, and detailed chassis.',8142,33.61,74.03),('S18_3136','1980s Black Hawk Helicopter','Planes','1:18','Red Start Diecast','1:18 scale replica of a 1980s Black Hawk Helicopter. Rotating blades and wheels.',1577,49.60,102.53),('S18_3140','1970 Chevy Chevelle SS 454','Classic Cars','1:18','Min Lin Diecast','1:18 scale replica of the 1970 Chevy Chevelle SS 454. Hood, doors and trunk all open.',9144,49.24,101.15),('S18_3232','1970 Dodge Coronet','Classic Cars','1:18','Min Lin Diecast','1:18 scale replica of the 1970 Dodge Coronet. Hood, doors and trunk all open.',7323,32.37,71.41);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-02 11:25:01
