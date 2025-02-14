<?php
include_once '../model/reservasModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$db = new Reservations();
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

function handleGet($db, $uri = null)
{
    if (((array_slice($uri, -2, 1))[0]) === "reservas" || end($uri) === "reservas") {
        $products = $db->showReservation(end($uri));
        $res = [];
        foreach ($products as $product) {
            $user = $db->showUser($product["titular"]);
            $product["titular"] = $user[0]["nombre"] . " " . $user[0]["apellidos"];
            $boat = $db->showBoat($product["embarcacion"]);
            $product["embarcacion"] = $boat[0]["nombre"];
            $res[] = $product;
        }

        echo json_encode($res);
    }
    else if (((array_slice($uri, -2, 1))[0]) === "provincia" || end($uri) === "provincia") {
        $ccaa = $db->showProvincia(end($uri));
        echo json_encode($ccaa);
    } 
    else if (((array_slice($uri, -2, 1))[0]) === "municipio" || end($uri) === "municipio") {
        $ccaa = $db->showMunicipioByProvincia(end($uri));
        echo json_encode($ccaa);
    }
    else if (((array_slice($uri, -2, 1))[0]) === "titular" || end($uri) === "titular") {
        $ccaa = $db->showTitulares(end($uri));
        echo json_encode($ccaa);
    }
    else if (((array_slice($uri, -2, 1))[0]) === "embarcacion" || end($uri) === "embarcacion") {
        $ccaa = $db->showEmbarcaciones(end($uri));
        echo json_encode($ccaa);
    }
    else if (((array_slice($uri, -2, 1))[0]) === "embarcacionTitular" || end($uri) === "embarcacionTitular") {
        $ccaa = $db->showEmbarcacionesByTitular(end($uri));
        echo json_encode($ccaa);
    }
}

function handlePost($db, $data)
{
    /* $data = [
        "type" => "reserva",
        "plaza" => 1,
        "titular" => 1,
        "embarcacion" => 1,
        "fecha_ini" => "2025-02-01",
        "fecha_fin" => "2025-02-28"
    ]; */
        if ($db->insertNewReservation($data)) {
            echo json_encode("OK");
        } else {
            echo json_encode("Error al crear el producto");
        }
}

function handlePut($db, $data)
{
    /* $data = [
        "id_reserva" => 1,
        "plaza" => 1,
        "titular" => 1,
        "embarcacion" => 1,
        "fecha_ini" => "2025-02-01",
        "fecha_fin" => "2025-02-28"
    ]; */
    $db->updateReservation($data);
}

function handleDelete($db, $data)
{
    /* $data = [
        "id_reserva" => 1,
    ]; */
    if (isset($data["id_reserva"])) {
        $id = (int) $data["id_reserva"];
        $db->deleteReservation($id);
    } else {
        echo json_encode("ID no proporcionado");
    }
}
