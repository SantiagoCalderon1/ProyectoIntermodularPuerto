<?php
function conexion()
{
    $mysqli = new mysqli('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
    if ($mysqli->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ")";
    }
    return $mysqli;
}

function closeConexion($conexion)
{
    $conexion->close();
}
?>
