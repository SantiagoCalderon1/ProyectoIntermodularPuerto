<?php
include_once "../../config/conexion.php";
class Transito
{

    public static function getTodosTransitos()
    {
        $conexion = openConexion();
        $ssql = "SELECT * FROM `transito`";
        $resultado = $conexion->query($ssql);
        if ($conexion) {
            closeConexion($conexion);
        }
        return $resultado;
    }

    public static function getTransito(int $embarcacion)
    {
        $conexion = openConexion();
        $ssql = "SELECT * FROM `transito` WHERE `embarcacion`='$embarcacion'";
        $resultado = $conexion->query($ssql);
        if ($conexion) {
            closeConexion($conexion);
        }
        return $resultado;
    }

    public static function deleteTransito(int $embarcacion)
    {
        $conexion = openConexion();
        $ssql = "DELETE FROM `transito` WHERE embarcacion=$embarcacion";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
        if ($conexion) {
            closeConexion($conexion);
        }
    }

    public static function agregarTransito(int $anyo, string $pantalan, string $instalacion, $fecha_entrada, $fecha_salida, string $patron, string $datos_estancia)
    {
        $conexion = openConexion();
        $ssql = "INSERT INTO `transito` (`anyo`,`pantalan`,`instalacion`,`fecha_entrada`,`fecha_salida`,`patron`,`datos_estancia`) VALUES ('$anyo','$pantalan','$instalacion','$fecha_entrada','$fecha_salida','$patron','$datos_estancia')";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
        if ($conexion) {
            closeConexion($conexion);
        }
    }
}
