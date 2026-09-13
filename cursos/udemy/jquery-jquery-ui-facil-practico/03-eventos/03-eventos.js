//  *************************************************
//  **********  /03-eventos/03-eventos.js  **********  
//  *************************************************  


$(document).ready(function () {

    
    console.warn('-----  03-eventos.js - cargado!!!  -- jQuery Versión ', $.fn.jquery);

    //  -----  Cambiar el título de la página  -----
    document.title = '03 - Eventos';


    //  ------------------------------------------
    //  ----------  Eventos de Teclado  ----------
    //  ------------------------------------------

    //  ----------  click  ----------
    $("#p1").on('click', function () {
        $(this).css('background-color', 'red');
    });

    //  ----------  dblclick  ----------
    $("#p1").on('dblclick', function () {
        $(this).css('background-color', 'blue');
    });

    //  ----------  mouseover  ----------
    $("#p2").on('mouseover', function () {
        $(this).css('background-color', 'green');
    });

    //  ----------  mouseout  ----------
    $("#p2").on('mouseout', function () {
        $(this).css('background-color', '#ffffff');
    });

    //  ----------  hover  ----------
    $("#p3").hover(
        function () {
            $(this).css('background-color', 'green');
        }, function () {
            $(this).css('background-color', '#ffffff');
        });


    //  ----------  mousedown  ----------
    $("#p4").on('mousedown', function () {
        $(this).css('background-color', 'green');
    });

    //  ----------  mouseup  ----------
    $("#p4").on('mouseup', function () {
        $(this).css('background-color', '#ffffff');
    });


    //  ------------------------------------------
    //  ----------  Eventos de Teclado  ----------
    //  ------------------------------------------

    //  ----------  keydown  ----------
    $(document).on('keydown', function () {
        $("#p5").css('background-color', 'red');
    });

    //  ----------  keyup  ----------
    $(document).on('keyup', function () {
        $("#p5").css('background-color', 'blue');
    });

    //  ----------  keypress  ----------
    $(document).on('keypress', function () {
        $("#p6").html('Has pulsado una tecla');
    });


    //  ---------------------------------------------
    //  ----------  Eventos de Formulario  ----------
    //  ---------------------------------------------

    //  ----------  focus  ----------
    $('input').on('focus', function () {
        $(this).css({
            color: '#ffffff',
            backgroundColor: 'red'
        });
    });

    //  ----------  blur  ----------
    $('input').on('blur', function () {
        $(this).css({
            color: 'black',
            backgroundColor: '#ffffff'
        });
    });

});

