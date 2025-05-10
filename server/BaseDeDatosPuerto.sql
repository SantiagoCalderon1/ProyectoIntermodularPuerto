-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 09-02-2025 a las 22:14:05
-- Versión del servidor: 8.0.41-0ubuntu0.24.04.1
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
  `id_funcionalidad` int NOT NULL,
  `nombre_funcionalidad` varchar(25) DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `funcionalidad`
--

INSERT INTO `funcionalidad` (`id_funcionalidad`, `nombre_funcionalidad`, `Descripcion`) VALUES
(0, 'sinFuncionalidad', 'Usuario pendiente por registrar'),
(1, 'Visualizar', 'Funcionalidad que te permite visualizar el contenido'),
(2, 'Registrar', 'Funcionalidad que te permite registrar nuevos datos'),
(3, 'Modificar', 'Funcionalidad que te permite modificar nuevos datos'),
(4, 'Eliminar', 'Funcionalidad que te permite eliminar nuevos datos'),
(5, 'Control Total', 'Funcionalidad que  te permitirá hacer todo lo que desees');

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
  `puerto` varchar(25) NOT NULL,
  `tipo_instalacion` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `instalacion`
--

INSERT INTO `instalacion` (`id_instalacion`, `codigo`, `descripcion`, `fecha_disposicion`, `estado`, `puerto`, `tipo_instalacion`) VALUES
(2, 'INST002', 'Instalación secundaria en planta 2', '2025-01-15', 0, 'COM2', 'Hidráulica'),
(3, 'INST003', 'Instalación de emergencia', '2025-02-01', 1, 'COM3', 'Gas'),
(4, 'INST004', 'Instalación para oficina de tecnología', '2025-02-10', 1, 'COM4', 'Eléctrica'),
(5, 'INST005', 'Instalación para servidores de red', '2025-03-01', 0, 'COM5', 'Red'),
(6, 'INST006', 'Instalación en almacén de productos', '2025-03-15', 1, 'COM6', 'Climatización'),
(7, 'INST007', 'Instalación en planta de producción', '2025-04-01', 1, 'COM7', 'Gas'),
(8, 'INST008', 'Instalación en centro de operaciones', '2025-04-10', 0, 'COM8', 'Eléctrica'),
(9, 'INST009', 'Instalación en área de pruebas', '2025-05-01', 1, 'COM9', 'Red'),
(10, 'INST010', 'Instalación en oficina administrativa', '2025-05-15', 0, 'COM10', 'Hidráulica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plaza_base`
--

CREATE TABLE `plaza_base` (
  `anyo` int NOT NULL,
  `puerto` varchar(25) NOT NULL,
  `instalacion` int NOT NULL COMMENT 'FK, id_instalacion',
  `fecha_inicio` date NOT NULL,
  `datos_titular` varchar(25) NOT NULL,
  `datos_embarcacion` varchar(200) NOT NULL,
  `datos_estancia` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `plaza_base`
--

INSERT INTO `plaza_base` (`anyo`, `puerto`, `instalacion`, `fecha_inicio`, `datos_titular`, `datos_embarcacion`, `datos_estancia`) VALUES
(2025, 'COM2', 2, '2025-01-15', 'María García', 'Embarcación B456', 'Estancia de 6 meses'),
(2025, 'COM3', 3, '2025-02-01', 'Pedro López', 'Embarcación C789', 'Estancia de 3 meses'),
(2025, 'COM4', 4, '2025-02-10', 'Lucía Martín', 'Embarcación D012', 'Estancia de 9 meses'),
(2025, 'COM5', 5, '2025-03-01', 'Carlos Méndez', 'Embarcación E345', 'Estancia de 6 meses'),
(2025, 'COM6', 6, '2025-03-15', 'Sofía Hernández', 'Embarcación F678', 'Estancia de 8 meses'),
(2025, 'COM7', 7, '2025-04-01', 'Daniel Rodríguez', 'Embarcación G901', 'Estancia de 5 meses'),
(2025, 'COM8', 8, '2025-04-10', 'Isabel Gómez', 'Embarcación H234', 'Estancia de 7 meses'),
(2025, 'COM9', 9, '2025-05-01', 'Jorge Fernández', 'Embarcación I567', 'Estancia de 10 meses'),
(2025, 'COM10', 10, '2025-05-15', 'Alba Quintero', 'Embarcación J890', 'Estancia de 4 meses');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int NOT NULL,
  `nombre_rol` varchar(25) NOT NULL,
  `descripcion` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `nombre_rol`, `descripcion`) VALUES
(0, 'sinRol', 'usuario pendiente por registrar'),
(1, 'policia_aduanas', 'CONSULTAR un historial de movimientos que se realizan en uno o varios puertos\r\nCONSULTAR las plazas base y/o tránsitos de uno o varios puertos\r\nCONSULTAR las embarcaciones que ocupan u ocuparon una plaza base y/o tránsito de uno o varios puertos\r\nCONSULTAR los datos de los tripulantes de una o varias embarcaciones\r\nCONSULTAR los guarda-muelles de una o varios puertos\r\nCONSULTAR los detalles de uno o varios puertos\r\nCONSULTAR todos los muelles de uno o varios puertos'),
(2, 'guarda_muelles', 'CONSULTAR las plazas base y/o tránsitos del muelle\r\nCONSULTAR los muelles/pantalán del puerto\r\nAÑADIR UNA RESERVA a una plaza base y/o tránsito DISPONIBLE\r\nELIMINAR o FINALIZAR la reserva ACTIVA de una plaza base y/o tránsito del muelle\r\nREGISTRAR, ELIMINAR, MODIFICAR el/los clientes de una reserva\r\nMODIFICAR (estado y/o propietario) de las plazas base y/o tránsito del muelle\r\nREGISTRAR, ELIMINAR , MODIFICAR y CONSULTAR las embarcaciones que ocupen una plaza base y/o tránsito del muelle\r\nASIGNAR, ELIMINAR, MODIFICAR y CONSULTAR los datos de los tripulantes de una embarcación de TRÁNSITO'),
(3, 'gerencia_puerto', 'REGISTRAR, ELIMINAR, MODIFICAR y CONSULTAR los clientes que han embarcado en el puerto\r\nREGISTRAR, ELIMINAR, MODIFICAR y CONSULTAR de un o varios tripulantes de un puerto\r\nREGISTRAR, ELIMINAR, MODIFICAR y CONSULTAR los guarda-muelles del puerto\r\nREGISTRAR, ELIMINAR, MODIFICAR y CONSULTAR las plazas base y/o tránsitos del puerto\r\nREGISTRAR, ELIMINAR, MODIFICAR y CONSULTAR uno o varios muelles del puerto'),
(4, 'administrador', 'CONTROL TOTAL de todo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_funcionalidad`
--

CREATE TABLE `rol_funcionalidad` (
  `id_rol` int NOT NULL,
  `id_funcionalidad` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `rol_funcionalidad`
--

INSERT INTO `rol_funcionalidad` (`id_rol`, `id_funcionalidad`) VALUES
(1, 1),
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(3, 1),
(3, 5),
(4, 5),
(0, 0);

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
  `password` varchar(50) NOT NULL,
  `idioma` varchar(15) NOT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1=TRUE, 0=FALSE',
  `rol` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`usuario`, `nombre`, `email`, `password`, `idioma`, `habilitado`, `rol`) VALUES
('albaquintero', 'Alba Quintero', 'alba.quintero@example.com', 'alba12345', 'Español', 1, 3),
('carlosmendez', 'Carlos Méndez', 'carlos.mendez@example.com', 'carlospass345', 'Español', 1, 2),
('danielrodriguez', 'Daniel Rodríguez', 'daniel.rodriguez@example.com', 'danielpass901', 'Inglés', 0, 1),
('isabelgomez', 'Isabel Gómez', 'isabel.gomez@example.com', 'isabelpass234', 'Inglés', 1, 4),
('jorgefernandez', 'Jorge Fernández', 'jorge.fernandez@example.com', 'jorgepass567', 'Inglés', 1, 2),
('juanperez', 'Juan Pérez', 'juan.perez@example.com', 'juanpass123', 'Español', 1, 2),
('luciamartin', 'Lucía Martín', 'lucia.martin@example.com', 'luciapass012', 'Español', 1, 4),
('mariagarcia', 'María García', 'maria.garcia@example.com', 'mariapass456', 'Español', 1, 3),
('pedrolopez', 'Pedro López', 'pedro.lopez@example.com', 'pedropass789', 'Español', 0, 1),
('sofiahernandez', 'Sofía Hernández', 'sofia.hernandez@example.com', 'sofiapass678', 'Español', 1, 3);

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
  MODIFY `id_funcionalidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `instalacion`
--
ALTER TABLE `instalacion`
  MODIFY `id_instalacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
