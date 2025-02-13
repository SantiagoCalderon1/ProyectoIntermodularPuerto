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

    public static function updateTransito(int $embarcacion, int $anyo = 0, string $pantalan = "", string $instalacion = "", $fecha_entrada = "", $fecha_salida = "", string $patron = "", string $datos_estancia = "")
    {
        $conexion = openConexion();
        $dataActualizar = [];
        //si el parametro no esta por defecto, se añade a la actualizacion
        if ($anyo != 0) {
            $dataActualizar[] = "anyo='$anyo'";
        }
        if ($pantalan != "") {
            $dataActualizar[] = "pantalan='$pantalan'";
        }
        if ($instalacion != "") {
            $dataActualizar[] = "instalacion='$instalacion'";
        }
        if ($fecha_entrada != "") {
            $dataActualizar[] = "fecha_entrada='$fecha_entrada'";
        }
        if ($fecha_salida != "") {
            $dataActualizar[] = "fecha_salida='$fecha_salida'";
        }
        if ($patron != "") {
            $dataActualizar[] = "patron='$patron'";
        }
        if ($datos_estancia != "") {
            $dataActualizar[] = "datos_estancia='$datos_estancia'";
        }
        $ssql = "UPDATE `transito` SET " . implode(",", $dataActualizar) . " WHERE embarcacion='$embarcacion'";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}
