-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 29 2021 г., 17:59
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `user_emails`
--

-- --------------------------------------------------------

--
-- Структура таблицы `emails`
--

CREATE TABLE `emails` (
  `id` int NOT NULL,
  `email` text COLLATE utf8mb4_general_ci NOT NULL,
  `date` varchar(256) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `emails`
--

INSERT INTO `emails` (`id`, `email`, `date`) VALUES
(38, '22313_22_san@example.om', '2021-04-28 00:52:55.138'),
(39, '2_san@example.om', '2021-04-28 00:52:58.670'),
(40, '2_sasdfn@example.om', '2021-04-28 00:55:01.808'),
(41, 'sdf2_sasdfn@example.om', '2021-04-28 00:55:05.646'),
(42, 'sdfsdf2_sasdfn@example.om', '2021-04-28 00:55:09.135'),
(43, 'sdfsdf2_saasdsdfn@example.om', '2021-04-28 00:55:59.049'),
(44, 'sasddfsdf2_saasdsdfn@example.om', '2021-04-28 00:56:01.943'),
(48, '324_123saasdsdfn@gmail.om', '2021-04-29 13:59:43.756'),
(49, '324_123111saasdsdfn@gmail.om', '2021-04-29 13:59:46.933'),
(50, '234sdsdfn@mail.ru', '2021-04-29 14:00:02.983'),
(51, 'vladfn@mail.ru', '2021-04-29 14:00:08.481'),
(52, 'vlad333fn@mail.ru', '2021-04-29 14:00:12.401'),
(53, '11333fn@mail.ru', '2021-04-29 14:00:16.049');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `emails`
--
ALTER TABLE `emails`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `emails`
--
ALTER TABLE `emails`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
