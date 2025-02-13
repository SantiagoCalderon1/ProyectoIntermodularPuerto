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

function openConexionFTP()
{
    // Significados
    $ftp_servidor = "uat-puerto.proyectos-2daw.es/";
    $ftp_usuario = "puerto";
    $ftp_contraseña = "%e2Ta?N>9!6";

    $ftp_conexion = ftp_connect($ftp_servidor) or die("No se pudo conectar al servidor FTP.");
    $login = ftp_login($ftp_conexion, $ftp_usuario, $ftp_contraseña);
    ftp_pasv($ftp_conexion, true);
    return $$ftp_conexion;
}

function closeConexion($conexion)
{
    $conexion->close();
}
