<?php

// Conexión a la base de datos SQLite
$db = new SQLite3('vetnegris.sqlite3');

// Obtener los datos del cuerpo de la solicitud (request body)
$data = json_decode(file_get_contents('php://input'), true);

// Extraer los datos del Empleado
$id = $data['id'];
$cedula = $data['cedula'];
$nombre = $data['nombre'];
$puesto = $data['puesto'];


// Preparar la consulta SQL para actualizar el Empleado
$stmt = $db->prepare('UPDATE Empleado SET  cedula = :cedula, nombre = :nombre, puesto = :puesto,  WHERE id = :id');
$stmt->bindValue(':id', $id, SQLITE3_INTEGER);
$stmt->bindValue(':cedula', $cedula, SQLITE3_TEXT);
$stmt->bindValue(':nombre', $nombre, SQLITE3_TEXT);
$stmt->bindValue(':puesto', $puesto, SQLITE3_TEXT);


// Ejecutar la consulta
$result = $stmt->execute();

if ($result) {
    // Éxito al actualizar el Empleado
    $response = array('message' => 'Empleado actualizado correctamente');
    http_response_code(200); // Código 200: OK
    echo json_encode($response);
} else {
    // Error al actualizar el Empleado
    $response = array('message' => 'Error al intentar actualizar el Empleado');
    http_response_code(500); // Código 500: Internal Server Error
    echo json_encode($response);
}

$db->close();
?>