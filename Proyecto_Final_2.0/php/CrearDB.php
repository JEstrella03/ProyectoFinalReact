<?php

/**
 * Abre una base de datos de SQLite
 * @return object apuntador al manejadro de la BD
 */
function abrirDB()
{
    $archivo="./vetnegris.sqlite3";
    if(file_exists($archivo)){
        echo "la base de datos ya existe";
        return null;
    }else{
        $baseDeDatos = new PDO("sqlite:" . $archivo);
        $baseDeDatos->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $baseDeDatos;
    }
}
//____________________________________________________
/**
 * crea la tabla partes si no existe
 * @param object $baseDeDatos manejador de base de datos de sqlite
 */
function crearTablaMakota($baseDeDatos)
{
    $definicionTabla = "create table if not exists Maskota(
        id integer primary key autoincrement,
        nombre varchar(50),
        edad varchar(5),
        estado varchar(15),
        dueno varchar(50)
    );";

    $resultado = $baseDeDatos->exec($definicionTabla);
    return $resultado;
}
/**

 * @param object $baseDeDatos manejador de base de datos de sqlite
 */
function crearTablaEmpleado($baseDeDatos)
{
    $definicionTabla = "create table if not exists Empleados(
        id integer primary key autoincrement,
        cedula varchar(20),
        nombre varchar(30),
        puesto varchar(30) 

    );";

    $resultado = $baseDeDatos->exec($definicionTabla);
    return $resultado;
}

/* 
* @param object $baseDeDatos manejador de base de datos de sqlite
*/
function crearTablaMedicina($baseDeDatos)
{
   $definicionTabla = "create table if not exists Medicina(
       id integer primary key autoincrement,
       nombre varchar(50),
       stock varchar(5),
       precio varchar(15)
       
   );";

   $resultado = $baseDeDatos->exec($definicionTabla);
   return $resultado;
}
//_________________________________________________________
/**

 */
function insertaMaskota($baseDeDatos, $Maskota)
{
    $query="insert into Maskota(nombre, edad, estado, dueno) VALUES(:nombre, :edad, :estado, :dueno);";
    $sentencia = $baseDeDatos->prepare($query);
    $resultado = $sentencia->execute($Maskota);
    if ($resultado === true) {
        http_response_code(200);
        return true;
    } else {
        http_response_code(400);
        return false;
    }
}
/**
 
 */
function insertaEmpleados($baseDeDatos, $Empleados)
{
    $query="insert into Empleados(cedula, nombre, puesto) VALUES(:cedula, :nombre, :puesto);";
    $sentencia = $baseDeDatos->prepare($query);
    $resultado = $sentencia->execute($Empleados);
    if ($resultado === true) {
        http_response_code(200);
        return true;
    } else {
        http_response_code(400);
        return false;
    }
}

function insertaMedicina($baseDeDatos, $Medicina)
{
    $query="insert into Medicina(nombre, stock, precio) VALUES(:nombre, :stock, :precio);";
    $sentencia = $baseDeDatos->prepare($query);
    $resultado = $sentencia->execute($Medicina);
    if ($resultado === true) {
        http_response_code(200);
        return true;
    } else {
        http_response_code(400);
        return false;
    }
}
//____________________________________________________________---

function insertaDatosEmpleados($baseDeDatos, $DatosEmpleados)
{
    //insertar datos de ejeplo
    $Empleados = [
        "cedula" => "",
        "nombre" => "",
        "puesto" => ""
    ];
    foreach ($DatosEmpleados as $valor) {
        $Empleados["cedula"] = $valor["cedula"];
        $Empleados["nombre"] = $valor["nombre"];
        $Empleados["puesto"] = $valor["puesto"];
        insertaEmpleados($baseDeDatos, $Empleados);
    }
}

/**
 * Inserta un conjunto de registros de ejemplo


 */
function insertaDatosMaskota($baseDeDatos, $DatosMaskota)
{
    //insertar datos de ejemplo
    $Maskota = [
        "nombre" => "",
        "edad" => "",
        "estado" => "",
        "dueno" => ""
    ];
    foreach ($DatosMaskota as $valor) {
        $Maskota["nombre"] = $valor["nombre"];
        $Maskota["edad"] = $valor["edad"];
        $Maskota["estado"] = $valor["estado"];
        $Maskota["dueno"] = $valor["dueno"];
        insertaMaskota($baseDeDatos, $Maskota);
    }
}


/**
 * Inserta un conjunto de registros de ejemplo

 */
function insertaDatosMedicina($baseDeDatos, $DatosMedicina)
{
    //insertar datos de ejemplo
    $Medicina = [
        "nombre" => "",
        "stock" => "",
        "precio" => ""
        
    ];
    foreach ($DatosMedicina as $valor) {
        $Medicina["nombre"] = $valor["nombre"];
        $Medicina["stock"] = $valor["stock"];
        $Medicina["precio"] = $valor["precio"];

        insertaMedicina($baseDeDatos, $Medicina);
    }
}


//____________________________________________--

$db = abrirDB();
if ($db) {
    try{
        crearTablaMakota($db);
        insertaDatosMaskota($db, $DatosMaskota);

        crearTablaEmpleado($db);
        insertaDatosEmpleados($db, $DatosEmpleados);

        crearTablaMedicina($db);
        insertaDatosMedicina($db, $DatosMedicina);

        http_response_code(200);
        echo "ok";
    }catch(Exception $Exception){
        http_response_code(400);
        echo "Error: " . $Exception;
    }
} else {
    http_response_code(400);
    echo "la base de datos ya existe";
}

?>