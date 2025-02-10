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
    if (end($uri) === "inst") {
        $products = $db->showInstalations();
        echo json_encode($products);
        
    } else {
        $products = $db->showPlace(end($uri));
        $res = [];
        foreach ($products as $product) {
            $cod = $db->showInstalacionByPlace($product["instalacion"]);
            $product["instalacion"] = $cod[0]["codigo"];
            $res[] = $product;
        }

        echo json_encode($res);
    }
}

function handlePost($db, $data)
{
    // $data = [
    //     "año" => "2023",
    //     "puerto" => "Puerto de Barcelona",
    //     "instalacion" => "ej",
    //     "fecha_inicio" => "2025-03-02",
    //     "datos_titular" => "Juan Pérez",
    //     "datos_embarcacion" => "Embarcación Azul",
    //     "datos_estancia" => "Estancia prolongada"
    // ];
    if ($db->insertNewPlace($data)) {
        echo json_encode("OK");
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
