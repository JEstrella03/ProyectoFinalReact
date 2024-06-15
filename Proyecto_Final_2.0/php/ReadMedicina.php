<?php
include 'varss.php';

$conex = new PDO("sqlite:" . $nombre_fichero); 

// Obtener datos de la tabla de Medicina
$stmt_Medicina = $conex->prepare('SELECT * FROM Medicina;');
$stmt_Medicina->execute();
$Medicina = $stmt_Medicina->fetchAll(PDO::FETCH_ASSOC);

// Cerrar las consultas y la conexión
$stmt_Medicina = null;
$conex = null;

// Responder con los datos obtenidos
$response_data = array(
    'Medicina' => $Medicina
);

http_response_code(200);
echo json_encode($response_data);
?>