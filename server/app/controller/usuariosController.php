<?php

// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/usuariosLoginController.php

// url prueba thunder client
//http://localhost:8080/server/app/controller/usuariosController.php/user/anna_s

include '../model/usuariosModel.php';

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
        if ($penultimatePart == 'user') {
            $username = $lastpart;
            getAllUser($username);
        }

        if ($lastpart == 'users') {
            getAllUser();
        }
        break;
    case 'POST': //funciona
        if ($lastpart == 'insert') {
            insertNewUser($input);
        }
        if ($lastpart == 'login') {  // funciona
            checkUserLogin($input);
        }
        break;
    case 'PUT':
    case 'PATCH':  //funciona
        if ($penultimatePart == 'update') {
            updateUser($input, $lastpart);
        }
        break;
    case 'DELETE':
        if ($penultimatePart == 'delete') {
            deleteUser($lastpart);
        }
        break;
    default:
        echoResponse(false, 500, 'Error del servidor.');
        break;
}

function checkUserLogin($input)
{
    $result = Users::checkUserLogin($input);
    if ($result) {
        echoResponse(true, 200, 'Usuario autenticado correctamente.');
    } else {
        echoResponse(false, 404, 'Error al autenticar, verificar credenciales.');
    }
}

function getAllUser(string $username = '')
{
    $result = Users::getAllUsers($username);
    if ($result) {
        echoResponse(true, 200, 'Usuario/s obtenido/s correctamente.', '', $result);
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 404, 'Error al obtener los usuarios.', $exception);
    }
}

function insertNewUser($input)
{
    $result = Users::insertNewUser($input);
    if ($result) {
        echoResponse(true, 201, 'Usuario registrado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 400, 'Error al registar el usuario.', $exception);
    }
}

function updateUser($input, $username)
{
    $result = Users::updateUser($input, $username);
    if ($result) {
        echoResponse(true, 200, 'Usuario actualizado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al actualizar el usuario.', $exception);
    }
}

function deleteUser(string $username = '')
{
    $result = Users::deleteUser($username);
    if ($result) {
        echoResponse(true, 200, 'Usuario eliminado correctamente.');
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 500, 'Error al eliminar el usuario con username .', $exception);
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
