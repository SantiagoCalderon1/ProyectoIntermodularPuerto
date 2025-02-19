<?php
include_once "../../config/conexion.php";
class Instalacion
{
    public int $id_instalacion;
    public string $codigo;
    public string $puerto;
    public string $descripcion;
    public string $tipo_instalacion;
    public $fecha_disposicion;
    public $estado;
    //funcion para obtener todas las intalaciones
    public static function getInstalaciones($id = "")
    {
        if ($id != "") {
            $ssql = "SELECT * FROM `instalacion` WHERE `id_instalacion`='$id'";
        } else {
            $ssql = "SELECT * FROM `instalacion`";
        }
        $conexion = openConexion();
        $resultado = $conexion->query($ssql);
        return $resultado;
    }
    //funcion para crear nuevas instalaciones, devuelve true(todo fue bien) o false(algo fallo)
    public static function crearInstalacion(string $codigo, string $puerto, string $descripcion, string $tipo_instalacion, $fecha_disposicion, $estado)
    {
        if ($estado) {
            $estado = 1;
        } else {
            $estado = 0;
        }
        $conexion = openConexion();
        $ssql = "INSERT INTO `instalacion` (`codigo`, `descripcion`, `fecha_disposicion`, `estado`, `puerto`, `tipo_instalacion`) VALUES ('$codigo', '$descripcion', '$fecha_disposicion', '$estado', '$puerto', '$tipo_instalacion')";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    //funcion para eliminar instalaciones, devuelve true(todo fue bien) o false(algo fallo)
    public static function eliminarInstalacion($id)
    {
        $conexion = openConexion();
        $ssql = "DELETE FROM `instalacion` WHERE `id_instalacion`=$id";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
    //funcion para actualizar instalaciones, pasamos por parametro el id(obligatorio) y el resto de datos como opcionales (se pueden actualizar o no), devuelve true(todo fue bien) o false(algo fallo)
    public static function actualizarInstalaciones($id, string $codigo = "", string $puerto = "", string $descripcion = "", string $tipo_instalacion = "", $fecha_disposicion = "", $estado = "")
    {
        $conexion = openConexion();
        $dataActualizar = [];
        //si el parametro no esta por defecto, se añade a la actualizacion
        if ($codigo != "") {
            $dataActualizar[] = "codigo='$codigo'";
        }
        if ($puerto != "") {
            $dataActualizar[] = "puerto='$puerto'";
        }
        if ($descripcion != "") {
            $dataActualizar[] = "descripcion='$descripcion'";
        }
        if ($tipo_instalacion != "") {
            $dataActualizar[] = "tipo_instalacion='$tipo_instalacion'";
        }
        if ($fecha_disposicion != "") {
            $dataActualizar[] = "fecha_disposicion='$fecha_disposicion'";
        }
        if ($estado != "") {
            $dataActualizar[] = "estado='$estado'";
        }
        $ssql = "UPDATE `instalacion` SET " . implode(",", $dataActualizar) . " WHERE id_instalacion='$id'";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
}
