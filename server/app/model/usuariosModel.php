<?php
include_once '../../config/conexion.php';

abstract class Users
{

    /**
     * Obtiene a un usuario si se le pasa un id, en otro caso los obtiene a todos.
     * 
     * @param string $username  El nombre de usuario proporcionado, por defecto vacío.
     * @return array  Devuelve 1 array asociativo si la query se ejecutó con id, si no, retorna un array de arrays asociativos, en otros casos, un array vacío.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getAllUsers(string $username = '')
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            if (empty($username)) {
                $sql = "SELECT * FROM usuario";
                $stmt = $conexion->prepare($sql);
            } else {
                $sql = "SELECT * FROM usuario WHERE usuario = ?";
                $stmt = $conexion->prepare($sql);
                $stmt->bind_param("s", $username);
            }
            $stmt->execute();
            $result = $stmt->get_result();

            return $result->fetch_all(MYSQLI_ASSOC);
        } catch (Exception $e) {
            return ["Exception" => "Error en getAllUsers: Excepción - " . $e->getMessage()];
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
    static function insertNewUser($input)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            if (empty($input)) {
                return false;
            }
            $fields = [];
            $values = [];
            $types = '';

            foreach ($input as $key => $value) {
                $fields[] = $key;
                $values[] = $value;

                $types .= users::getTypesBind($value);
            }

            $sql = "INSERT INTO usuario (" . implode(',', $fields) . ") VALUES (?,?,?,?,?,?)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en insertNewUserLogin: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Actualiza las credenciales de un usuario.
     * 
     * @param object $input  El objeto json que proporciona el usuario, contiene los datos nuevos y antiguos.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function updateUser(object $input)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $fields = [];
            $values = [];
            $types = '';

            $propiedades = get_object_vars($input); // convierto el obj en array
            $oldUsername = array_pop($propiedades); // el username antiguo siempre debe ser el ultimo parametro del json

            foreach ($propiedades as $key => $value) {
                $fields[] = "$key = ?";
                $values[] = $value;

                $types .= users::getTypesBind($value);
            }
            $values[] = $oldUsername;
            $types .= users::getTypesBind($oldUsername);


            $sql = "UPDATE usuario SET  " . implode(", ", $fields) . "   WHERE usuario = ?";
            $stmt = $conexion->prepare($sql);
            var_dump('UP 1 - ' . $types, ...$values,...$fields);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();

            $sql = "UPDATE usuariosLogin SET username = ? WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("ss", $propiedades['usuario'], $oldUsername);
            var_dump($propiedades['usuario']);
            $stmt->execute();
            
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en updateUser: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Función para elimina a un usuario.
     * 
     * @param string $username  El nombre de usuario proporcionado.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function deleteUser(string $username)
    {
        $conexion = null;
        try {
            if (empty($username)) {
                return false;
            }

            $conexion = openConexion();
            $sql = "DELETE FROM usuario WHERE usuario = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();

            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en deleteUser: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Función para elimina a un usuario.
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
