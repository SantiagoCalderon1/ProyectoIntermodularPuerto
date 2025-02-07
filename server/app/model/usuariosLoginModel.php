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
    static function checkUserLogin(object $input)
    {
        $conexion = null;
        //if ((empty($input->username) || empty($input->email)) && empty($input->password)) {
        if (empty($input->username) || empty($input->password)) {

            return false;
        }
        try {

            $conexion = openConexion();
            //$sql = "SELECT password FROM usuariosLogin WHERE username = ? OR email = ?";
            $sql = "SELECT password FROM usuariosLogin WHERE username = ? ";
            $stmt = $conexion->prepare($sql);
            //$stmt->bind_param("ss", $input->username, $input->email);
            $stmt->bind_param("s", $input->username);
            $stmt->execute();

            $result = $stmt->get_result();
            $user = $result->fetch_assoc(); // Devuelve un array asociativo o NULL si no existe el usuario

            // Verificar si el usuario existe y la contraseña es válida
            //return $user && password_verify($password, $passwordHash);

            if (!$user) {
                return false;
            }
            return $user && $input->password === $user['password'];
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
    static function insertNewUserLogin(string $username, string $email, string $password)
    {
        $conexion = null;
        try {
            if (empty($username) || empty($password)) {
                return false;
            }
            $conexion = openConexion();
            // Hashear la contraseña
            // $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO usuariosLogin (username, email, password) VALUES (?, ?, ?)";
            $stmt = $conexion->prepare($sql);
            // Hashear la contraseña 
            //$stmt->bind_param("ss", $username, $passwordHash);
            $stmt->bind_param("sss", $username, $password, $email);
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
    static function updateUserLogin(object $input,  string $oldUsername)
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

                $types .= UsersLogin::getTypesBind($value);
            }

            $values[] = $oldUsername;
            $types .= UsersLogin::getTypesBind($oldUsername);

            $values[] = $oldUsername;

            $sql = "UPDATE usuariosLogin SET " . implode(", ", $fields) . " WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);

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
