<?php
include_once '../model/facturasModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Facturas();
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
    $facturas = $db->showFactura(end($uri));
    echo json_encode($facturas);
}

function handlePost($db, $data)
{
    // $data = [
    //     "num_factura" => "01012025-0001",
    //     "nif_cliente" => "77889900H",
    //     "id_reserva" => 1,
    //     "fecha_expedicion" => "2025-01-01",
    //     "fecha_vencimiento" => "2025-02-01",
    //     "base_imponible" => 1000.50,
    //     "dias" => 30,
    //     "precio_unitario" => 33.35,
    //     "precio" => 1000.50,
    //     "tipo_iva" => 21,
    //     "tipo_irpf" => 15,
    //     "total" => 1210.58
    // ];

    if ($db->insertNewFactura($data)) {
        echo json_encode("OK");
    } else {
        echo json_encode("Error al crear el producto");
    }
}

function handlePut($db, $data)
{
    /* $data = [
        "num_factura" => "01012025-0001",
        "nif_cliente" => "77889900H",
        "id_reserva" => 1,
        "fecha_expedicion" => "2025-01-01",
        "fecha_vencimiento" => "2025-02-25",
        "base_imponible" => 1000.50,
        "dias" => 30,
        "precio_unitario" => 33.35,
        "precio" => 1000.50,
        "tipo_iva" => 21,
        "tipo_irpf" => 15,
        "total" => 1210.58
     ]; */
    $db->updateFactura($data);
}

function handleDelete($db, $data)
{
    if (isset($data["id"])) {
        $id = (int) $data["id"];
        $db->deleteFactura($id);
    } else {
        echo json_encode("ID no proporcionado");
    }
}
