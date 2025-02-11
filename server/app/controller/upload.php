<?php
// Configuración de la carpeta de destino
$uploadDir = 'uploads/';
$allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

// Comprobar si el archivo fue enviado
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    
    // Validar tipo de archivo
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode(['error' => 'Tipo de archivo no permitido.']);
        exit;
    }
    
    // Crear nombre único para el archivo
    $fileName = time() . '-' . basename($file['name']);
    $filePath = $uploadDir . $fileName;

    // Mover archivo a la carpeta de destino
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        echo json_encode(['filePath' => 'http://localhost/api/' . $filePath]);
    } else {
        echo json_encode(['error' => 'Error al subir el archivo.']);
    }
} else {
    echo json_encode(['error' => 'No se ha enviado ningún archivo.']);
}
?>
