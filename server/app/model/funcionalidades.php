<?php
include '../../config/db.php';

class Funcionalidades {

    static public function getAllFuncionalidades(){
        $con = null;
        try {
            $con = conexion();
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