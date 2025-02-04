<?php
include_once '../../config/conexion.php';

abstract class users
{
    static function selectUser(string $username = '')
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            if (!empty($username)) {
                $sql = "SELECT * FROM users WHERE username = ?";
                $stmt = $conexion->prepare($sql);
                $stmt->bind_param("s", $username);
                $stmt->execute();

                $result = $stmt->get_result()->fetch_assoc();
            } else {
                $sql = "SELECT * FROM users;";
                $result = $conexion->query($sql);
                $result = $result->fetch_all(MYSQLI_ASSOC);
            }
            return $result;
        } catch (Exception $e) {
            //throw $th;
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }

    static function insertNewUser(array $input)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $sql = "INSERT INTO usersLogin (usuario, nombre, email, idioma, formatoFecha, deshabilitado) VALUES ( ?, ?, ?, ?, ?, ?);";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("sssssi", $input['usuario'], $input['nombre'], $input['email'], $input['idioma'], $input['formatoFecha'], $input['deshabilitado']);
            return $stmt->execute();
        } catch (Exception $e) {
            //throw $th;
        } finally {
            if ($conexion) {
                closeConexion($conexion);
            }
        }
    }


    static function updateUser(array $input, string $username)
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

            $sql = "UPDATE users SET " . implode(", ", $fields) . " WHERE username = ?";
            $stmt = $conexion->prepare($sql);
            $types = str_repeat("s", count($values));

            // Usamos call_user_func_array para bind_param dinámico
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

    static function deleteUser(string $username)
    {
        $conexion = null;
        try {
            $conexion = openConexion();
            $sql = "DELETE FROM users WHERE username = ?";
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
