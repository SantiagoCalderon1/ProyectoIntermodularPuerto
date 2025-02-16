<?php
include_once '../../config/conexion.php';

abstract class Tripulantes
{

    /**
     * Función básica que obtiene un listado de los 195 paises reconocidos en el año 2025.
     * 
     * @return array  Devuelve arrays asociativo si la query se ejecutó correctamente.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getAllPaises()
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $sql = "SELECT paises FROM datosGlobales";
            $stmt = $conexion->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return ["Exception" => "Error en getAllPaises: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }


    /**
     * Obtiene a un tripulante si se le pasa un id, en otro caso los obtiene a todos.
     * 
     * @param string $numeroDocumento  El numero de documento proporcionado o numero de embarcación, por defecto vacíos.
     * @return array  Devuelve arrays asociativo si la query se ejecutó correctamente.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getAllTripulantes(string $numeroDocumento = '', string $embarcacion = '')
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            
            if (!empty($embarcacion) && empty($numeroDocumento)) {
                $sql = "SELECT * FROM tripulantes WHERE embarcacion = ?";
                $stmt = $conexion->prepare($sql);
                $stmt->bind_param("s", $embarcacion);
            } else if (!empty($numeroDocumento) && empty($embarcacion)) {
                $sql = "SELECT * FROM tripulantes WHERE numeroDocumento = ?";
                $stmt = $conexion->prepare($sql);
                $stmt->bind_param("s", $numeroDocumento);
            } else {
                $sql = "SELECT * FROM tripulantes";
                $stmt = $conexion->prepare($sql);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return ["Exception" => "Error en getAllTripulantes: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Inserta un tripulante.
     * 
     * @param object $input  El objeto json que proporciona el usuario, contiene los datos a insertar.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function insertNewTripulante($input)
    {
        $conexion = null;
        try {
            if (empty($input)) {
                return false;
            }
            $conexion = openConexion();
            $fields = [];
            $values = [];
            $types = '';
            foreach ($input as $key => $value) {
                $fields[] = $key;
                $values[] = $value;
                $types .= Tripulantes::getTypesBind($value);
            }
            $placeholders = implode(',', array_fill(0, count($fields), '?'));
            $sql = "INSERT INTO tripulantes (" . implode(',', $fields) . ") VALUES ($placeholders)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en insertNewTripulante: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }


    /**
     * Actualiza los datos de un tripulante, y lo hace de manera dinamica.
     * 
     * @param object $input  El objeto json que proporciona el usuario, contiene los datos nuevos y antiguos.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function updateTripulante($input, $oldNumeroDocumento)
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
                $types .= Tripulantes::getTypesBind($value);
            }
            $values[] = $oldNumeroDocumento;
            $types .= Tripulantes::getTypesBind($oldNumeroDocumento);
            $sql = "UPDATE tripulantes SET  " . implode(", ", $fields) . "   WHERE numeroDocumento = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();

            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en updateTripulante: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Función para elimina a un tripulante.
     * 
     * @param string $numeroDocumento  El numero de documento proporcionado.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function deleteTripulante(string $numeroDocumento)
    {
        $conexion = null;
        try {
            if (empty($numeroDocumento)) {
                return false;
            }
            $conexion = openConexion();
            $sql = "DELETE FROM tripulantes WHERE numeroDocumento = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $numeroDocumento);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en deleteTripulante: Excepción - " . $e->getMessage()];
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

    // PARTE DE FTP 
    // ===================================================================================
    /**
     * Inserta un documento el servidor.
     * 
     * @param file $fileData  El objeto file que proporciona el usuario, contiene los datos a insertar.
     * @return bool  Devuelve true un Json con el url del documento para ser insertado más adelante en la BBDD, de lo contrario, false.
     */
    static function  insertDocumentoFTP($fileData)
    {
        if (!$fileData || !isset($fileData['tmp_name']) || empty($fileData['name'])) {
            return false;
        }
        $uploadDir = '/var/www/html/uploads/';
        $uploadDirBBDD = 'https://uat-puerto.proyectos-2daw.es/uploads/' . basename($fileData['name']);
        $uploadFile = $uploadDir . basename($fileData['name']);
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        if (!isset($fileData['tmp_name'])) {
            return false;
        }
        $resultMove = copy($fileData['tmp_name'], $uploadFile);
        return $resultMove ? ["documentoUrl" => $uploadDirBBDD] : false;
    }

    /**
     * Elimina un documento el servidor.
     * 
     * @param string $documentoUrl  La URL del file que proporciona el usuario, contiene el nombre del fichero.
     * @return bool  Devuelve true, si el ficheor se eliminó correctamente, false en caso contrario.
     */
    static function deleteDocumentoFTP(string $documentoUrl)
    {
        $uploadDir = '/var/www/html/uploads/';
        $uploadFile = $uploadDir . basename($documentoUrl);
        return unlink($uploadFile);
    }
}
