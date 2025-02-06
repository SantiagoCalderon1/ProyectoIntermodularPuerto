<?php
    include '../model/roles.php';
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $uri_parts = explode('/', $_SERVER['REQUEST_URI']); // Separamos la URI en partes
    $lastpart = $uri_parts[count($uri_parts) - 1]; // Obtenemos el último elemento de la URI
    $input = json_decode(file_get_contents('php://input'), true); // Obtenemos los datos del cuerpo de la petición en formato JSON

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            if(is_numeric($lastpart)){
                echo json_encode(["data" => Roles::getAllRoles($lastpart)]);
            } else {
                echo json_encode(["data" => Roles::getAllRoles()]);
            }
            break;
        case 'PUT':
            $respuesta = Roles::modificarRol($lastpart, $input['nombre_rol'], $input['descripcion']);
            if ($respuesta) {
                echo json_encode(
                    ['success' => true, 
                    'message' => 'Rol actualizado con éxito'] 
                );
            } else {
                echo json_encode(
                    ['success' => false, 
                    'message' => 'No se encontró la id del rol',
                    'error' => $respuesta]
                );
            }
            break;
    }
?>
