<?php

// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/usuariosLoginController.php

// url prueba thunder client
//http://localhost:8080/server/app/controller/usuariosController.php/user/anna_s

include '../model/tripulantesModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'));
$request = trim($_SERVER['REQUEST_URI'], '/');

$uri = explode('/', $request);
$lastpart = end($uri);
$penultimatePart = $uri[count($uri) - 2] ?? null;

switch ($method) {
    case 'GET':  // funciona
        if ($penultimatePart == 'tripulante') {
            $username = $lastpart;
            getAllTripulantes($username);
        }

        if ($lastpart == 'tripulantes') {
            getAllTripulantes();
        }
        break;
    case 'POST': //funciona
        if ($lastpart == 'insert') {
            insertNewTripulante($input);
        }
        break;
    case 'PUT':
    case 'PATCH':  //funciona
        if ($penultimatePart == 'update') {
            updateTripulante($input, $lastpart);
        }
        break;
    case 'DELETE':
        if ($penultimatePart == 'delete') {
            deleteTripulante($lastpart);
        }
        break;
    default:
        echoResponse(false, 500, 'Error del servidor.');
        break;
}

function getAllTripulantes(string $numeroDocumento = '')
{
    $result = Tripulantes::getAllTripulantes($numeroDocumento);
    if ($result) {
        echoResponse(true, 200, 'Tripulante/s obtenido/s correctamente.', '', $result);
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 404, 'Error al obtener los tripulantes.', $exception);
    }
}

function insertNewTripulante($input)
{
    $result = Tripulantes::insertNewTripulante($input);
    if ($result) {
        echoResponse(true, 201, 'Tripulante registrado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 400, 'Error al registar el tripulante.', $exception);
    }
}

function updateTripulante($input, $numeroDocumento)
{
    $result = Tripulantes::updateTripulante($input, $numeroDocumento);
    if ($result) {
        echoResponse(true, 200, 'Tripulante actualizado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al actualizar el usuario.', $exception);
    }
}

function deleteTripulante(string $numeroDocumento = '')
{
    $result = Tripulantes::deleteTripulante($numeroDocumento);
    if ($result) {
        echoResponse(true, 200, 'Tripulante eliminado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al eliminar el tripulante.', $exception);
    }
}

function echoResponse(bool $success, int $status, string $message, ?string $exception = '', ?array $data = null)
{
    echo json_encode([
        "success" => $success,
        "status" => $status,
        "message" => $message,
        "exception" => $exception,
        "data" => $data
    ]);
}
