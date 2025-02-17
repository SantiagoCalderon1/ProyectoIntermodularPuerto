<?php
function openConexion()
<<<<<<< HEAD
{   
    //url local
    $mysqli = new mysqli('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
    
    // $mysqli = new mysqli('127.0.0.1', 'puerto', '%e2Ta?N>9!6', 'Puerto');
=======
{
    // Probar en local
    // http://localhost:8080/server/app/controller/ controlador aquí .php
    // Probar en url prueba
    //urlApi = "https://uat-puerto.proyectos-2daw.es/app/controller/ controlador aquí .php";
    // Probar en url producción
    //urlApi = "https://puerto.proyectos-2daw.es/app/controller/ controlador aquí .php";

    // conexión local
    //$mysqli = new mysqli('127.0.0.1', 'phpmyadmin', '1234', 'Puerto');
    // conexión producción o test uat
    $mysqli = new mysqli('127.0.0.1', 'puerto', '%e2Ta?N>9!6', 'Puerto');
>>>>>>> unionUsuarioRolFuncionalidad

    if ($mysqli->connect_errno) {
        echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ")";
    }
    return $mysqli;
}

function closeConexion($conexion)
{
    $conexion->close();
}
