<?php

// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/usuariosLoginController.php

// url prueba thunder client
//http://localhost:8080/server/app/controller/usuariosController.php/user/anna_s

<<<<<<< HEAD
include '../model/tripulantesModel.php';
include '../model/documentoModel.php';
=======
include "../model/tripulantesModel.php";
>>>>>>> 0ce8a11 (funcionalidadTransitos terminada)

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

$tripulanteData = isset($_POST['tripulante']) ? json_decode($_POST['tripulante'], true) : null;
$fileData = isset($_FILES['file']) ? $_FILES['file'] : null;

$request = trim($_SERVER['REQUEST_URI'], '/');

$uri = explode('/', $request);
$lastpart = end($uri);
$penultimatePart = $uri[count($uri) - 2] ?? null;

switch ($method) {
    case 'GET':  // funciona
        if ($penultimatePart == 'tripulante') {
            getAllTripulantes($lastpart);
        }

        if ($lastpart == 'tripulantes') { //funciona
            getAllTripulantes();
        }
        break;
    case 'POST': //funciona
        if ($lastpart == 'insert') {
            insertNewTripulante($tripulanteData, $fileData);
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

function insertNewTripulante($tripulanteData, $fileData)
{   var_dump($tripulanteData);
    var_dump($fileData);
    $resultTripulante = Tripulantes::insertNewTripulante($tripulanteData);
    if ($resultTripulante) {
        if ($fileData) {
            $resultDocumento = Documentos::insertDocumentoFTP($tripulanteData['numeroDocumento'], $fileData);
            if ($resultDocumento) {
                echoResponse(true, 201, 'Tripulante registrado correctamente con documentación.');
            }
        }
        echoResponse(true, 201, 'Tripulante registrado correctamente sin documentación.');
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
