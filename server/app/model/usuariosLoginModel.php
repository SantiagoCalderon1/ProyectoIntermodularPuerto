<?php
include_once '../../config/conexion.php';

abstract class UsersLogin
{
    /**
     * Verifica las credenciales de un usuario y determina si el inicio de sesión es válido.
     * 
     * @param string $username  El nombre de usuario proporcionado.
     * @param string $password  La contraseña ingresada.
     * @return bool  Devuelve true si las credenciales son correctas, de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function checkUserLogin(string $username, string $password)
    {
        $conexion = null;
        if (empty($username) || empty($password)) {
            return false;
        }
        try {
            $conexion = openConexion();
            $sql = "SELECT password FROM usuariosLogin WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();

            $result = $stmt->get_result();
            $user = $result->fetch_assoc(); // Devuelve un array asociativo o NULL si no existe el usuario

            // Verificar si el usuario existe y la contraseña es válida
            //return $user && password_verify($password, $passwordHash);

            if (!$user) {
                return false;
            }
            return $user && $password === $user['password'];
        } catch (Exception $e) {
            return ["Exception" => "Error en checkUserLogin: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    /**
     * Inserta un usuario.
     * 
     * @param string $username  El nombre de usuario proporcionado.
     * @param string $password  La contraseña ingresada.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function insertNewUserLogin(string $username, string $password)
    {
        $conexion = null;
        try {
            if (empty($username) || empty($password)) {
                return false;
            }
            $conexion = openConexion();
            // Hashear la contraseña
            // $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO usuariosLogin (username, password) VALUES (?, ?)";
            $stmt = $conexion->prepare($sql);
            // Hashear la contraseña 
            //$stmt->bind_param("ss", $username, $passwordHash);
            $stmt->bind_param("ss", $username, $password);
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
    static function updateUserLogin(object $input)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $fields = [];
            $values = [];

            $propiedades = get_object_vars($input); // convierto el obj en array
            $oldUsername = array_pop($propiedades);

            foreach ($propiedades as $key => $value) {
                $fields[] = "$key = ?";
                $values[] = $value;
            }
            $values[] = $oldUsername;

            $sql = "UPDATE usuario SET usuario = ?  WHERE usuario = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("ss", $propiedades['newUsername'], $oldUsername);
            $stmt->execute();

            $sql = "UPDATE usuariosLogin SET " . implode(", ", $fields) . " WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $types = str_repeat("s", count($values));

            // ...$values -> call_user_func_array para bind_param dinámico
            $stmt->bind_param($types, ...$values);
            $stmt->execute();
            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en updateUserLogin: Excepción - " . $e->getMessage()];
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
    static function deleteUserLogin(string $username)
    {
        $conexion = null;
        try {
            if (empty($username)) {
                return false;
            }

            $conexion = openConexion();
            $sql = "DELETE FROM usuariosLogin WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();

            return ($stmt->affected_rows > 0);
        } catch (Exception $e) {
            return ["Exception" => "Error en deleteUserLogin: Excepción - " . $e->getMessage()];
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }
}
