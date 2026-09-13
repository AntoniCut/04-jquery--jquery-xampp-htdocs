$(document).ready(inicio);

function inicio(){
	$("#form1").validate({
		rules:{
			nombre:'required',
			apellidos:{
				required:true,
				minlength:2,
				maxlength:25
			},
			email:{
				required:true,
				email:true,				
			},
			edad:{
				required:true,
				min:18,
				max:99,
			},
		},
		messages:{
			nombre:{
				required:"Escriba su nombre, por favor",
			},
			apellidos:{
				required:"Escriba su apellido, por favor",
				minlength:"El apellido debe tener al menos 2 carácteres",
				maxlength:"El apellido debe tener como máximo 25 carácteres",
			},
			email:{
				required:"Escriba su email, por favor",
				email:"Introduzca una dirección válida",
			},
			edad:{
				required:"Escriba su edad, por favor",
				min:"Debes tener al menos 18 años",
				max:"Edad no válida",
			},
		}
	});
}