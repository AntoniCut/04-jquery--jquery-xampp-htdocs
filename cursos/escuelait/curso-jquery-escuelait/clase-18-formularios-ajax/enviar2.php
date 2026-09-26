<?php
//espera
sleep(4);

if(strlen(trim($_POST["nombre"])) < 5){
    //no es valido
    $respuesta = array("valido"=>false, "mensaje"=>"Error de validación");
}else{
    //si es valido
    $respuesta = array("valido"=>true, "mensaje"=>"gracias " . $_POST["nombre"]);
}
echo json_encode($respuesta);
?>