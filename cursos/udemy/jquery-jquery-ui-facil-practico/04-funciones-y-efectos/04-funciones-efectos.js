//  ***********************************************************************
//  **********  /04-funciones-y-efectos/04-funciones-efectos.js  **********  
//  ***********************************************************************  


$(document).ready(function () {

    
    console.warn('-----  04-funciones-efectos.js - cargado!!!  -- jQuery Versión ', $.fn.jquery);


    //  -----  Cambiar el título de la página  -----
    document.title = '04 - Funciones y Efectos';


    //  -------------------------------------------
    //  ----------  Funciones y Efectos  ----------
    //  -------------------------------------------

    //  ----------  show  ----------
    $("#show").on('click', function () {
        $("#animar1").show(2000);
    });

    //  ----------  hide  ----------
    $("#hide").on('click', function () {
        $("#animar1").hide(1000);
    });

    //  ----------  toggle  ----------
    $("#toggle").on('click', function () {
        $("#animar1").toggle(1000);
    });


    //  ----------  fadeIn  ----------
    $("#fadeIn").on('click', function () {
        $("#animar2").fadeIn(2000);
    });

    //  ----------  fadeOut  ----------
    $("#fadeOut").on('click', function () {
        $("#animar2").fadeOut(1000);
    });

    //  ----------  fadeToggle  ----------
    $("#fadeToggle").on('click', function () {
        $("#animar2").fadeToggle(1000);
    });

    //  ----------  fadeTo  ----------
    $("#fadeTo").on('click', function () {
        $("#animar2").fadeTo(1000, 0.5);
    });

    //  ----------  fadeTo  ----------
    $("#resetFadeTo").on('click', function () {
        $("#animar2").fadeTo(1000, 1);
    });


     //  ----------  slideDown  ----------
     $("#slideDown").on('click', function () {
        $("#animar3").slideDown();(2000);
    });

    //  ----------  slideUp  ----------
    $("#slideUp").on('click', function () {
        $("#animar3").slideUp(1000);
    });

    //  ----------  slideToggle  ----------
    $("#slideToggle").on('click', function () {
        $("#animar3").slideToggle(1000);
    });
    
    //  ----------  animate  ----------
    $("#lanzar").on('click', function() {
        
        $("#animar4")
            .delay(2000)
            .animate({
                width: 500
            }, 3000);

        $("#animar4")
            .delay(2000)
            .animate({
                height: 500
            }, 3000);

        $("#animar4")
            .delay(2000)
            .animate({
                width: 250,
                height: 250
            }, 3000);

    });
    

    //  ----------  animate + delay + Stop  ----------
    $("#animarBtn").on('click', function() {
        
        $("#animarPrimero")
            .delay(0)
            .animate({
                left: 300
            }, 3000)

        $("#animarSegundo")
            .delay(500)
            .animate({
                left: 300
            }, 3000)

        $("#animarTercero")
            .delay(1000)
            .animate({
                left: 300
            }, 3000)

        $("#animarCuarto")
            .delay(1500)
            .animate({
                left: 300
            }, 3000)
    });

    $("#stopBtn").on('click', function() {
        $(".animar__contenedores").stop();
        
    });

    $("#resetAnimacionBtn").on('click', function() {
        $(".animar__contenedores").css('left', 0);
    });


     //  ----------  callback  ----------
     $("#animarCallbackBtn").on('click', function() {

        $("#animarCallback").animate({ 
            left: 300 
        }, 3000, function() {
            $("p").show();
        });
        
     });

});
