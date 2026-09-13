$(document).ready(inicio);

function inicio(){
	$("#enviar").click(envio);
}

function envio(){
	$.post("enviar.php", $("#form1").serialize(),recibirDatos);
	return false;
}

function recibirDatos(datos){
	$("div").text(datos);
}
