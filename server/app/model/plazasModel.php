<?php
include_once '../../config/conexionDaniel.php';

class Places
{
    private $conexion;

    function __construct()
    {
        //url local
        $this->conexion = new Connection('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
        
        //$this->conexion = new Connection('127.0.0.1', 'puerto', '%e2Ta?N>9!6', 'Puerto');
    }

    function showPlace(string $id = '')
    {
        if (is_numeric($id)) {
            $sql = "SELECT * FROM plaza_base WHERE id_plaza_base = '$id'";
            return $this->conexion->dataQuery($sql);
        } else {
            $sql = "SELECT * FROM plaza_base ORDER BY instalacion";
            return $this->conexion->dataQuery($sql);
        }
    }

    function showInstalations()
    {
        $sql = "SELECT codigo FROM instalacion";
        return $this->conexion->dataQuery($sql);
    }

    function showInstalacionByPlace(string $id = '')
    {
        if (is_numeric($id)) {
            $sql = "SELECT codigo FROM instalacion WHERE id_instalacion = '$id'";
            return $this->conexion->dataQuery($sql);
        } else {
            $sql = "SELECT * FROM plaza_base";
            return $this->conexion->dataQuery($sql);
        }
    }


    function insertNewPlace(array $input)
    {
        $nombre = $input['nombre'];
        $instalacion = $input['instalacion'];/* nombre instalacion */

        $sql = "SELECT id_instalacion FROM instalacion WHERE codigo = '$instalacion'";
        $instalacion = $this->conexion->dataQuery($sql)[0]['id_instalacion'];

        $sql = "INSERT INTO plaza_base (nombre, instalacion) VALUES ('$nombre', $instalacion);";
        return $this->conexion->dataQuery($sql);
    }

    function updatePlace(array $input)
    {

        if (isset($input["id_plaza_base"])) {
            $id = (int) $input["id_plaza_base"];
            $updates = [];
            if (isset($input["instalacion"])) {
                $instalacion = $input["instalacion"];
                $sql = "SELECT id_instalacion FROM instalacion WHERE codigo = '$instalacion'";
                $instalacion = $this->conexion->dataQuery($sql)[0]['id_instalacion'];
                $updates[] = "instalacion = " . $instalacion;
            }
            if (isset($input["nombre"])) {
                $updates[] = "nombre = '" . $input["nombre"] . "'";
            }
            if (count($updates) > 0) {
                $sql = "UPDATE plaza_base SET " . implode(", ", $updates) . " WHERE id_plaza_base = $id";

                if ($this->conexion->dataQuery($sql)) {
                    echo json_encode("OK");
                } else {
                    echo json_encode("Error al actualizar la plaza");
                }
            } else {
                echo json_encode("No se proporcionaron datos para actualizar");
            }
        } else {
            echo json_encode("ID no proporcionado");
        }
    }

    function deletePlace(string $id)
    {
        $sql = "DELETE FROM plaza_base WHERE id_plaza_base = $id";
        if ($this->conexion->dataQuery($sql)) {
            echo json_encode("OK");
        } else {
            echo json_encode("Error al eliminar la plaza");
        }
    }
}
