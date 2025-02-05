<?php
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permitir estos headers
header("Content-Type: application/json; charset=utf-8"); // Indicar que la respuesta es JSON

include_once "../model/instalacion.php";

// Verifica si la solicitud es POST
if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    // Obtén los datos JSON del cuerpo de la solicitud
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica si los datos fueron decodificados correctamente
    if ($data) {
        // Recoge los datos del JSON
        $codigo = $data["codigo"];
        $puerto = $data["puerto"];
        $descripcion = $data["descripcion"];
        $tipo_instalacion = $data["tipo_instalacion"];
        $fecha_disposicion = $data["fecha_disposicion"];
        $estado = $data["estado"];
        $embarcacion_menores = $data["embarcacion_menores"];

        $respuesta = Instalacion::crearInstalacion($codigo, $puerto, $descripcion, $tipo_instalacion, $fecha_disposicion, $estado, $embarcacion_menores);

        if ($respuesta) {
            echo json_encode(["mensaje" => "Instalación creada correctamente"]);
        } else {
            echo json_encode(["error" => "Error al crear la nueva instalación"]);
        }
    } else {
        // Si no se pudo decodificar el JSON
        echo json_encode(["error" => "Datos JSON no válidos"]);
    }
}
?>
