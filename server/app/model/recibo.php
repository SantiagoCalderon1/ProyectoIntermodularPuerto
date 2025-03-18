<?php
include_once "../../config/conexion.php";

class Recibo
{
    public static function getCobros()
    {
        $conexion = openConexion();
        $ssql = "SELECT * FROM `recibos`";
        $respuesta = $conexion->query($ssql);
        if ($respuesta) {
            return $respuesta->fetch_all(MYSQLI_ASSOC);
        } else {
            return false;
        }
    }

    public static function getDevueltos()
    {
        $conexion = openConexion();
        $ssql = "SELECT * FROM `recibos` WHERE devuelto=1";
        $respuesta = $conexion->query($ssql);
        if ($respuesta) {
            return $respuesta->fetch_all(MYSQLI_ASSOC);
        } else {
            return false;
        }
    }

    public static function devolver(string $id_recibo)
    {
        $conexion = openConexion();
        $ssql = "UPDATE `recibos` SET devuelto=1 WHERE id_recibo='$id_recibo'";
        $respuesta = $conexion->query($ssql);
        if (!$respuesta || $conexion->affected_rows == 0) {
            return false;
        }
        return true;
    }

    public static function crearRecibo($n_factura, $fechaHoy)
    {
        $conexion = openConexion();
        $ssql = "INSERT INTO `recibos` (`n_factura`, `fecha_emision`, `devuelto`) VALUES ('$n_factura', '$fechaHoy', '0')";
        $respuesta = $conexion->query($ssql);

        if ($respuesta && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}
