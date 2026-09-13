<?php
sleep(2);
$pais = $_GET["pais"];

// if (!isset($_GET["provincia"])){

// }

//consulta a BBDD....

if($pais == "es"){
	$madrid = array("cod" => "m", "value"=>"Madrid");
	$barcelona = array("cod" => "b", "value"=>"barcelona");
	$valencia = array("cod" => "v", "value"=>"Valencia");
	$leon = array("cod" => "le", "value"=>"León");
	////.....
	$provincias = array($madrid, $barcelona, $valencia, $leon);
}elseif($pais == "-"){
	$nada = array("cod" => "-", "value"=>"Selecciona el país");
	$provincias = array($nada);
}elseif($pais=="ar"){
	$provincias = array(array("cod" => "ba", "value" => "Buenos Aires"), array("cod" => "m", "value" => "Mendoza"), array("cod" => "s", "value" => "Salta"), array("cod" => "c", "value" => "Córdoba"));
}elseif($pais=="br"){
	$provincias = array(array("cod" => "sc", "value" => "Santa Catarina"), array("cod" => "rj", "value" => "Rio de Janeiro"), array("cod" => "sp", "value" => "Sao Paulo"), array("cod" => "pa", "value" => "Paraná"), array("cod" => "ba", "value" => "Belém de Pará"));
}elseif($pais=="mx"){
	$provincias = array(array("cod" => "df", "value" => "Distrito Federal"), array("cod" => "ca", "value" => "Cancún"));
}else{
	$nada = array("cod" => "-", "value" => "Selecciona el país");
	$provincias = array($nada);
}

//var_dump($provincias);

$json = json_encode($provincias);

if (isset($_GET["callback"])) {
	header("Content-Type: application/javascript; charset=UTF-8");
	echo $_GET["callback"] . "(" . $json . ");";
} else {
	header("Content-Type: application/json; charset=UTF-8");
	echo $json;
}