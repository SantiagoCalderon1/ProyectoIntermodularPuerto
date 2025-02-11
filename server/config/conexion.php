<?php

function openConexion()
{   
    //url local
    $mysqli = new mysqli('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
    
    //$mysqli = new mysqli('127.0.0.1', 'puerto', '%e2Ta?N>9!6', 'Puerto');

    if ($mysqli->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ")";
    }
    return $mysqli;
}

function closeConexion($conexion)
{
    $conexion->close();
}
