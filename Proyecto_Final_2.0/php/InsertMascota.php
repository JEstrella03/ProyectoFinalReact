<?php
include 'vars.php';

#verificar si vienen losparametros requeridos
if (empty($_POST["nombre"])) {
    http_response_code(400);
	exit("Falta insertar el nombre"); #Terminar el script definitivamente
}

if (empty($_POST["edad"])) {
    http_response_code(400);
	exit("falta insertar la edad"); #Terminar el script definitivamente
}
if (empty($_POST["estado"])) {
    http_response_code(400);
	exit("falta insertar el estado"); #Terminar el script definitivamente
}
if (empty($_POST["dueno"])) {
    http_response_code(400);
	exit("falta insertar el dueño"); #Terminar el script definitivamente
}
//
$conex = new PDO("sqlite:" . $nombre_fichero);
$conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$mascota=[
    "nombre"=> $_POST["nombre"],
    "edad"=> $_POST["edad"],
    "estado"=> $_POST["estado"],
    "dueno"=> $_POST["dueno"]
];
try{
    # preparando la consulta
    $sentencia = $conex->prepare("insert into Maskota(nombre, edad, estado, dueno) values(:nombre, :edad, :estado, :dueno);");
    $resultado = $sentencia->execute($mascota);
    http_response_code(200);
    echo "datos insertados";

}catch(PDOException $exc){
    http_response_code(400);
    echo "Lo siento, ocurrió un error:".$exc->getMessage();
}

?>