<?php
include 'varss.php';

#verificar si vienen losparametros requeridos
if (empty($_POST["id"])) {
    http_response_code(400);
	exit("Falta insertar el id a cambiar"); #Terminar el script definitivamente
}
#verificar si vienen losparametros requeridos
if (empty($_POST["nombre"])) {
    http_response_code(400);
	exit("Falta insertar el nuevo nombre"); #Terminar el script definitivamente
}

if (empty($_POST["edad"])) {
    http_response_code(400);
	exit("falta insertar la nueva edad"); #Terminar el script definitivamente
}


if (empty($_POST["estado"])) {
    http_response_code(400);
	exit("falta insertar el nuevo estado medico"); #Terminar el script definitivamente
}

if (empty($_POST["dueno"])) {
    http_response_code(400);
	exit("falta insertar el nuevo dueño"); #Terminar el script definitivamente
}

//
$conex = new PDO("sqlite:" . $nombre_fichero);
$conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$mascota=[
    "id" => $_POST["id"],
    "nombre"=> $_POST["nombre"],
    "edad"=> $_POST["edad"],
    "estado"=> $_POST["estado"],
    "dueno"=> $_POST["dueno"]
    
];
try{
    # preparando la consulta
    $sentencia = $conex->prepare("update Maskota set nombre=:nombre, edad=:edad, estado=:estado, dueno=:dueno, where id=:id;");
    $resultado = $sentencia->execute($mascota);
    http_response_code(200);
    echo "datos actualizados";

}catch(PDOException $exc){
    http_response_code(400);
    echo "Lo siento, ocurrió un error:".$exc->getMessage();
}

?>