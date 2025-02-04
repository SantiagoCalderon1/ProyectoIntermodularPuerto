<?php
include_once '../../config/conexion.php';

abstract class places
{
    static function showPlace(string $id = '')
    {
        $conexion = null;
        $conexion = openConnection();
        if (!empty($id)) {
            $sql = "SELECT * FROM places WHERE id = '$id'";
            $res = $conexion->query($sql);
            $resArray = array();
            if ($res) {
                $resArray = $res->fetch_all(MYSQLI_ASSOC);
            }
        } else {
            $sql = "SELECT * FROM places;";
            $res = $conexion->query($sql);
            $resArray = $res->fetch_all(MYSQLI_ASSOC);
        }
        return $resArray;
    }

    static function insertNewPlace(array $input)
    {
        $id = $input['id'];
        $puerto = $input['puerto'];
        $instalacion = $input['instalacion'];
        $fecha_inicio = $input['fecha_inicio'];
        $titular = $input['titular'];
        $fecha_fin = $input['fecha_fin'];
        $nombre_embarcacion = $input['nombre_embarcacion'];
        $conexion = null;
        $conexion = openConnection();
        $sql = "INSERT INTO places (id, puerto, instalacion, fecha_inicio, titular, fecha_fin, nombre_embarcacion) VALUES ( $id, $puerto, $instalacion, $fecha_inicio, $titular, $fecha_fin, $nombre_embarcacion);";
        return $conexion->query($sql);
    }

    static function updatePlace(array $input)
    {
        $conexion = null;
        $conexion = openConnection();
        if (isset($input["id"])) {
            $id = (int) $input["id"];
            $updates = [];
            if (isset($input["puerto"])) {
                $updates[] = "puerto = '" . $input["puerto"] . "'";
            }
            if (isset($input["instalacion"])) {
                $updates[] = "instalacion = " . $input["instalacion"];
            }
            if (isset($input["fecha_inicio"])) {
                $updates[] = "fecha_inicio = " . $input["fecha_inicio"];
            }
            if (isset($input["titular"])) {
                $updates[] = "titular = " . $input["titular"];
            }
            if (isset($input["fecha_fin"])) {
                $updates[] = "fecha_fin = " . $input["fecha_fin"];
            }
            if (isset($input["nombre_embarcacion"])) {
                $updates[] = "nombre_embarcacion = " . $input["nombre_embarcacion"];
            }
            if (count($updates) > 0) {
                $sql = "UPDATE plazas SET " . implode(", ", $updates) . " WHERE Id = $id";
                if ($conexion->query($sql)) {
                    echo json_encode("plaza actualizado con éxito");
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
        $conexion = null;
        $conexion = openConnection();
        $sql = "DELETE FROM places WHERE Id = $id";
        if ($conexion->query($sql)) {
            echo json_encode("plaza eliminado con éxito");
        } else {
            echo json_encode("Error al eliminar la plaza");
        }
    }


































    static function deleteUser(string $username)
    {
        $conexion = null;
        try {
            $conexion = openConnection();
            $sql = "DELETE FROM users WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            return $stmt->execute();
        } catch (Exception $e) {
            //throw $th;
        } finally {
            if ($conexion) {
                closeConnection($conexion);
            }
        }
    }
}
