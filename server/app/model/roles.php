<?php
include '../../config/db.php';

class Roles{
    public $idRol;
    public $nombreRol;
    public $descripcionRol;
    // public $funcionalidades = array();

    static public function getAllRoles(string $id = ''){
        $con = conexion();
        if(empty($id)){
            $query = "SELECT * FROM rol";
        } else {
            $query = "SELECT * FROM rol WHERE id_rol = '$id'";
        }
        $result = $con->query($query);
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    static public function modificarRol($idRol, $nombreRol, $descripcionRol){
        $con = conexion();
        $query = "UPDATE rol SET nombre_rol = '$nombreRol', descripcion = '$descripcionRol' WHERE id_rol = $idRol";
        try {
            $result = $con->query($query);
        } catch (Exception $e) {
            echo "Error no se encontró el rol: ". $e->getMessage();
        }
        return $result;
    }

}
?>
