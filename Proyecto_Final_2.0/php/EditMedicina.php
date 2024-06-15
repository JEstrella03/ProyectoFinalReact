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

if (empty($_POST["stock"])) {
    http_response_code(400);
	exit("falta insertar el nuevo stock"); #Terminar el script definitivamente
}

if (empty($_POST["precio"])) {
    http_response_code(400);
	exit("falta insertar el nuevo precio"); #Terminar el script definitivamente
}

//
$conex = new PDO("sqlite:" . $nombre_fichero);
$conex->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$medicina=[
    "id" => $_POST["id"],
    "nombre"=> $_POST["nombre"],
    "stock"=> $_POST["stock"],
    "precio"=> $_POST["precio"]
    
];
try{
    # preparando la consulta
    $sentencia = $conex->prepare("update Medicina set nombre=:nombre, stock=:stock, precio=:precio, where id=:id;");
    $resultado = $sentencia->execute($medicina);
    http_response_code(200);
    echo "datos actualizados";

}catch(PDOException $exc){
    http_response_code(400);
    echo "Lo siento, ocurrió un error:".$exc->getMessage();
}

?>