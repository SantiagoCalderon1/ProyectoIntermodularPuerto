<?php
include '../../config/db.php';

class Roles
{
    public $idRol;
    public $nombreRol;
    public $descripcionRol;

    static public function getAllRoles(string $id = '')
    {
        $con = null;
        try {
            $con = conexion();
            if (empty($id)) {
                $query = "SELECT * FROM rol";
            } else {
                $query = "SELECT * FROM rol WHERE id_rol = '$id'";
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

    static public function modificarRol($idRol, $nombreRol, $descripcionRol)
    {
        $con = conexion();
        $query = "UPDATE rol SET nombre_rol = '$nombreRol', descripcion = '$descripcionRol' WHERE id_rol = $idRol";
        try {
            $result = $con->query($query);
        } catch (Exception $e) {
            return "Error no se encontró el rol: " . $e->getMessage();
        } finally {
            closeConexion($con);
        }
        return $result;
    }
}
