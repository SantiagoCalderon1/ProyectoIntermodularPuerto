<?php

// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/usuariosLoginController.php

// url prueba thunder client
// http://localhost:8080/server/app/controller/usuariosLoginController.php/login

include '../model/usuariosLoginModel.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'));
$request = trim($_SERVER['REQUEST_URI'], '/');

$uri = explode('/', $request);
$lastpart = $uri[count($uri) - 1] ?? null;

switch ($method) {
    case 'POST':
        if ($lastpart == 'login') {  // funciona
            checkUserLogin($input);
        }

        if ($lastpart == 'insert') {
            insertNewUserLogin($input);
        }
        break;
    case 'PUT':
    case 'PATCH':
        updateUserLogin($input);
        break;
    case 'DELETE':
        deleteUserLogin($input);
        break;
    default:
        echoResponse(false, 500, 'Error del servidor.');
        break;
}

function checkUserLogin($input)
{
    $result = UsersLogin::checkUserLogin($input->username ?? '', $input->password ?? '');
    if ($result) {
        echoResponse(true, 200, 'Usuario autenticado correctamente.');
    } else {
        echoResponse(false, 404, 'Error al autenticar, verificar credenciales.');
    }
}

function insertNewUserLogin($input)
{
    $result = UsersLogin::insertNewUserLogin($input->username ?? '', $input->password ?? '');
    if ($result) {
        echoResponse(true, 201, 'Usuario registrado correctamente.');
    } else {
        echoResponse(false, 400, 'Error al registar el usuario, verificar credenciales.');
    }
}

function updateUserLogin($input)
{
    $result = UsersLogin::updateUserLogin($input);
    if ($result) {
        echoResponse(true, 200, 'Usuario actualizado correctamente.', $result);
    } else {
        echoResponse(false, 500, 'Error al actualizar el usuario.', $result);
    }
}

function deleteUserLogin($input)
{
    $result = UsersLogin::deleteUserLogin($input->username ?? '');
    if ($result) {
        echoResponse(true, 200, 'Usuario eliminado correctamente.', $result);
    } else {
        echoResponse(false, 500, 'Error al eliminar el usuario.', $result);
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
