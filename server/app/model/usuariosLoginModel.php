<?php
include_once '../../config/conexion.php';

abstract class UsersLogin
{
    
    /**
     * Inserta un usuario.
     * 
     * @param string $username  El nombre de usuario proporcionado.
     * @param string $password  La contraseña ingresada.
     * @return bool  Devuelve true si la query se ejecutó (si hubo filas afectadas), de lo contrario, false.
     * @throws Exception  Si hay algún error en la ejecución de la query captura la excepción y devuelve un mensaje. 
     */
    static function insertNewUserLogin(object $input)
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
            $password = '';

            if (property_exists($input, 'password')) {
                $password = $input->password;
                unset($input->password);
            }

            //var_dump($input);

            foreach ($input as $key => $value) {
                $fields[] = $key;
                $values[] = $value;

                $types .= UsersLogin::getTypesBind($value);
            }

            //var_dump($fields);
            //var_dump($values);

            $sql = "INSERT INTO usuario (" . implode(',', $fields) . ") VALUES (?,?,?,?,?,?)";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param($types, ...$values);
            $stmt->execute();

            $sql = "INSERT INTO usuariosLogin (usuario, email, password) VALUES (?, ?, ?)";
            $stmt = $conexion->prepare($sql);

            $stmt->bind_param("sss", $input->usuario, $input->email, $password);
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

            $sql = "UPDATE usuariosLogin SET " . implode(", ", $fields) . " WHERE usuario = ?";
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
