<?
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

    public static function devolver(array $n_facturas)
    {
        $conexion = openConexion();
        $errores = 0;

        foreach ($n_facturas as $numFactura) {
            $ssql = "UPDATE `recibos` SET devuelto=1 WHERE n_factura='$numFactura'";
            $respuesta = $conexion->query($ssql);

            if (!$respuesta || $conexion->affected_rows == 0) {
                $errores++;
            }
        }

        closeConexion($conexion);

        // Si hubo errores, devolvemos false, si todo fue bien, true.
        return $errores == 0;
    }


}

?>