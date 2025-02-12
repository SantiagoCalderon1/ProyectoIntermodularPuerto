<?php
include_once '../../config/conexion.php';

abstract class Documentos
{
    /**
     * Obtiene la URL a los documentos si se le pasa un numero de documento de un usuario.
     * 
     * @param string $username  El nombre de usuario proporcionado, por defecto vacío.
     * @return array  Devuelve 1 array asociativo si la query se ejecutó con id, si no, retorna un array de arrays asociativos, en otros casos, un array vacío.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getUrlDocumento(string $numeroDocument)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            if (empty($numeroDocument)) {
                return false;
            }
            $sql = "SELECT documento_url FROM documentos WHERE numeroDocumento = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return ["Exception" => "Error en getUrlDocument: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function insertUrlDocumento(string $numeroDocumento, string $documento_url)
    {
        $conexion = null;
        try {
            if (empty($input)) {
                return false;
            }
            $conexion = openConexion();
            $sql = "INSERT INTO documentos (numeroDocumento, documento_url) VALUES (?,?)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param('ss', $numeroDocumento, $documento_url);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en insertUrlDocumento: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function updateUrlDocumento(object $input, string $oldNumeroDocument)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $fields = [];
            $values = [];
            $types = '';
            foreach ($input as $key => $value) {
                $fields[] = "$key = ?";
                $values[] = $value;
                $types .= Documentos::getTypesBind($value);
            }
            $values[] = $oldNumeroDocument;
            $types .= Documentos::getTypesBind($oldNumeroDocument);
            $sql = "UPDATE documentos SET  " . implode(", ", $fields) . "   WHERE numeroDocument = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en updateDocumento: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function deleteUrlDocumento(string $numeroDocument)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            if (empty($numeroDocument)) {
                return false;
            }
            $sql = "DELETE FROM documentos WHERE numeroDocument = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return ["Exception" => "Error en deleteUrlDocument: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Función para obtener el tipo de un dato, se usa para bind_param.
     * 
     * @param string $value, el valor de una propiedad del array input.
     * @return chart  Devuelve una letra correspondinete al tipo de dato.
     */
    static private function getTypesBind($value)
    {
        if (is_int($value)) {
            return 'i'; // Entero
        } elseif (is_double($value)) {
            return 'd'; // Doble
        } elseif (is_string($value)) {
            return 's'; // String
        } elseif (is_null($value)) {
            return 's'; //  NULL como string (por si acaso)
        }
    }

    // //PARTE DE FTP ==============================================================================================================
    static function getDocumentoFTP(string $numeroDocumento, string $ftp_ruta) {}

    static function insertDocumentoFTP(string $numeroDocumento, $fileData)
    {
        if (!$fileData || !isset($fileData['tmp_name']) || empty($fileData['name'])) {
            return false;
        }
        $conexionFTP = openConexionFTP();
        if (!$conexionFTP) {
        return false;
        }
        $nombreArchivo = $fileData['name'];
        $rutaDestino = '/uploads/' . $nombreArchivo;
        $subidaExitosa = ftp_put($conexionFTP, $rutaDestino , $fileData['tmp_name'], FTP_BINARY);
        ftp_close($conexionFTP);
        if ($subidaExitosa) {
            return Documentos::insertUrlDocumento($numeroDocumento, $rutaDestino);
        }
        return false;
    }
    
    static function updateDocumentoFTP(object $input, string $oldNumeroDocument) {}
    

    static function deleteDocumentoFTP(string $numeroDocumento) {}
}






// $ftp_ruta = "/uploads/"; // Carpeta en el FTP



// if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
//     $localFile = $_FILES['file']['tmp_name'];
//     $fileName = $_FILES['file']['name'];

//     // Conectar al servidor FTP

//     if ($login) {
//         ftp_pasv($ftp_conexion, true); // Modo pasivo
//         $upload = ftp_put($ftp_conexion, $ftp_ruta . $fileName, $localFile, FTP_BINARY);

//         if ($upload) {
//             echo json_encode(["status" => "success", "message" => "Archivo subido correctamente"]);
//         } else {
//             echo json_encode(["status" => "error", "message" => "Error al subir el archivo"]);
//         }
//     } else {
//         echo json_encode(["status" => "error", "message" => "Error de autenticación en FTP"]);
//     }
//     ftp_close($ftp_conn);
// } else {
//     echo json_encode(["status" => "error", "message" => "Error al recibir el archivo"]);
// }
