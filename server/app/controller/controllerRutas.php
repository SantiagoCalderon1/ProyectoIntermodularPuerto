<?php
include '../model/rutas.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Origin, Authorization, X-Requested-With");

$uri_parts = explode('/', $_SERVER['REQUEST_URI']); // Separamos la URI en partes
$lastpart = $uri_parts[count($uri_parts) - 1];

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        echo json_encode(Rutas::getRuta($lastpart));
        break;
}
?>