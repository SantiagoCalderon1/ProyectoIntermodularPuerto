<?php
include_once '../../config/conexionDaniel.php';

class Reservations
{
    private $conexion;

    function __construct()
    {
        //url local
        $this->conexion = new Connection('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
        
        //$this->conexion = new Connection('127.0.0.1', 'puerto', '%e2Ta?N>9!6', 'Puerto');
    }

    function showReservation(string $id = '')
    {
        if (is_numeric($id)) {
            $sql = "SELECT * FROM reservas WHERE id_reserva = '$id'";
            return $this->conexion->dataQuery($sql);
        } else {
            $sql = "SELECT * FROM reservas";
            return $this->conexion->dataQuery($sql);
        }
    }

    function insertNewReservation(array $input)
    {
        $plaza = $input['plaza'];
        $titular = $input['titular'];
        $embarcacion = $input['embarcacion'];
        $fecha_ini = $input['fecha_ini'];
        $fecha_fin = $input['fecha_fin'];

        $sql = "INSERT INTO reservas (plaza, titular, embarcacion, fecha_ini, fecha_fin) VALUES ($plaza, $titular, $embarcacion, '$fecha_ini', '$fecha_fin');";
        return $this->conexion->dataQuery($sql);
    }

    function updateReservation(array $input)
    {
        if (isset($input["id_reserva"])) {
            $id = (int) $input["id_reserva"];
            $updates = [];
    
            // Actualización de la plaza
            if (isset($input["plaza"])) {
                $plaza = (int) $input["plaza"];
                $updates[] = "plaza = $plaza";
            }
    
            // Actualización del titular
            if (isset($input["titular"])) {
                $titular = (int) $input["titular"];
                $updates[] = "titular = $titular";
            }
    
            // Actualización de la embarcación
            if (isset($input["embarcacion"])) {
                $embarcacion = (int) $input["embarcacion"];
                $updates[] = "embarcacion = $embarcacion";
            }
    
            // Actualización de la fecha de inicio
            if (isset($input["fecha_ini"])) {
                $fecha_ini = $input["fecha_ini"];
                $updates[] = "fecha_ini = '$fecha_ini'";
            }
    
            // Actualización de la fecha de fin
            if (isset($input["fecha_fin"])) {
                $fecha_fin = $input["fecha_fin"];
                $updates[] = "fecha_fin = '$fecha_fin'";
            }
    
            // Verificar si hay actualizaciones
            if (count($updates) > 0) {
                $sql = "UPDATE reservas SET " . implode(", ", $updates) . " WHERE id_reserva = $id";
    
                // Ejecutar la consulta
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
    


    function deleteReservation(string $id)
    {
        $sql = "DELETE FROM reservas WHERE id_reserva = $id";
        if ($this->conexion->dataQuery($sql)) {
            echo json_encode("OK");
        } else {
            echo json_encode("Error al eliminar la plaza");
        }
    }
}
