<?php

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
        if ($lastpart == 'login') {
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
        echoError('Error en el tipo de petición.');
        break;
}

function checkUserLogin(array $input)
{
    $result = usersLogin::checkUserLogin($input['username'] ?? '', $input['password'] ?? '');
    if ($result) {
        echo json_encode(
            [
                'success' => true,
                'status' => 200,
                'message' => 'Usuario autenticado correctamente',
                //'data' => $result
            ]
        );
    } else {
        echoError('Error al autenticar, verificar credenciales');
    }
}



function insertNewUserLogin(array $input)
{
    $result = usersLogin::insertNewUserLogin($input['username'] ?? '', $input['password'] ?? '');
    if ($result) {
        echo json_encode(
            [
                'success' => true,
                'status' => 200,
                'message' => 'Usuario registrado correctamente',
                //'data' => $result
            ]
        );
    } else {
        echoError('Error al registar el usuario, verificar credenciales');
    }
}

function updateUserLogin(array $input)
{
    $username = $input['username'] ?? '';
    $result = usersLogin::updateUserLogin($input, $username);
    if ($result) {
        echo json_encode(
            [
                'success' => true,
                'status' => 200,
                'message' => 'Usuario actualizado correctamente',
                //'data' => $result
            ]
        );
    } else {
        echoError('Error al registar el usuario, verificar credenciales');
    }
}

function deleteUserLogin(string $username)
{
    $result = usersLogin::deleteUserLogin($username);
    if ($result) {
        echo json_encode(
            [
                'success' => true,
                'status' => 200,
                'message' => 'Usuario eliminado correctamente',
                //'data' => $result
            ]
        );
    } else {
        echoError('Error al eliminar el usuario.');
    }
}

function echoError(string $message)
{
    echo json_encode([
        "success" => false,
        "message" => $message,
        "data" => null
    ]);
}
