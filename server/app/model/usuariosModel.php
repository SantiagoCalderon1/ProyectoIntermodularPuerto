<?php
include_once '../../config/conexion.php';

abstract class Users
{
    /**
     * Verifica las credenciales de un usuario y determina si el inicio de sesión es válido.
     * 
     * @param string $username  El nombre de usuario proporcionado.
     * @param string $password  La contraseña ingresada.
     * @return bool  Devuelve true si las credenciales son correctas, de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function checkUserLogin(object $input)
    {
        $conexion = null;
        if ((empty($input->usuario))) {
            return false;
        }
        try {
            $conexion = openConexion();
            $sql = "SELECT password,rol FROM usuario WHERE usuario = ? or email = ? ";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("ss", $input->usuario, $input->usuario);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc(); // Devuelve un array asociativo o NULL si no existe el usuario
            // Verificar si el usuario existe y la contraseña es válida
            //return $user && password_verify($password, $passwordHash);
            if (!$user) {
                return false;
            }
            return $user && $input->password == $user['password'] && $user['rol'] != 0;
        } catch (Exception $e) {
            return ["Exception" => "Error en checkUserLogin: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Obtiene a un usuario si se le pasa un id, en otro caso los obtiene a todos.
     * 
     * @param string $username  El nombre de usuario proporcionado, por defecto vacío.
     * @return array  Devuelve 1 array asociativo si la query se ejecutó con id, si no, retorna un array de arrays asociativos, en otros casos, un array vacío.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function getAllUsers(string $username)
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
    static function insertNewUser(object $input)
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
                $types .= Users::getTypesBind($value);
            }
            $sql = "INSERT INTO usuario (" . implode(',', $fields) . ") VALUES (?,?,?,?,?,?,?)";
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
    static function updateUser(object $input, $oldUsername)
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
                $types .= users::getTypesBind($value);
            }
            $values[] = $oldUsername;
            $types .= users::getTypesBind($oldUsername);
            $sql = "UPDATE usuario SET  " . implode(", ", $fields) . "   WHERE usuario = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
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
