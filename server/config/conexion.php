<?php

function openConnection()
{
    $mysqli = new mysqli('127.0.0.1', 'rufes', '1234', 'pruebas');
    if ($mysqli->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ")";
    }
    return $mysqli;
}

function closeConnection($conexion)
{
    $conexion->close();
}
