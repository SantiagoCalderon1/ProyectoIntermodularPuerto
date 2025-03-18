<?php

// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/clientesController.php

include '../model/clientesModel.php';

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
    case 'GET':
        if ($penultimatePart == 'cliente') {
            // $lastpart; corresponde al nif
            getAllClients($lastpart);
        }
        if ($lastpart == 'clientes') {
            getAllClients();
        }
        break;
    case 'POST':
        if ($lastpart == 'insert') {
            insertNewClient($input);
        }
        break;
    case 'PUT':
    case 'PATCH':
        if ($penultimatePart == 'update') {
            // $input corresponde al objeto
            // $lastpart; corresponde al nif
            updateClient($input, $lastpart);
        }
        break;
    case 'DELETE':
        if ($penultimatePart == 'delete') {
            // $lastpart; corresponde al nif
            deleteClient($lastpart);
        }
        break;
    default:
        echoResponse(false, 500, 'Error del servidor.');
        break;
}

function getAllClients(string $nif = '')
{
    $result = Clientes::getAllClients($nif);
    if ($result) {
        echoResponse(true, 200, 'Cliente/s obtenido/s correctamente.', '', $result);
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 404, 'Error al obtener los cliente.', $exception);
    }
}

function insertNewClient($input)
{
    $result = Clientes::insertNewClient($input);
    if ($result) {
        echoResponse(true, 201, 'Cliente registrado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 400, 'Error al registar el cliente.', $exception);
    }
}

function updateClient($input, $nif)
{
    $result = Clientes::updateClient($input, $nif);
    if ($result) {
        echoResponse(true, 200, 'Cliente actualizado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al actualizar el cliente.', $exception);
    }
}

function deleteClient(string $nif = '')
{
    $result = Clientes::deleteClient($nif);
    if ($result) {
        echoResponse(true, 200, 'Cliente eliminado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al eliminar el cliente.', $exception);
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
