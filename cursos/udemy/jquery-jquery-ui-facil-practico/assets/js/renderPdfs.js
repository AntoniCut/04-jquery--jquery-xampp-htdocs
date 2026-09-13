//  ***********************************************
//  **********  /asset/js/renderPdfs.js  **********
//  ***********************************************


$(document).ready(function () {


    console.warn('-----  renderPdfs.js - cargado!!!  -----');

    $(".btn-close-pdf").hide();


    $(".btnPdf").on("click", function () {

        // Ocultar todos los PDFs
        $(".pdf").fadeOut(1000);

        //  -----  Mostrar todos los botones y Ocultar el que toca  ----- 
        $(".btnPdf").show();
        $(".btn-close-pdf").show();
        $(this).hide();

        //  -----  Mostrar el Botón de Cerrar los PDFs  -----
        //$(".btn-close-pdf").hide();

        // Obtener el ID del botón clicado y construir el ID del PDF correspondiente
        const pdfId = $(this).attr("id").replace("btn", "");

        // Mostrar solo el PDF correspondiente
        $(`#${pdfId}`).fadeIn(1000);
    });


    $(".btn-close-pdf").on('click', function () {
        $(".pdf").fadeOut(1000);
        $(".btnPdf").show();
        $(this).hide();
    });

});


