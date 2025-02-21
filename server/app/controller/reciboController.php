<?php
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permitir estos headers
header("Content-Type: application/json; charset=utf-8"); // Indicar que la respuesta es JSON

include_once "../model/recibo.php";

$data = json_decode(file_get_contents("php://input"), true);


$metodo = $_SERVER["REQUEST_METHOD"];

switch ($metodo) {
    case "PUT":

            $resultado = Recibo::devolver($data['id_recibo']);
            if ($resultado) {
                echo json_encode(["mensaje" => "Recibos devueltos correctamente"]);
            } else {
                echo json_encode(["error" => "Error al devolver los recibos"]);
            }
        break;

    case "GET":
        //1 -> Listado de cobros de recibo
        if ($_GET["opcion"] == 1) {
            $listaRecibos = Recibo::getCobros();
            if (!$listaRecibos) {
                echo json_encode(["error" => "Error al obtener la lista de recibos cobrados"]);
            } else {
                echo json_encode($listaRecibos);
            }
        } else if ($_GET["opcion"] == 2) {
            // 2 -> Listado de recibos devueltos por el banco
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

    case "POST":
        $fechaHoy = $data["fecha"];
        $n_factura = $data["n_factura"];
        $respuesta = Recibo::crearRecibo($n_factura, $fechaHoy);
        if ($respuesta) {
            echo json_encode(["mensaje" => "Recibo creada satisfactoriamente"]);
        } else {
            echo json_encode(["error" => "Error al crear el recibo"]);
        }
        break;
    default:
        echo json_encode(["error" => "Error en el método"]);
}