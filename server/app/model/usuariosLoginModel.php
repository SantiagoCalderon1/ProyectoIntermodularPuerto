<?php
include_once '../../config/conexion.php';

abstract class usersLogin
{
    /**
     * Verifica las credenciales de un usuario y determina si el inicio de sesión es válido.
     * 
     * @param string $username  El nombre de usuario proporcionado.
     * @param string $password  La contraseña ingresada.
     * @return bool  Devuelve true si las credenciales son correctas, de lo contrario, false.
     */
    static function checkUserLogin(string $username, string $password)
    {
        $conexion = null;
        if (empty($username) || empty($password)) {
            return false;
        }
        try {
            $conexion = openConexion();
            $sql = "SELECT password FROM usersLogin WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            $stmt->execute();

            $result = $stmt->get_result();
            $user = $result->fetch_assoc(); // Devuelve un array asociativo o NULL si no existe el usuario

            // Verificar si el usuario existe y la contraseña es válida
            return $user && password_verify($password, $user['password']);
        } catch (Exception $e) {
            // error
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function insertNewUserLogin(string $username, string $password)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            // Hashear la contraseña antes de guardarla
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);

            $sql = "INSERT INTO usersLogin (username, password) VALUES (?, ?)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("ss", $username, $passwordHash);
            return $stmt->execute();
        } catch (Exception $e) {
            //throw $th;
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function updateUserLogin(array $input, string $username)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $fields = [];
            $values = [];
            foreach ($input as $key => $value) {
                $fields[] = "$key = ?";
                $values[] = $value;
            }
            $values[] = $username;

            $sql = "UPDATE usersLogin SET " . implode(", ", $fields) . " WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $types = str_repeat("s", count($values));

            // ...$values -> call_user_func_array para bind_param dinámico
            $stmt->bind_param($types, ...$values);
            return $stmt->execute();
        } catch (Exception $e) {
            //throw $th;
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function deleteUserLogin(string $username)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $sql = "DELETE FROM usersLogin WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("s", $username);
            return $stmt->execute();
        } catch (Exception $e) {
            //throw $th;
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }
}
