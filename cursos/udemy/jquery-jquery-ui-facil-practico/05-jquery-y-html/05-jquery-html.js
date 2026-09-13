//  ***********************************************************
//  **********  /05-jquery-y-html/05-jquery-html.js  **********  
//  ***********************************************************  


$(document).ready(function () {

    
    console.warn('-----  05-jquery-html.js - cargado!!!  -- jQuery Versión ', $.fn.jquery);


    //  -----  Cambiar el título de la página  -----
    document.title = '05 - jQuery y HTML';

    
    //  -------------------------------------
    //  ----------  jQuery y HTML  ----------
    //  -------------------------------------


    //  -----  text()  -----

    function respuesta(resp) {
        $(".respuesta").text('Has Respondido que ' + resp);
    }

    $("#si").on('click', function () {
        respuesta('SI');
    });

    $("#no").on('click', function () {
        respuesta('NO')
    });

    $("#mostrar").on('click', function () {
        alert($(".respuesta").text());
    });


    //  -----  attr()  -----

    $("#foto1").on('click', function () {
        $(".imagen").attr('src', '../assets/img/gato.jpeg')
    });

    $("#foto2").on('click', function () {
        $(".imagen").attr('src', '../assets/img/oso-pardo.jpeg');
    });

    $("#foto3").on('click', function () {
        $(".imagen").attr('src', '../assets/img/perro.jpeg');
    });

    $("#foto4").on('click', function () {
        $(".imagen").attr('src', '../assets/img/tortuga-tailandia.jpeg');
    });

    $("#quitar").on('click', function () {
        $(".imagen").removeAttr('src');
    });


    //  -----  val()  -----

    $(".input-valor").on('keyup', function () {

        const valor = $(this).val();
        $(".resultado").text(valor);
    });

    $("#autorrellena").on('click', function () {
        $(".input-valor").val('Input rellenado desde el botón');
    });


    //  -----  Html()  -----
    $("#añadirTexto").on('click', function () {
        $(".texto-añadido").html('<h2 style="color: red;"> Foto de un Gato - Añadido con Html </h2>');
    });

    //  -----  append()  -----
    $("#añadirDespues").on('click', function () {
        $(".texto-añadido").append('<h2 style="color: blue;"> Foto de un Gato - Añadido con Append </h2>');
    });

    //  -----  prepend()  -----
    $("#añadirAntes").on('click', function () {
        $(".texto-añadido").prepend('<h2 style="color: orange;"> Foto de un Gato - Añadido con Prepend </h2>');
    });

    //  -----  after()  -----
    $("#añadirAfter").on('click', function () {
        $(".texto-añadido").after('<h2 style="color: green;"> Foto de un Gato - Añadido con After </h2>');
    });

    //  -----  before()  -----
    $("#añadirBefore").on('click', function () {
        $(".texto-añadido").before('<h2 style="color: gold;"> Foto de un Gato - Añadido con Before </h2>');
    });


    //  -----  empty()  -----
    $("#limpiarTexto").on('click', function () {
        $(".ejemplo-remove-empty").empty();
    });

    $("#eliminarTexto").on('click', function () {
        $(".ejemplo-remove-empty").remove();
    });


    //  -----  Método css()  -----
    
    $("#añadirCSS").on('click', function () {

        $(".ejemplo-css").css({
            color: 'orange'
        });
    });

    $("#eliminarCSS").on('click', function () {

        $(".ejemplo-css").css({
            color: ''
        });
    });

    $("#añadirClase").on('click', function () {
        $(".ejemplo-css").addClass('rojo-fuente');
    });

    $("#eliminarClase").on('click', function () {
        $(".ejemplo-css").removeClass('rojo-fuente');
    });

    $("#alternarClase").on('click', function () {
        $(".ejemplo-css").toggleClass('rojo-fuente');
    });

});
