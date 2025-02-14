<?php

// url proyecto filezilla
// https://uat-puerto.proyectos-2daw.es/app/controller/tripulantesController.php

// url prueba thunder client
//http://localhost:8080/server/app/controller/tripulantesController.php/user/anna_s

include '../model/tripulantesModel.php';

header("Access-Control-Allow-Origin: *");
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
    case 'GET':
        if ($penultimatePart == 'tripulante') {
            getAllTripulantes($lastpart, '');
        }
        if ($penultimatePart == 'tripulantes') {
            getAllTripulantes('', $lastpart);
        }
        break;
    case 'POST':
        if ($lastpart == 'insert') {
            insertNewTripulante($tripulanteData, $fileData);
        }
        // PUT y PATCH no maneja multipart/form-data, por eso no uso put o patch para actulizarlo
        if ($penultimatePart == 'update') {
            updateTripulante($tripulanteData, $fileData, $lastpart);
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

/**
 * Llama a el metodo de obtener tripulantes, pasandole el número de documento del tripulante y el número de la embarcación.
 * 
 * @param string $numeroDocumento  El numero de documento proporcionado o numero de embarcación, por defecto vacíos.
 * @return json  Llama a la función echoResponse que retorna un Json a el front.
 */
function getAllTripulantes(string $numeroDocumento = '', string $embarcacion = '')
{
    $result = Tripulantes::getAllTripulantes($numeroDocumento, $embarcacion);
    if ($result) {
        echoResponse(true, 200, 'Tripulante/s obtenido/s correctamente.', '', $result);
    } else {
        $exception = $result['Exception'] ?? '';
        echoResponse(false, 404, 'Error al obtener los tripulantes.', $exception);
    }
}

/**
 * Llama a el metodo de insertar un nuevo tripulantes, pasandole los datos del tripulante y fichero.
 * 
 * @param array $tripulanteData  Los datos del tripulante.
 * @param file $fileData  Los datos del file.
 * @return json  Llama a la función echoResponse que retorna un Json a el front.
 */
function insertNewTripulante($tripulanteData, $fileData)
{
    if ($fileData) {
        $resultDocumento = Tripulantes::insertDocumentoFTP($fileData);
        if ($resultDocumento) {
            $tripulanteData['documentoUrl'] = $resultDocumento['documentoUrl'];
            $resultTripulante = Tripulantes::insertNewTripulante($tripulanteData);
            if ($resultTripulante) {
                echoResponse(true, 201, 'Tripulante registrado correctamente con documentación.', 'No es excepcion quiero la ruta del fichero: ' . $resultDocumento['documentoUrl']);
            } else {
                $exception = $resultTripulante['Exception'] ?? '';
                echoResponse(false, 400, 'Error al registar el tripulante.', $exception);
            }
        } else {
            echoResponse(false, 400, 'Error al registar el tripulante, no se ha podido insertar el documento');
        }
    } else {
        $resultTripulante = Tripulantes::insertNewTripulante($tripulanteData);
        if ($resultTripulante) {
            echoResponse(true, 201, 'Tripulante registrado correctamente sin documentación, porque no hay fichero.');
        } else {
            $exception = $resultTripulante['Exception'] ?? '';
            echoResponse(false, 400, 'Error al registar el tripulante.', $exception);
        }
    }
}

/**
 * Llama a el metodo de actualizar un tripulantes, pasandole los datos del tripulante, fichero y el numero el último número de documento (si se actuliza el campo).
 * 
 * @param array $tripulanteData  Los datos del tripulante.
 * @param file $fileData  Los datos del file.
 * @param string $oldNumeroDocumento Vine por la Url, si es el antiguo si cambia, si no se mantiene el mismo.
 * @return json  Llama a la función echoResponse que retorna un Json a el front.
 */
function updateTripulante($tripulanteData, $fileData, $oldNumeroDocumento)
{
    if ($fileData) {
        $resultDocumento = Tripulantes::insertDocumentoFTP($fileData);
        if ($resultDocumento) {
            $tripulanteData['documentoUrl'] = $resultDocumento['documentoUrl'];
            $resultTripulante = Tripulantes::updateTripulante($tripulanteData, $oldNumeroDocumento);
            echoResponse(true, 201, 'Tripulante actualizado correctamente con documentación.');
        } else {
            echoResponse(false, 400, 'Error al actualizado el tripulante, porque no se ha podido actualizar el fichero');
        }
    } else {
        $resultTripulante = Tripulantes::updateTripulante($tripulanteData, $oldNumeroDocumento);
        if ($resultTripulante) {
            echoResponse(true, 201, 'Tripulante actualizado correctamente sin documentación, porque no hay fichero.');
        } else {
            $exception = $resultTripulante['Exception'] ?? '';
            echoResponse(false, 500, 'Error al actualizado el tripulante.', $exception);
        }
    }
}

/**
 * Llama a el metodo de eliminar un tripulantes.
 * 
 * @param string $numeroDocumento Vine por la Url.
 * @return json  Llama a la función echoResponse que retorna un Json a el front.
 */
function deleteTripulante(string $numeroDocumento = '')
{
    $tripulanteData = Tripulantes::getAllTripulantes($numeroDocumento, '');
    $rutaArchivo = $tripulanteData[0]['documentoUrl'];
    if ($rutaArchivo) {
        $resultDocumento = Tripulantes::deleteDocumentoFTP($rutaArchivo);
        if ($resultDocumento) {
            $resultTripulante = Tripulantes::deleteTripulante($numeroDocumento);
            if ($resultTripulante) {
                echoResponse(true, 200, 'Tripulante eliminado correctamente con documento.');
            } else {
                $exception = $result['Exception'] ?? '';
                echoResponse(false, 500, 'Error al eliminar el tripulante.', $exception);
            }
        } else {
            echoResponse(false, 500, 'Error al eliminar el tripulante, porque no se ha podido eliminar el documento.');
        }
    } else {
        $resultTripulante = Tripulantes::deleteTripulante($numeroDocumento);
        if ($resultTripulante) {
            echoResponse(true, 200, 'Tripulante eliminado correctamente sin documento.');
        } else {
            $exception = $result['Exception'] ?? '';
            echoResponse(false, 500, 'Error al eliminar el tripulante.', $exception);
        }
    }
}

/**
 * Función que retorna un Json al front con los datos contruidos en el back.
 * 
 * @param bool $success true si todo es correcto, false en caso contrario.
 * @param int $status Valores estandar para notificación en el front.
 * @param string $message Mensaje personalizado.
 * @param string $exception Opcional, por defecto vació, si sucede una excepcion en las consultas, muestra cúal fue.
 * @param array $data Opcional, por defecto null, guarda los datos que devuelven las consultas.

 * @return json  Llama a la función echoResponse que retorna un Json a el front.
 */
function echoResponse(bool $success, int $status, string $message, ?string $exception = '', ?array $data = null)
{
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode([
        "success" => $success,
        "status" => $status,
        "message" => $message,
        "exception" => $exception,
        "data" => $data
    ]);
}
