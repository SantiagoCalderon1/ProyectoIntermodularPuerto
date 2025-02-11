<?php
include_once '../../config/conexion.php';

abstract class Tripulantes
{

    /**
     * Obtiene a un tripulante si se le pasa un id, en otro caso los obtiene a todos.
     * 
     * @param string $numeroDocumento  El numero de documento proporcionado, por defecto vacío.
     * @return array  Devuelve 1 array asociativo si la query se ejecutó con id, si no, retorna un array de arrays asociativos, en otros casos, un array vacío.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getAllTripulantes(string $numeroDocumento)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            if (empty($numeroDocumento)) {
                $sql = "SELECT * FROM tripulantes";
                $stmt = $conexion->prepare($sql);
            } else {
                $sql = "SELECT * FROM tripulantes WHERE numeroDocumento = ?";
                $stmt = $conexion->prepare($sql);
                $stmt->bind_param("s", $numeroDocumento);
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
    static function insertNewTripulante(object $input)
    {
        $conexion = null;
        try {
            if (empty($input)) {
                return false;
            }
            $conexion = openConexion();
            // Hashear la contraseña
            // $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            $fields = [];
            $values = [];
            $types = '';

            foreach ($input as $key => $value) {
                $fields[] = $key;
                $values[] = $value;
                $types .= Tripulantes::getTypesBind($value);
            }
            $sql = "INSERT INTO tripulantes (" . implode(',', $fields) . ") VALUES (?,?,?,?,?,?,?,?,?,?,?)";
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
    static function updateTripulante(object $input, $oldNumeroDocumento)
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
     * @param string $username  El nombre de usuario proporcionado.
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
}
