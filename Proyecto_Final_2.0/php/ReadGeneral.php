<?php
include 'varss.php';

$conex = new PDO("sqlite:" . $nombre_fichero); 

// Obtener datos de la tabla de Maskota
$stmt_Maskota = $conex->prepare('SELECT * FROM Maskota;');
$stmt_Maskota->execute();
$Maskota = $stmt_Maskota->fetchAll(PDO::FETCH_ASSOC);

// Obtener datos de la tabla de Empleados
$stmt_Empleados = $conex->prepare('SELECT * FROM Empleados;');
$stmt_Empleados->execute();
$Empleados = $stmt_Empleados->fetchAll(PDO::FETCH_ASSOC);

// Obtener datos de la tabla de Medicina
$stmt_Medicina = $conex->prepare('SELECT * FROM Medicina;');
$stmt_Medicina->execute();
$Medicina = $stmt_Medicina->fetchAll(PDO::FETCH_ASSOC);

// Cerrar las consultas y la conexión
$stmt_Maskota = null;
$stmt_Empleados = null;
$stmt_Medicina = null;
$conex = null;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datos Generales</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
</head>
<body>

<div class="w3-container">
    <h2>Datos Generales</h2>

    <div class="w3-row">
        <div class="w3-col m4">
            <h3>Maskota</h3>
            <table class="w3-table-all">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Estado</th>
                        <th>Dueño</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($Maskota as $producto): ?>
                    <tr>
                        <td><?= $producto['id'] ?></td>
                        <td><?= $producto['nombre'] ?></td>
                        <td><?= $producto['edad'] ?></td>
                        <td><?= $producto['estado'] ?></td>
                        <td><?= $producto['dueno'] ?></td>
                     
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <div class="w3-col m4">
            <h3>Empleados</h3>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Puesto</th>
                    
                </tr>
            </thead>
            <tbody>
                <?php
                    include 'varss.php';

                    $conex = new PDO("sqlite:" . $nombre_fichero); 
                    $stmt_Empleados = $conex->prepare('SELECT * FROM Empleados;');
                    $stmt_Empleados->execute();
                    $Empleados = $stmt_Empleados->fetchAll(PDO::FETCH_ASSOC);
                    foreach ($Empleados as $empleado) {
                        echo "<tr>";
                        echo "<td>{$empleado['id']}</td>";
                        echo "<td>{$empleado['cedula']}</td>";
                        echo "<td>{$empleado['nombre']}</td>";
                        echo "<td>{$empleado['puesto']}</td>";
                       
                        echo "</tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>

        <div class="w3-col m4">
            <h3>Medicina</h3>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                   
                </tr>
            </thead>
            <tbody>
                <?php
                include 'varss.php';

                $conex = new PDO("sqlite:" . $nombre_fichero); 
                $stmt_Medicina = $conex->prepare('SELECT * FROM Medicina;');
                $stmt_Medicina->execute();
                $Medicina = $stmt_Medicina->fetchAll(PDO::FETCH_ASSOC);
                foreach ($Medicina as $medicina) {
                    echo "<tr>";
                    echo "<td>{$medicina['id']}</td>";
                    echo "<td>{$medicina['nombre']}</td>";
                    echo "<td>{$medicina['stock']}</td>";
                    echo "<td>{$medicina['precio']}</td>";
                    echo "</tr>";
                }
                ?>
            </tbody>
        </table>
    </div>

</body>
</html>