<?php
header("Access-Control-Allow-Origin: *"); // Permitir cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Permitir estos headers
header("Content-Type: application/json; charset=utf-8"); // Indicar que la respuesta es JSON

include_once "../model/transito.php";

$data = json_decode(file_get_contents("php://input"), true);

$request = trim($_SERVER['REQUEST_URI'], '/');
$uri = explode('/', $request);
$lastpart = end($uri);
$penultimatePart = $uri[count($uri) - 2] ?? null;

$metodo = $_SERVER["REQUEST_METHOD"];

switch ($metodo) {

    case "GET":
        if ($lastpart == "transitos") {
            $respuesta = Transito::getTodosTransitos();

            if ($respuesta && $respuesta->num_rows > 0) {
                $respuesta = $respuesta->fetch_all(MYSQLI_ASSOC);
                echo json_encode($respuesta);
            }
        } else if ($penultimatePart == "transito") {
            $respuesta = Transito::getTransito($lastpart);
            $respuesta = $respuesta->fetch_assoc();
            echo json_encode($respuesta);
        }
        break;
    case "POST":

        if ($data) {
            $anyo = $data["anyo"];
            $pantalan = $data["pantalan"];
            $instalacion = $data["instalacion"];
            $fecha_entrada = $data["fecha_entrada"];
            $fecha_salida = $data["fecha_salida"];
            $patron = $data["patron"];
           //$embarcacion = $data["embarcacion"];
            $datos_estancia = $data["datos_estancia"];
            $respuesta = Transito::agregarTransito($anyo, $pantalan, $instalacion, $fecha_entrada, $fecha_salida, $patron, $datos_estancia);
            if ($respuesta) {
                echo json_encode(["mensaje" => "Transito agregado correctamente"]);
            } else {
                echo json_encode(["error" => "Error al agregar transito"]);
            }
        } else {
            echo json_encode(["error" => "Error al recibir los datos"]);
        }
        break;
    case "DELETE":
        if ($_GET["embarcacion"]) {
            $embarcacion_eliminar = $_GET["embarcacion"];
            $respuesta = Transito::deleteTransito($embarcacion_eliminar);
            if ($respuesta) {
                echo json_encode(["mensaje" => "Transito eliminado correctamente"]);
            } else {
                echo json_encode(["error" => "Error al eliminar el transito"]);
            }
        } else {
            echo json_encode(["error" => "Error al recoger la embarcacion"]);
        }
        break;
        case "PUT":
            if ($data) {
                $anyo = $data["anyo"];
                $pantalan = $data["pantalan"];
                $instalacion = $data["instalacion"];
                $fecha_entrada = $data["fecha_entrada"];
                $fecha_salida = $data["fecha_salida"];
                $patron = $data["patron"];
                $embarcacion = $data["embarcacion"];
                $datos_estancia = $data["datos_estancia"];
                $respuesta = Transito::updateTransito($embarcacion,$anyo,$pantalan,$instalacion,$fecha_entrada,$fecha_salida,$patron,$datos_estancia);
                if($respuesta){
                    echo json_encode(["mensaje" => "Transito modificado correctamente"]);
                }else{
                    echo json_encode(["error" => "Error al modificar transito"]);
                }
            }else{
                echo json_encode(["error" => "Nº de embarcacion no recibida"]);
            }
            break;
}
