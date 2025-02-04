<?php
header('Content-Type: application/json; charset=utf-8'); // Encabezado JSON
header("Access-Control-Allow-Methods: POST");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include_once "../model/instalacion.php";

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    //recogemos los datos enviados para crear la nueva instalacion
    $codigo = $_POST["codigo"];
    $puerto = $_POST["puerto"];
    $descripcion = $_POST["descripcion"];
    $tipo_instalacion = $_POST["tipo_instalacion"];
    $fecha_disposicion = $_POST["fecha_disposicion"];
    $estado = $_POST["estado"];
    $embarcacion_menores = $_POST["embarcacion_menores"];

    $respuesta = Instalacion::crearInstalacion($codigo, $puerto, $descripcion, $tipo_instalacion, $fecha_disposicion, $estado, $embarcacion_menores);

    if ($respuesta) {
        echo json_encode(["mensaje" => "Instalacion creada correctamente"]);
    } else {
        echo json_encode(["error" => "Error al crear la nueva instalacion"]);
    }
}
