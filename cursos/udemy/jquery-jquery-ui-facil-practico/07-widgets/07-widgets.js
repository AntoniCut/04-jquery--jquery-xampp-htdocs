//  *************************************************
//  **********  /07-widgets/07-widgets.js  **********  
//  *************************************************  


$(document).ready(function () {

    
    console.warn('-----  07-widgets.js - cargado!!!  -- jQuery Versión ', $.fn.jquery);
    

    //  -----  Cambiar el título de la página  -----
    document.title = '07 - Widgets';

    
    //  --------------------------------------------
    //  ----------  Widgets Interesantes  ----------
    //  --------------------------------------------

    //  ------------------------------------
    //  ----------  jQuery Color  ----------
    //  ------------------------------------
    $("#iniciarAnimacion").on('click', function () {

        $(".animacion-elemento1").animate({
            left: 200,
            top: 100,
            backgroundColor: 'green'    //  se anima gracias al plugin jquery.color-2.1.0.min.js
        }, 1000);
    });


    //  -------------------------------------
    //  ----------  jQuery Easing  ----------
    //  -------------------------------------

    //  ----------  Easing  -------------------------------------------------------------------------------------------------
    //  -----  linear           swing            easeInQuad          easeOutQuad     easeInOutQuad                      -----
    //  -----  easeInCubic      easeOutCubic     easeInOutCubic      easeInQuart     easeOutQuart      easeInOutQuart   -----  
    //  -----  easeInSine       easeOutSine      easeInOutSine       easeInExpo      easeOutExpo       easeInOutExpo    -----
    //  -----  easeInQuint      easeOutQuint     easeInOutQuint      easeInCirc      easeOutCirc       easeInOutCirc    -----
    //  -----  easeInElastic    easeOutElastic   easeInOutElastic    easeInBack      easeOutBack       easeInOutBack    -----
    //  -----  easeInBounce     easeInOutBounce  easeOutBounce                                                          -----                                                                                  -----
    //-----------------------------------------------------------------------------------------------------------------------

    $("#bajar").on('click', function () {

        const easing = $('#easing-select').val();
        console.log(easing)

        $(".animacion-elemento2").slideDown(3000, `${easing}`);
        $(".animacion-elemento2").css('rotate', 90);

    });

    $("#subir").on('click', function () {

        const easing = $('#easing-select').val();
        console.log(easing);

        $(".animacion-elemento2").slideUp(3000, `${easing}`);
    });


    //  -------------------------------------
    //  ----------  jQuery Rotate  ----------
    //  -------------------------------------

    //  -----  Rotacioón al pulsar el botón  -----
    $("#btnRotate").on('click', function () {

        //  -----  Aplica rotación estática de 45 grados  -----
        $('.animacion-elemento3').css('rotate', 45);

        //  -----  Anima la rotación de la imagen hasta 180 grados en 2 segundos  -----
        $('.image-rotate').animate({ rotate: 180 }, {
            duration: 2000,
            step: function (now) {
                $(this).css('rotate', now); // Actualiza el ángulo en cada paso
            },
            complete: function () {
                alert('Animación completada!');
            }
        });
    });


    //  -----  Rotación Infinita del Elemento 4  -----
    let angle = 0;
    $animacionElemento4 = $('.animacion-elemento4');
    setInterval(() => {

        $animacionElemento4.animate({ rotate: angle }, {
            duration: 3000,
            step: function (now) {
                $(this).css('rotate', now); // Actualiza el ángulo en cada paso
            }
        }, 500);

        if(angle === 360) angle = 0;

        angle += 30;
    });



    //  ---------------------------------------------- 
    //  ----------  jQuery Plugin $goMap()  ---------- 
    //  ---------------------------------------------- 

    //  -----  función del plugin de Google Maps  -----
    $("#mapa").goMap({
        //address: 'Madrid',    address - No funciona
        latitude: 37.9863873,
        longitude: -1.1347364,
        zoom: 16,
        // maptype:   "TERRANE"
        maptype: "SATELITE",
        scaleControl: true,
        // markers: [           No Funciona
        //     {
        //         address: 'Nueva York Estados Unidos'
        //     }
        // ]
    });

    $.goMap.createMarker({
        latitude: 37.9863873,
        longitude: -1.1347364,
        title: "Gran Via",
        html: {
            content: "<h2> Calle Gran via Escultor Salzillo, Murcia </h2>",
            popup: false
        }

    });


    //  ---------------------------------------------- 
    //  ----------  jQuery Plugin validate  ---------- 
    //  ---------------------------------------------- 
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


    //  ----------------------------------------------- 
    //  ----------  jQuery Plugin QuickSand  ---------- 
    //  ----------------------------------------------- 
    
    $("#btn-colores").on('click', function () {
        $("#principal").quicksand($("#colores li"));
    });


    $("#btn-frutas").on('click', function () {
        $("#principal").quicksand($("#frutas li"));
    });


    $("#btn-todos").on('click', function () {
        $("#principal").quicksand($("#todos li"));
    });


    //  -------------------------------------------- 
    //  ----------  jQuery Plugin kwicks  ---------- 
    //  -------------------------------------------- 

    $('#example1').kwicks({
        max: 205,
        spacing: 5
    });



    //  -----------------------------------------------  
    //  ----------  jQuery Plugin Cycle All  ----------  
    //  -----------------------------------------------  

    //  ----------  Easing  -------------------------------------------------------------------------
    
    //  blindX  blindY  blindZ      cover       curtainX    curtainY        fade        fadeZoom
    //  growX   growY   scrollUp    scrollDown  scrollLeft  scrollRight     scrollHorz  scrollVert
    //  shuffle slideX  slideY      toss        turnUp      turnDown        turnLeft    turnRight   
    //  uncover wipe    zoom    

    //  ---------------------------------------------------------------------------------------------

    $("#btn-cycle-effect").on('click', function () {

        //  -----  Efectos  -----
        const effect = $('#select-cycle-effect').val();
        console.log(effect);

        //  -----  Easing descritos más arriba  -----
        const easing = $('#easing-select2').val();
        console.log(easing);

        $.fn.cycle.defaults.speed = 2000;
        $.fn.cycle.defaults.timeout = 500;

        $("#cycleContainer").cycle({
            fx: effect, 
            easing: easing,
            pause: 1
        });
      
    });
    
});
