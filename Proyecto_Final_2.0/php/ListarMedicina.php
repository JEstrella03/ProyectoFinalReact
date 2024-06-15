<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Incluir la configuración de la conexión a la base de datos SQLite
include 'conexion.php'; // Asegúrate de que este archivo incluya la conexión a la base de datos SQLite

try {
    // Consulta SQL para seleccionar todos los Medicina
    $query = "SELECT * FROM Medicina";
    $statement = $conex->prepare($query);
    $statement->execute();

    // Obtener los resultados de la consulta
    $Medicina = $statement->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los Medicina como JSON
    echo json_encode($Medicina);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(array("message" => "Error al obtener Medicina: " . $e->getMessage()));
}
?>