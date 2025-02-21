<?php

header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permitir estos headers
header("Content-Type: application/json; charset=utf-8"); // Indicar que la respuesta es JSON


include_once "../model/recibo.php";

$data = json_decode(file_get_contents("php://input"), true);

$opcion = $data["opcion"];//1 -> Listado de cobros de recibo, 2 -> Listado de recibos devueltos por el banco

$metodo = $_SERVER["REQUEST_METHOD"];

switch ($metodo) {
    case "PUT":
        //procesa un array de recibos para ponerlos en "devuelto por el banco"
        if (isset($data["n_facturas"]) && is_array($data["n_facturas"])) {
            $resultado = Recibo::devolver($data["n_facturas"]);

            if ($resultado) {
                echo json_encode(["mensaje" => "Recibos devueltos correctamente"]);
            } else {
                echo json_encode(["error" => "Error al devolver los recibos"]);
            }
        } else {
            echo json_encode(["mensaje" => "Datos inválidos"]);
        }
        break;

    case "GET":
        if ($opcion == 1) {
            $listaRecibos = Recibo::getCobros();
            if (!$listaRecibos) {
                echo json_encode(["error" => "Error al obtener la lista de recibos cobrados"]);
            } else {
                echo json_encode($listaRecibos);
            }
        } else if ($opcion == 2) {
            $listaRecibos = Recibo::getDevueltos();
            if (!$listaRecibos) {
                echo json_encode(["error" => "Error al obtener la lista de recibos devueltos"]);
            } else {
                echo json_encode($listaRecibos);
            }
        } else {
            echo json_encode(["error" => "Opcion no valida"]);
        }
        break;

}
?>