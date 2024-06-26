<?php

// Verificar si la solicitud es de tipo OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    exit();
}

// Headers CORS para respuestas normales
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Verificar si el método de solicitud es POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Incluir archivo de conexión a la base de datos SQLite
    include 'conexion.php'; // Asegúrate de que este archivo establece la conexión en $conex

    // Obtener los datos del cuerpo de la solicitud (request body)
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se recibieron los datos esperados
    if (empty($data['nombre']) || empty($data['stock']) || empty($data['precio']) ) {
        http_response_code(400); // Bad Request
        echo json_encode(array('message' => 'Faltan datos requeridos para insertar el medicina'));
        exit();
    }

    // Preparar los datos del medicina
    $medicina = [
        'nombre' => $data['nombre'],
        'stock' => $data['stock'],
        'precio' => $data['precio'],
    
    ];

    try {
        // Preparar la consulta SQL para insertar el medicina
        $query = 'INSERT INTO Medicina (nombre, stock, precio) VALUES (:nombre, :stock, :precio)';
        $statement = $conex->prepare($query);

        // Ejecutar la consulta con los datos del medicina
        $result = $statement->execute($medicina);

        if ($result) {
            $id = $conex->lastInsertId(); // Obtener el ID del medicina insertado
            http_response_code(201); // Código 201: Created
            echo json_encode(array('message' => 'medicina registrada correctamente', 'id' => $id));
        } else {
            http_response_code(400); // Código 400: Bad Request
            echo json_encode(array('message' => 'Error al intentar insertar la medicina'));
        }
    } catch (PDOException $e) {
        http_response_code(500); // Código 500: Internal Server Error
        echo json_encode(array('message' => 'Error en la base de datos: ' . $e->getMessage()));
    } catch (Exception $e) {
        http_response_code(500); // Código 500: Internal Server Error
        echo json_encode(array('message' => 'Error en el servidor: ' . $e->getMessage()));
    }
} else {
    // Si el método de solicitud no es POST, retornar un error
    http_response_code(405); // Código 405: Method Not Allowed
    echo json_encode(array('message' => 'Método no permitido'));
}
?>