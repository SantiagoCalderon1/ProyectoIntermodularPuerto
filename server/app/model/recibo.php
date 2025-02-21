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

    public static function devolver(array $id_recibo)
    {
        $conexion = openConexion();
        $errores = 0;

        foreach ($id_recibo as $recibo) {
            $ssql = "UPDATE `recibos` SET devuelto=1 WHERE id_recibo='$recibo'";
            $respuesta = $conexion->query($ssql);

            if (!$respuesta || $conexion->affected_rows == 0) {
                $errores++;
            }
        }

        closeConexion($conexion);

        // Si hubo errores, devolvemos false, si todo fue bien, true.
        return $errores == 0;
    }

    public static function crearRecibo($n_factura,$fechaHoy){
        $conexion = openConexion();
        $ssql = "INSERT INTO `recibos` (`n_factura`, `fecha_emision`, `devuelto`) VALUES ('$n_factura', '$fechaHoy', '0')";
        $respuesta = $conexion->query($ssql);

        if($respuesta && $conexion->affected_rows > 0){
            return true;
        }else{
            return false;
        }
    }


}

?>