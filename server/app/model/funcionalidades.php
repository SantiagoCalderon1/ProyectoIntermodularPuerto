<?php
include '../../config/conexion.php';

class Funcionalidades {

    static public function getAllFuncionalidades(){
        $con = null;
        try {
            $con = openConexion();
            $query = "SELECT * FROM funcionalidad";
            $result = $con->query($query);
            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return "Error: " . $e->getMessage();
        } finally {
            if ($con) {
                closeConexion($con);
            }
        }
    }
}