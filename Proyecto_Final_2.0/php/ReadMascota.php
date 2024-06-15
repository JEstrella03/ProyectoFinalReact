<?php
include 'varss.php';

$conex = new PDO("sqlite:" . $nombre_fichero); 

// Obtener datos de la tabla de Maskota
$stmt_Maskota = $conex->prepare('SELECT * FROM Maskota;');
$stmt_Maskota->execute();
$Maskota = $stmt_Maskota->fetchAll(PDO::FETCH_ASSOC);

// Cerrar las consultas y la conexión
$stmt_Maskota = null;
$conex = null;

// Responder con los datos obtenidos
$response_data = array(
    'Maskota' => $Maskota
);

http_response_code(200);
echo json_encode($response_data);
?>