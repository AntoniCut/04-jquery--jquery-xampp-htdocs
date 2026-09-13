//  **************************************************************************
//  **********  /01-primeros-pasos-introduccion/01-introduccion.js  **********  
//  **************************************************************************  


$(document).ready(function () {


    console.warn('-----  01-introduccion.js - cargado!!!  -- jQuery Versión ', $.fn.jquery);
    
    //  -----  Cambiar el título de la página  -----
    document.title = '01 - Introducción';


    //  ---------------------------------------------
    //  ----------  Introducción a jQuery  ----------
    //  ---------------------------------------------
    
    $("p").click(function () {
        
        $(this)
            .css({
                color: "white",
                backgroundColor: "green",
                fontSize: "24px",
            })
            .text("He cambiado mi estilo");
    });

});
