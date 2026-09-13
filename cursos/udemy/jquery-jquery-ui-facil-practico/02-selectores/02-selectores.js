//  *******************************************************
//  **********  /02-selectores/02-selectores.js  **********  
//  *******************************************************  


$(document).ready(function () {


    console.warn('-----  02-selectores.js - cargado!!!  -- jQuery Versión ', $.fn.jquery);

    //  -----  Cambiar el título de la página  -----
    document.title = '02 - Selectores';


    //  ------------------------------------------
    //  ----------  Selectores Básicos  ----------
    //  ------------------------------------------


    //  ----------  selector universal '*'  ----------
    $("*").click(function () {


        //const $elemento = $(this);
        //$elemento.css('background-color', 'black');

        // setTimeout(function () {
        //     $elemento.css('background-color', '#ffffff');
        // }, 3000);
    });


    //  ----------  selector de 'etiqueta'  ----------
    $("p").click(function (event) {
        $(this).css('background-color', 'red');
        event.stopPropagation();
    });


    //  ----------  selector de 'id'  ----------
    $("#primero").click(function () {
        $(this).css('background-color', 'green');
    });


    //  ----------  selector de 'clase'  ----------
    $(".parrafo").click(function () {
        $(this).css('background-color', 'blue');
    });



    //  ----------------------------------------------
    //  ----------  Selectores de Atributo  ----------
    //  ----------------------------------------------

    //  -----  atributo href  -----
    $("[href]").click(function () {
        $(this).css('background-color', 'lightgreen');
    });

    //  -----  atributo href que no contenga una url  -----
    $("[href='https://udemy.antonydev.tech/jquery-de-cero-a-avanzado']").click(function () {
        $(this).css('background-color', 'lightblue');
    });

    //  -----  atributo href que no contenga una url  -----
    $("[href!='https://udemy.antonydev.tech/jquery-de-cero-a-avanzado']").click(function () {
        //$(this).css('background-color', 'violet');
    });

    //  -----  atributo que contenga .es  -----
    $("[href$='.es']").click(function () {
        $(this).css('background-color', 'blue');
    });



    //  ----------------------------------------------
    //  ----------  Selectores de Posición  ----------
    //  ----------------------------------------------

    //  -----  :even - posición impar - la primera posición siempre es cero que es par  -----
    //  -----  :odd - posición par - la primera posición siempre es cero que es par  -----
    $("h4").click(function () {
        $("h4:even").css('background-color', 'green');
        $("h4:odd").css('background-color', 'red');
    });


    //  -----  :first - primer elemento  -----
    $("h4:first").click(function () {
        $(this).css('font-size', '24px');
    });

    //  -----  :last - ultimo elemento  -----
    $("h4:last").click(function () {
        $(this).css('font-size', '56px');

    });

    //  -----  :eq() - elemento en la posición seleccionada  -----
    $(".btn-selector-eq").on('click', function () {
        $('h5:eq(2)').css('color', 'lightcoral');
    });

    //  -----  :gt() - de la posición seleccionada a mayor  -----
    $(".btn-selector-gt").on('click', function () {
        $('h5:gt(1)').css('color', 'lightblue');
    });

    //  -----  :lt() - de la posición seleccionada a menor  -----
    $(".btn-selector-lt").on('click', function () {
        $('h5:lt(3)').css('background-color', 'yellow');
    });



    //  ------------------------------------------------
    //  ----------  Selectores de Parentesco  ----------
    //  ------------------------------------------------

    //  -----  seleccionamos todos los p del div con id contenedor  -----
    $("#btn1").click(function () {
        $("#contenedor p").css('background-color', 'red');
    });


    //  -----  seleccionamos el p hijo directo del div con id contenedor  -----
    $("#btn2").click(function () {
        $("#contenedor > p").css('background-color', 'blue');
    });


    //  -----  seleccionamos todas las p que sean hermanos de la p con id p1  -----
    $("#btn3").click(function () {
        $("p#p1 ~ p").css('background-color', 'green');
    });


    //  -----  selecciona a los hermanos adyacentes de p1  -----
    $("#btn4").click(function () {
        $("p#p1 + p").css('background-color', 'gray');
    });

    //  -----  seleccionamos todas las p con id p5 y todos los span  -----
    $("#btn5").click(function () {
        $("#p5, span").css('background-color', 'orange');
    });

});

