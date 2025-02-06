<?php
include_once '../../config/conexion.php';

class Places
{
    private $conexion;

    function __construct()
    {
        $this->conexion = new Connection('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
        // $this->conexion = new Connection('127.0.0.1', 'puerto', '%e2Ta?N>9!6', 'Puerto');
    }

    function showPlace(string $id = '')
    {
        if (is_numeric($id)) {
            $sql = "SELECT * FROM plaza_base WHERE id_plaza_base = '$id'";
            return $this->conexion->dataQuery($sql);
        } else {
            $sql = "SELECT * FROM plaza_base";
            return $this->conexion->dataQuery($sql);
        }
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
        $año = $input['año'];
        $puerto = $input['puerto'];
        $instalacion = $input['instalacion'];
        $fecha_inicio = $input['fecha_inicio'];
        $datos_titular = $input['datos_titular'];
        $datos_embarcacion = $input['datos_embarcacion'];
        $datos_estancia = $input['datos_estancia'];
        $sql = "INSERT INTO plaza_base (anyo, puerto, instalacion, fecha_inicio, datos_titular, datos_embarcacion, datos_estancia) VALUES ( $año, '$puerto', $instalacion, '$fecha_inicio', '$datos_titular', '$datos_embarcacion', '$datos_estancia');";
        return $this->conexion->dataQuery($sql);
    }

    function updatePlace(array $input)
    {

        if (isset($input["id"])) {
            $id = (int) $input["id"];
            $updates = [];
            if (isset($input["año"])) {
                $updates[] = "anyo = " . $input["año"];
            }
            if (isset($input["puerto"])) {
                $updates[] = "puerto = '" . $input["puerto"] . "'";
            }
            if (isset($input["instalacion"])) {
                $updates[] = "instalacion = " . $input["instalacion"];
            }
            if (isset($input["fecha_inicio"])) {
                // "fecha_inicio" => "2025-02-03"
                $updates[] = "fecha_inicio = '" . $input["fecha_inicio"]."'";
            }
            if (isset($input["datos_titular"])) {
                $updates[] = "datos_titular = '" . $input["datos_titular"]."'";
            }
            if (isset($input["datos_embarcacion"])) {
                $updates[] = "datos_embarcacion = '" . $input["datos_embarcacion"]."'";
            }
            if (isset($input["datos_estancia"])) {
                $updates[] = "datos_estancia = '" . $input["datos_estancia"]."'";
            }
            if (count($updates) > 0) {
                $sql = "UPDATE plaza_base SET " . implode(", ", $updates) . " WHERE id_plaza_base = $id";
                
                if ($this->conexion->dataQuery($sql)) {
                    echo json_encode("plaza actualizada con éxito");
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
            echo json_encode("plaza eliminada con éxito");
        } else {
            echo json_encode("Error al eliminar la plaza");
        }
    }
}
