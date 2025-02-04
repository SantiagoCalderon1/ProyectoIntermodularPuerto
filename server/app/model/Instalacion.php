<?php
include_once "./bd.php";
class Instalacion
{
    public int $id_instalacion;
    public string $codigo;
    public string $puerto;
    public string $descripcion;
    public string $tipo_instalacion;
    public $fecha_disposicion;
    public $estado;
    public $embarcacion_menores;
    //funcion para obtener todas las intalaciones
    public static function getInstalaciones()
    {
        $conexion = conexion();
        $ssql = "SELECT * FROM `instalacion`";
        $resultado = $conexion->query($ssql);
        return $resultado;
    }
    //funcion para crear nuevas instalaciones, devuelve true(todo fue bien) o false(algo fallo)
    public static function crearInstalacion(string $codigo, string $puerto, string $descripcion, string $tipo_instalacion, $fecha_disposicion, $estado, $embarcacion_menores)
    {
        $conexion = conexion();
        $ssql = "INSERT INTO `instalacion` (`codigo`, `descripcion`, `fecha_disposicion`, `estado`, `puerto`) VALUES ('$codigo', '$descripcion', '$fecha_disposicion', '$estado', '$puerto')";
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
        $conexion = conexion();
        $ssql = "";
        $resultado = $conexion->query($ssql);
        if ($resultado && $conexion->affected_rows > 0) {
            return true;
        } else {
            return false;
        }
    }
//funcion para actualizar instalaciones, pasamos por parametro el id(obligatorio) y el resto de datos como opcionales (se pueden actualizar o no), devuelve true(todo fue bien) o false(algo fallo)
    public static function actualizarInstalaciones($id, string $codigo = "", string $puerto = "", string $descripcion = "", string $tipo_instalacion = "", $fecha_disposicion = "", $estado = "", $embarcacion_menores = "")
    {
        $conexion = conexion();
        $dataActualizar = [];
        //si el parametro no esta por defecto, se añade a la actualizacion
        if($codigo != ""){
            $dataActualizar[] = "codigo='$codigo'";
        }
        if($puerto != ""){
            $dataActualizar[] = "codigo='$puerto'";
        }
        if($descripcion != ""){
            $dataActualizar[] = "codigo='$descripcion'";
        }
        if($tipo_instalacion != ""){
            $dataActualizar[] = "codigo='$tipo_instalacion'";
        }
        if($fecha_disposicion != ""){
            $dataActualizar[] = "codigo='$fecha_disposicion'";
        }
        if($estado != ""){
            $dataActualizar[] = "codigo='$estado'";
        }
        if($embarcacion_menores != ""){
            $dataActualizar[] = "codigo='$embarcacion_menores'";
        }
        $ssql = "UPDATE `tablaNombre` SET " . implode(",", $dataActualizar) ." WHERE id='$id'";
        $resultado = $conexion->query($ssql);
        if($resultado && $conexion->affected_rows > 0){
            return true;
        }else{
            return false;
        }
    }


}
