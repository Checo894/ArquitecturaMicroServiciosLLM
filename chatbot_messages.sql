-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 20:31:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chatbot_messages`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `role` enum('user','assistant') NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `messages`
--

INSERT INTO `messages` (`id`, `userId`, `role`, `content`, `timestamp`) VALUES
(21, 14, 'user', 'Hola!', '2024-06-11 18:27:52'),
(22, 14, 'assistant', '¡Hola! ¿En qué puedo ayudarte hoy?', '2024-06-11 18:27:54'),
(23, 14, 'user', 'Háblame acerca de Halo', '2024-06-11 18:28:06'),
(24, 14, 'assistant', '¡Claro! Halo es una famosa franquicia de videojuegos desarrollada por Bungie Studios y publicada por Microsoft Studios. El primer juego de la serie, \"Halo: Combat Evolved\", fue lanzado en 2001 como título de lanzamiento para la consola Xbox y fue un gran éxito tanto comercial como de crítica.\n\nLa serie Halo se centra en un conflicto intergaláctico entre la humanidad y varias razas alienígenas, principalmente los Covenant y los Flood. Los juegos se caracterizan por su jugabilidad de disparos en primera persona, una historia épica y bien desarrollada, un vasto universo de ciencia ficción y personajes icónicos como el Jefe Maestro, el Spartan supersoldado principal de la serie.\n\nHalo ha sido aclamado por su jugabilidad, gráficos impresionantes, diseño de niveles creativos y una rica y convincente narrativa. Además de la serie principal de juegos, Halo ha generado spin-offs, libros, cómics y series de animación para expandir aún más su universo.\n\nEn resumen, Halo es una de las franquicias más icónicas y exitosas en la historia de los videojuegos y ha dejado una marca indeleble en la cultura pop y en la industria del entretenimiento.', '2024-06-11 18:28:11'),
(25, 14, 'user', 'Cuál es su situación actualmente?', '2024-06-11 18:28:39'),
(26, 14, 'assistant', 'Actualmente, la franquicia Halo sigue siendo muy relevante en la industria de los videojuegos. El último título principal de la serie, \"Halo Infinite\", fue lanzado en diciembre de 2021 y recibió críticas mixtas, pero sigue siendo un pilar importante en la historia de la franquicia.\n\nAdemás del juego principal, la serie Halo ha seguido expandiéndose a través de diferentes medios. Se han lanzado nuevos libros, cómics y series de animación para explorar aún más el rico universo de la franquicia. También se está trabajando en una serie de televisión de acción real que se espera que se estrene próximamente.\n\nMicrosoft ha confirmado que Halo Infinite será el comienzo de una nueva era para la franquicia, con planes para continuar expandiendo y evolucionando la serie en el futuro. Con una gran base de fanáticos leales y una narrativa intrigante, Halo seguirá siendo una fuerza dominante en la industria de los videojuegos en los próximos años.', '2024-06-11 18:28:42'),
(27, 15, 'user', 'Qué son los metroidvanias?', '2024-06-11 18:29:36'),
(28, 15, 'assistant', 'Los metroidvanias son un subgénero de videojuegos que combinan elementos de los juegos de plataformas y de exploración de mundo abierto. El nombre \"metroidvania\" proviene de la combinación de dos juegos icónicos que sentaron las bases del género: Metroid y Castlevania.\n\nEn los metroidvanias, los jugadores controlan a un personaje que debe explorar un extenso mundo interconectado, superar obstáculos y desafíos, adquirir nuevas habilidades y mejorar su equipamiento para progresar en la historia. A medida que avanzan, los jugadores descubren áreas ocultas, secretos y atajos que solo son accesibles al adquirir ciertas habilidades o elementos clave.\n\nLos metroidvanias suelen ofrecer una sensación de exploración y descubrimiento, permitiendo a los jugadores regresar a áreas previamente visitadas con nuevas habilidades para desbloquear rutas alternativas. También suelen tener jefes desafiantes y una narrativa inmersiva que se va desarrollando a medida que el jugador avanza en el juego.\n\nAlgunos ejemplos populares de juegos metroidvanias incluyen Hollow Knight, Ori and the Blind Forest, Axiom Verge, Guacamelee, Symphony of the Night (de la serie Castlevania) y Super Metroid. Este subgénero ha ganado mucha popularidad en los últimos años debido a su enfoque en la exploración, la progresión no lineal y la jugabilidad desafiante.', '2024-06-11 18:29:43');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `llm`.`user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
