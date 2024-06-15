<?php
include 'varss.php';

#verificar si vienen losparametros requeridos
if (empty($_POST["id"])) {
    http_response_code(400);
	exit("Falta insertar el id a cambiar"); #Terminar el script definitivamente
}

if (empty($_POST["cedula"])) {
    http_response_code(400);
	exit("falta insertar el nueva cedula"); #Terminar el script definitivamente
}

#verificar si vienen losparametros requeridos
if (empty($_POST["nombre"])) {
    http_response_code(400);
	exit("Falta insertar el nuevo nombre"); #Terminar el script definitivamente
}
if (empty($_POST["puesto"])) {
    http_response_code(400);
	exit("falta insertar el nuevo puesto"); #Terminar el script definitivamente
}

//
$conex = new PDO("sqlite:" . $nombre_fichero);
$conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$empleado=[
    "id" => $_POST["id"],
    "nombre"=> $_POST["nombre"],
    "cedula"=> $_POST["cedula"],
    "puesto"=> $_POST["puesto"]
    
];
try{
    # preparando la consulta
    $sentencia = $conex->prepare("update Empleado set  cedula=:cedula, nombre=:nombre, puesto=:puesto, where id=:id;");
    $resultado = $sentencia->execute($empleado);
    http_response_code(200);
    echo "datos actualizados";

}catch(PDOException $exc){
    http_response_code(400);
    echo "Lo siento, ocurrió un error:".$exc->getMessage();
}

?>