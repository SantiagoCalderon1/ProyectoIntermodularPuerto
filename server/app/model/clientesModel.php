<?php
include_once '../../config/conexion.php';

abstract class Clientes
{
    /**
     * Obtiene a un cliente si se le pasa un nif, en otro caso los obtiene a todos.
     * 
     * @param string $nif  El número de identificación fiscal proporcionado, por defecto vacío.
     * @return array  Devuelve un array de arrays asociativos si la query se ejecutó con o sin nif, en otros casos, un array vacío.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getAllClients(string $nif)
    {
        $conexion = null;
        try {
            $conexion = openConexion();

            if (empty($nif)) {
                $sql = "SELECT * FROM clientes";
                $stmt = $conexion->prepare($sql);
            } else {
                $sql = "SELECT * FROM clientes WHERE nif = ?";
                $stmt = $conexion->prepare($sql);
                $stmt->bind_param("s", $nif);
            }
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return ["Exception" => "Error en getAllClients: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Inserta un usuario.
     * 
     * @param object $input  El objeto json que proporciona el usuario, contiene los datos a insertar.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function insertNewClient(object $input)
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
                $types .= Clientes::getTypesBind($value);
            }
            $sql = "INSERT INTO clientes (" . implode(',', $fields) . ") VALUES (?,?,?,?,?,?,?,?)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en insertNewClient: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }


    /**
     * Actualiza los datos de un cliente.
     * 
     * @param object $input  El objeto json que proporciona el usuario, contiene los datos nuevos y antiguos.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function updateClient(object $input, $oldNif)
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
                $types .= Clientes::getTypesBind($value);
            }
            $values[] = $oldNif;
            $types .= Clientes::getTypesBind($oldNif);
            $sql = "UPDATE clientes SET  " . implode(", ", $fields) . "   WHERE nif = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en updateClient: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Función para elimina a un cliente.
     * 
     * @param string $nif  El número de identificación fiscal proporcionado.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function deleteClient(string $nif)
    {
        $conexion = null;
        try {
            if (empty($nif)) {
                return false;
            }
            $conexion = openConexion();
            $sql = "DELETE FROM clientes WHERE nif = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $nif);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en deleteClient: Excepción - " . $e->getMessage()];
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
