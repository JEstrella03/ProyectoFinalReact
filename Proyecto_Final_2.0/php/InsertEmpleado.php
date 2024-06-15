<?php
include 'varss.php';

#verificar si vienen losparametros requeridos


if (empty($_POST["cedula"])) {
    http_response_code(400);
	exit("falta insertar la cedula"); #Terminar el script definitivamente
}
if (empty($_POST["nombre"])) {
    http_response_code(400);
	exit("Falta insertar el nombre"); #Terminar el script definitivamente
}
if (empty($_POST["puesto"])) {
    http_response_code(400);
	exit("falta insertar el puesto"); #Terminar el script definitivamente
}

//
$conex = new PDO("sqlite:" . $nombre_fichero);
$conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$empleado=[
    "nombre"=> $_POST["nombre"],
    "cedula"=> $_POST["cedula"],
    "puesto"=> $_POST["puesto"]
    
];
try{
    # preparando la consulta
    $sentencia = $conex->prepare("insert into Empleado( cedula, nombre, puesto) values( :cedula,:nombre, :puesto);");
    $resultado = $sentencia->execute($empleado);
    http_response_code(200);
    echo "datos insertados";

}catch(PDOException $exc){
    http_response_code(400);
    echo "Lo siento, ocurrió un error:".$exc->getMessage();
}

?>