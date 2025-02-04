<?php
function conexion()
{
    $mysqli_conexion = new mysqli("127.0.0.1", "phpmyadmin", "1234", "Puerto");
    if ($mysqli_conexion->connect_errno) {
        echo "Error de conexion: " . $mysqli_conexion->connect_errno;
    } else {
        echo "Conexion exitosa<br>";
    }
    return $mysqli_conexion;
}