<?php
include_once '../../config/conexionDaniel.php';

class Facturas
{
    private $conexion;

    function __construct()
    {
        // Conexión local
        $this->conexion = new Connection('127.0.0.1', 'root', 'root', 'Puerto', 8889);
    }

    function showFactura($id)
    {
        if (is_numeric($id)) {
            $sql = "SELECT * FROM facturas WHERE num_factura = '$id'";
            return $this->conexion->dataQuery($sql);
        } else {
            $sql = "SELECT * FROM facturas";
            return $this->conexion->dataQuery($sql);
        }
    }

    function insertNewFactura($input)
    {
        $num_factura = $input['num_factura'];
        $nif_cliente = $input['nif_cliente'];
        $id_reserva = (int)$input['id_reserva'];
        $fecha_expedicion = $input['fecha_expedicion'];
        $fecha_vencimiento = $input['fecha_vencimiento'];
        $base_imponible = (float)$input['base_imponible'];
        $dias = (int)$input['dias'];
        $precio_unitario = (float)$input['precio_unitario'];
        $precio = (float)$input['precio'];
        $tipo_iva = (int)$input['tipo_iva'];
        $tipo_irpf = (int)$input['tipo_irpf'];
        $total = (float)$input['total'];

        $sql = "INSERT INTO facturas (num_factura, nif_cliente, id_reserva, fecha_expedicion, fecha_vencimiento, base_imponible, dias, precio_unitario, precio, tipo_iva, tipo_irpf, total) 
                VALUES ('$num_factura', '$nif_cliente', $id_reserva, '$fecha_expedicion', '$fecha_vencimiento', $base_imponible, $dias, $precio_unitario, $precio, $tipo_iva, $tipo_irpf, $total)";

        return $this->conexion->dataQuery($sql);
    }

    function updateFactura($input)
    {
        if (!isset($input["num_factura"])) {
            echo json_encode("Número de factura no proporcionado");
            return;
        }
        
        $num_factura = $input["num_factura"];
        $updates = [];
        
        foreach ($input as $key =>   $value) {
            if ($key !== "num_factura") {
                if (is_numeric($value)) {
                    $updates[] = "$key = $value";
                } else {
                    $updates[] = "$key = '$value'";
                }
            }
        }
        
        if (count($updates) > 0) {
            $sql = "UPDATE facturas SET " . implode(", ", $updates) . " WHERE num_factura = '$num_factura'";
            
            if ($this->conexion->dataQuery($sql)) {
                echo json_encode("OK");
            } else {
                echo json_encode("Error al actualizar la factura");
            }
        } else {
            echo json_encode("No se proporcionaron datos para actualizar");
        }
    }

    function deleteFactura($num_factura)
    {
        $sql = "DELETE FROM facturas WHERE num_factura = '$num_factura'";
        if ($this->conexion->dataQuery($sql)) {
            echo json_encode("OK");
        } else {
            echo json_encode("Error al eliminar la factura");
        }
    }
}
