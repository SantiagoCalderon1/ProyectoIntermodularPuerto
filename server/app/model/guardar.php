<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'mi_base_de_datos';
$username = 'root';
$password = '';

// Conectar a la base de datos
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Error de conexión: ' . $e->getMessage());
}

// Recibir datos del formulario
$id_usuario = $_POST['id_usuario'];
$documento_url = $_POST['documento_url'];  // URL del archivo

// Insertar la URL del documento en la base de datos
$query = "INSERT INTO documentos (id_usuario, documento_url) VALUES (:id_usuario, :documento_url)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':id_usuario', $id_usuario);
$stmt->bindParam(':documento_url', $documento_url);

if ($stmt->execute()) {
    echo json_encode(['success' => 'Documento guardado correctamente']);
} else {
    echo json_encode(['error' => 'Error al guardar el documento']);
}
?>
