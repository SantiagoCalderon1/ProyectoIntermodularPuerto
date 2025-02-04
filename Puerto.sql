-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 04-02-2025 a las 16:44:38
-- Versión del servidor: 8.0.40-0ubuntu0.24.04.1
-- Versión de PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Puerto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionalidad`
--

CREATE TABLE `funcionalidad` (
  `id_funcionalidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instalacion`
--

CREATE TABLE `instalacion` (
  `id_instalacion` int NOT NULL,
  `codigo` varchar(10) NOT NULL COMMENT 'E.J: "A3"',
  `descripcion` varchar(200) NOT NULL,
  `fecha_disposicion` date NOT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0=MALO, 1=BUENO',
  `puerto` varchar(25) NOT NULL
) ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plaza_base`
--

CREATE TABLE `plaza_base` (
  `año` int NOT NULL,
  `puerto` varchar(25) NOT NULL,
  `instalacion` int NOT NULL COMMENT 'FK, id_instalacion',
  `fecha_inicio` date NOT NULL,
  `datos_titular` varchar(25) NOT NULL,
  `datos_embarcacion` varchar(200) NOT NULL,
  `datos_estancia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int NOT NULL,
  `nombre_rol` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_funcionalidad`
--

CREATE TABLE `rol_funcionalidad` (
  `id_rol` int NOT NULL,
  `id_funcionalidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transito`
--

CREATE TABLE `transito` (
  `año` int NOT NULL,
  `pantalan` int NOT NULL,
  `instalacion` int NOT NULL COMMENT 'FK, id_instalacion',
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `patron` varchar(25) NOT NULL,
  `embarcacion` int NOT NULL,
  `datos_estancia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(25) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `email` varchar(50) NOT NULL,
  `idioma` varchar(15) NOT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=TRUE, 0=FALSE',
  `rol` int NOT NULL
) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  ADD PRIMARY KEY (`id_funcionalidad`);

--
-- Indices de la tabla `instalacion`
--
ALTER TABLE `instalacion`
  ADD PRIMARY KEY (`id_instalacion`),
  ADD UNIQUE KEY `codigo_unique` (`codigo`);

--
-- Indices de la tabla `plaza_base`
--
ALTER TABLE `plaza_base`
  ADD KEY `fk_plazabase_instalacion-id_instalacion` (`instalacion`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `rol_funcionalidad`
--
ALTER TABLE `rol_funcionalidad`
  ADD KEY `fk_rolfuncionalidades_id_rol_to_id_rol` (`id_rol`);

--
-- Indices de la tabla `transito`
--
ALTER TABLE `transito`
  ADD PRIMARY KEY (`embarcacion`),
  ADD KEY `fk_transito_instalacion_to_id_instalacion` (`instalacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_usuario_rol-rol_id_rol` (`rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  MODIFY `id_funcionalidad` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `instalacion`
--
ALTER TABLE `instalacion`
  MODIFY `id_instalacion` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transito`
--
ALTER TABLE `transito`
  MODIFY `embarcacion` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `plaza_base`
--
ALTER TABLE `plaza_base`
  ADD CONSTRAINT `fk_plazabase_instalacion-id_instalacion` FOREIGN KEY (`instalacion`) REFERENCES `instalacion` (`id_instalacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `rol_funcionalidad`
--
ALTER TABLE `rol_funcionalidad`
  ADD CONSTRAINT `fk_rolfuncionalidades_id_rol_to_id_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `transito`
--
ALTER TABLE `transito`
  ADD CONSTRAINT `fk_transito_instalacion_to_id_instalacion` FOREIGN KEY (`instalacion`) REFERENCES `instalacion` (`id_instalacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol-rol_id_rol` FOREIGN KEY (`rol`) REFERENCES `rol` (`id_rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
