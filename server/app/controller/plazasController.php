<?php
include_once '../model/plazasModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Places();
$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = explode("/", trim($_SERVER["REQUEST_URI"]));
$requestBody = json_decode(file_get_contents("php://input"), true);

switch ($requestMethod) {
    case "GET":
        handleGet($db, $requestUri);
        break;
    case "POST":
        handlePost($db, $requestBody);
        break;
    case "PUT":
    case "PATCH":
        handlePut($db, $requestBody);
        break;
    case "DELETE":
        handleDelete($db, $requestBody);
        break;
    default:
        echo json_encode("Método no permitido");
        break;
}

function handleGet($db, $uri)
{
    $products = $db->showPlace(end($uri));
    echo json_encode($products);
}

function handlePost($db, $data)
{
    echo json_encode($data);
    if ($db->insertNewPlace($data)) {
        echo json_encode("Producto creado con exito");
    } else {
        echo json_encode("Error al crear el producto");
    }
}

function handlePut($db, $data)
{
    $db->updatePlace($data);
}

function handleDelete($db, $data)
{
    if (isset($data["id"])) {
        $id = (int) $data["id"];
        $db->deletePlace($id);
    } else {
        echo json_encode("ID no proporcionado");
    }
}
