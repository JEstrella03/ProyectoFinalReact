<?php

// Conexión a la base de datos SQLite
$db = new SQLite3('vetnegris.sqlite3');

// Obtener los datos del cuerpo de la solicitud (request body)
$data = json_decode(file_get_contents('php://input'), true);

// Extraer los datos del mascota
$id = $data['id'];
$nombre = $data['nombre'];
$edad = $data['edad'];
$estado = $data['estado'];
$dueno = $data['dueno'];



// Preparar la consulta SQL para actualizar el mascota
$stmt = $db->prepare('UPDATE Maskota SET   nombre = :nombre, edad = :edad, estado = :estado, dueno = :dueno,   WHERE id = :id');
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
$stmt->bindValue(':edad', $edad, SQLITE3_TEXT);
$stmt->bindValue(':nombre', $nombre, SQLITE3_TEXT);
$stmt->bindValue(':estado', $estado, SQLITE3_TEXT);
$stmt->bindValue(':dueno', $dueno, SQLITE3_TEXT);


// Ejecutar la consulta
$result = $stmt->execute();

if ($result) {
    // Éxito al actualizar el mascota
    $response = array('message' => 'mascota actualizada correctamente');
    http_response_code(200); // Código 200: OK
    echo json_encode($response);
} else {
    // Error al actualizar el mascota
    $response = array('message' => 'Error al intentar actualizar el mascota');
    http_response_code(500); // Código 500: Internal Server Error
    echo json_encode($response);
}

$db->close();
?>