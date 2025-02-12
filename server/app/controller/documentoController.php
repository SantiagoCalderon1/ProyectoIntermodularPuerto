<?php
// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/usuariosLoginController.php

// url prueba thunder client
//http://localhost:8080/server/app/controller/usuariosController.php/user/anna_s

include '../model/documentoModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$tripulanteData = isset($_POST['tripulante']) ? json_decode($_POST['tripulante'], true) : null;

$fileData = isset($_FILES['file']) ? [
    'name' => $_FILES['file']['name'],
    'type' => $_FILES['file']['type'],
    //'size' => $_FILES['file']['size'],
    'tmp_name' => $_FILES['file']['tmp_name'],
    'error' => $_FILES['file']['error']
] : null;


$request = trim($_SERVER['REQUEST_URI'], '/');

$uri = explode('/', $request);
$lastpart = end($uri);
$penultimatePart = $uri[count($uri) - 2] ?? null;

switch ($method) {
    case 'GET':
        if ($penultimatePart == 'documento') {
            getUrlDocument($lastpart);
        }
        break;
    case 'POST':
        if ($lastpart == 'insertDocument') {
            insertUrlDocumento($input);
        }
        break;
    case 'PUT':
    case 'PATCH':
        if ($penultimatePart == 'updateDocument') {
            updateUrlDocumento($input, $lastpart);
        }
        break;
    case 'DELETE':
        if ($penultimatePart == 'deleteDocument') {
            deleteUrlDocumento($lastpart);
        }
        break;
    default:
        echoResponse(false, 500, 'Error del servidor.');
        break;
}

function getUrlDocument(string $username = '')
{
    $result = Documentos::getUrlDocumento($username);
    if ($result) {
        echoResponse(true, 200, 'Documento obtenido/s correctamente.', '', $result);
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 404, 'Error al obtener el Documento.', $exception);
    }
}

function insertUrlDocumento($input)
{
    $result = Documentos::insertUrlDocumento($input);
    if ($result) {
        echoResponse(true, 201, 'Documento registrado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 400, 'Error al registar el Documento.', $exception);
    }
}

function updateUrlDocumento($input, $username)
{
    $result = Documentos::updateUrlDocumento($input, $username);
    if ($result) {
        echoResponse(true, 200, 'Documento actualizado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al actualizar el Documento.', $exception);
    }
}

function deleteUrlDocumento(string $username = '')
{
    $result = Documentos::deleteUrlDocumento($username);
    if ($result) {
        echoResponse(true, 200, 'Documento eliminado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al eliminar el Documento.', $exception);
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
