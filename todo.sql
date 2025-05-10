-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 08:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `signup`
--

CREATE TABLE `signup` (
  `id` int(11) NOT NULL,
  `Firstname` varchar(255) NOT NULL,
  `Lastname` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `signup`
--

INSERT INTO `signup` (`id`, `Firstname`, `Lastname`, `Email`, `Password`) VALUES
(1, 'Suba', 'sriram', 'subasriram@gmail.com', '123456'),
(2, 'Sriram', 'heaman', 'sriramheaman@gmail.com', '12345'),
(3, 'Heaman', 'vasudev', 'Heaman@gmail.com', '10092016'),
(5, 'Hafsa', 'hussain', 'Hafsa@gmail.com', '1234567');

-- --------------------------------------------------------

--
-- Table structure for table `taskform`
--

CREATE TABLE `taskform` (
  `id` int(11) NOT NULL,
  `tasktitle` varchar(255) NOT NULL,
  `Assignedto` varchar(255) NOT NULL,
  `Priority` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskform`
--

INSERT INTO `taskform` (`id`, `tasktitle`, `Assignedto`, `Priority`, `status`) VALUES
(1, 'java', 'Suba', 'Low', 'Completed'),
(2, 'Python', 'Heaman', 'High', 'Pending'),
(3, 'HTML', 'Suba', 'High', 'Finished'),
(22, 'Javascript', 'Hafsa', 'Low', 'Completed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `signup`
--
ALTER TABLE `signup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taskform`
--
ALTER TABLE `taskform`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `signup`
--
ALTER TABLE `signup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `taskform`
--
ALTER TABLE `taskform`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
