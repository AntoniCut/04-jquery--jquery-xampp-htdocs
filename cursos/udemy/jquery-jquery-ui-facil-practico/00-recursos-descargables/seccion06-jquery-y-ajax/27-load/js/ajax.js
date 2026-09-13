$(document).ready(inicio);

function inicio(){
	$("#img1").click(imagenuno);
	$("#img2").click(imagendos);
	$("#txt1").click(textouno);
}

function imagenuno(){
	$("div").load("textos/foto1.txt");
}

function imagendos(){
	$("div").load("textos/foto2.txt");
}

function textouno(){
	$("div").load("textos/texto1.txt");
}