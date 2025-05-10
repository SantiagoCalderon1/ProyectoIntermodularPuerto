<?php
include '../../config/conexion.php';

class Rutas
{
    static public function getRuta(string $btn = '')
    {
        $con = null;
        try {
            $con = openConexion();
            $query = "SELECT ruta FROM migasPan WHERE ubicacion = '$btn'";
            $result = $con->query($query);
            return $result->fetch_assoc();
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        } finally {
            if ($con) {
                closeConexion($con);
            }
        }
    }
}
