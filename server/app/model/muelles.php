<?php
include '../../config/conexion.php';

class Muelles
{
    static public function getAllMuelles(string $id = '')
    {
        $con = null;
        try {
            $con = openConexion();
            if (empty($id)) {
                $query = "SELECT * FROM muelle";
            } else {
                $query = "SELECT * FROM muelle WHERE id_muelle = '$id'";
            }
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

    static public function agregarMuelle(string $nombreMuelle, string $descripcion, int $ocupado){
        $con = openConexion();
        if (empty($nombreMuelle) || empty($descripcion)) {
            return false;
        }
        $query = "INSERT INTO muelle (nombre_muelle, descripcion, ocupado) VALUES ('$nombreMuelle', '$descripcion', $ocupado)";
        try {
            $result = $con->query($query);
        } catch (Exception $e) {
            return "Error al agregar el muelle: " . $e->getMessage();
        } finally {
            closeConexion($con);
        }
        return $result;
    }

    static public function eliminarMuelle(int $id){
        $con = openConexion();
        $query = "DELETE FROM muelle WHERE id_muelle = $id";
        try {
            $result = $con->query($query);
        } catch (Exception $e) {
            return "Error al eliminar el muelle: ". $e->getMessage();
        } finally {
            closeConexion($con);
        }
        return $result;
    }

    static public function modificarMuelle(int $id, string $nombreMuelle, string $descripcion, int $ocupado)
    {
        $con = openConexion();
        if (empty($nombreMuelle) || empty($descripcion)) {
            return false;
        }
        $query = "UPDATE muelle SET nombre_muelle = '$nombreMuelle', descripcion = '$descripcion', ocupado = $ocupado WHERE id_muelle = $id";
        try {
            $result = $con->query($query);
        } catch (Exception $e) {
            return "Error no se encontró el muelle: " . $e->getMessage();
        } finally {
            closeConexion($con);
        }
        return $result;
    }
}
