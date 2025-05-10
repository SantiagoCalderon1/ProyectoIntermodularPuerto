<?php
include '../model/muelles.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With");

$uri_parts = explode('/', $_SERVER['REQUEST_URI']); // Separamos la URI en partes
$lastpart = $uri_parts[count($uri_parts) - 1]; // Obtenemos el último elemento de la URI
$input = json_decode(file_get_contents('php://input'), true); // Obtenemos los datos del cuerpo de la petición en formato JSON

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (is_numeric($lastpart)) {
            echo json_encode(["data" => Muelles::getAllMuelles($lastpart)]);
        } else {
            echo json_encode(["data" => Muelles::getAllMuelles()]);
        }
        break;
    case'POST':
        $respuesta = Muelles::agregarMuelle($input['nombre_muelle'], $input['descripcion'], $input['ocupado']);
        if ($respuesta) {
            echo json_encode(
                [
                    'success' => true,
                    'message' => 'Muelle agregado con éxito',
                    'data' => $respuesta
                ]
            );           
        } else {
            echo json_encode(
                [
                    'success' => false,
                    'message' => 'Error al procesar los datos',
                    'error' => $respuesta
                ]
            );
        }
        break;
    case 'PUT':
        $respuesta = Muelles::modificarMuelle($lastpart, $input['nombre_muelle'], $input['descripcion'], $input['ocupado']);
        if ($respuesta) {
            echo json_encode(
                [
                    'success' => true,
                    'message' => 'Muelle actualizado con éxito',
                    'data' => $respuesta
                ]
            );
        } else {
            echo json_encode(
                [
                    'success' => false,
                    'message' => 'Error al procesar los datos',
                    'error' => $respuesta
                ]
            );
        }
        break;
    case 'DELETE':
        $respuesta = Muelles::eliminarMuelle($lastpart);
        if ($respuesta) {
            echo json_encode(
                [
                    'success' => true,
                    'message' => 'Muelle eliminado con éxito',
                    'data' => $respuesta
                ]
            );
        } else {
            echo json_encode(
                [
                    'success' => false,
                    'message' => 'Error al procesar los datos',
                    'error' => $respuesta
                ]
            );
        }
        break;
}
