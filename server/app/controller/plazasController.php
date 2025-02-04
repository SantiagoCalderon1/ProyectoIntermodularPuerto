<?php

include '../model/plazasModel.php.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new places();
$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = explode("/", trim($_SERVER["REQUEST_URI"]));
$requestBody = json_decode(file_get_contents("php://input"), true);

$uri = explode('/', $request);
$lastpart = $uri[count($uri) - 1] ?? null;

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
    if (end($uri) === "API.php") {
        /* Todos los productos */
        $products = $db->allProducts();
        echo json_encode($products);
    } elseif (is_numeric(end($uri))) {
        /* Producto por la ip */
        $id = (int) end($uri);
        $product = $db->productById($id);
        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode(["error" => "Producto no encontrado"]);
        }
    } elseif (isset($_GET["id"])) {
        /* Producto por GET */
        $id = (int) $_GET["id"];
        $product = $db->productById($id);
        if ($product) {
            echo json_encode($product);
        } else {
            echo json_encode(["error" => "Producto no encontrado"]);
        }
    } else {
        echo json_encode("Ruta no valida");
    }
}

function handlePost($db, $data)
{
    if (isset($id) && isset($puerto) && isset($instalacion) && isset($fecha_inicio) && isset($titular) && isset($fecha_fin) && isset($nombre_embarcacion)) {
        if ($db->insertNewPlace($data)) {
            echo json_encode("Producto creado con exito");
        } else {
            echo json_encode("Error al crear el producto");
        }
    } else {
        echo json_encode("Datos incompletos/erroneos");
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
