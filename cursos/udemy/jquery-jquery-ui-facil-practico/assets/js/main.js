//  ******************************************
//  **********  /assets/js/main.js  **********
//  ******************************************


let $containerTemporal = $('#renderHtml');
//console.log($containerTemporal);


$(document).ready(function () {


    console.warn('---------- main.js - Cargado!!! ----- jQuery version:', $.fn.jquery, ' ----------', '\n');


    //  -----  Carga del HEADER  -----
    $("#header").load('./assets/html/header.html', function () {

        //  -----  NavBar Menú Secciones  -----
        renderSeccionesMenu();

        //  -----  ocultar Menú Secciones del Curso -----
        $('#header .navbar__list').hide();

        //  -----  Mostrar / Ocultar  --  Menú Secciones del Curso  -----
        $("#header").on('click', '.navbar__title', function () {

            //  -----  Cambiar el pathname de la URL del navegador  -----
            history.pushState({}, '/', '/');

            document.title = 'Aprende jQuery de Forma Facil y Práctica - Udemy - Antonio Santos';

            $(".navbar__list").slideToggle();


            //  -----  NavBar Menú Themes jQuery UI  -----

            //  -----  ocultar Menú Temas de jQuery UI -----
            $('#btn-container').hide();

        });


        //  -----  Mostrar / Ocultar  --  Menú Temas de jQuery UI  -----
        $("#header").on('click', '.navbar-themes__title', function () {
            $(".btn-container").slideToggle();
        });

        //  -----  Cargar Script de Temas  -----
        $.getScript("./assets/js/themes-jQueryUI.js", function () {
            console.log("El script de Themes de jQueryUI se ha cargado y ejecutado correctamente.");
        });

    });
  



    //  ------------------------------------------------------------------------------
    //  ----------  Carga HTML y Scripts de la opción de menú seleccionada  ----------
    //  ------------------------------------------------------------------------------

    function loadSimultaneousFade($newContainer, url, scriptUrls, pathname) {

        //  -----  Empezamos con un fadeOut del contenedor actual  -----
        $($newContainer).fadeOut(function () {

            //  -----  Mientras el fadeOut ocurre, cargamos el nuevo contenido  -----
            $($newContainer).load(url, function (response, status, xhr) {

                if (status === "success") {

                    // Si se pasan scripts, los cargamos usando $.when
                    if (scriptUrls && scriptUrls.length > 0) {

                        const scriptPromises = scriptUrls.map((scriptUrl) => $.getScript(scriptUrl));

                        $.when(...scriptPromises).done(function () {
                            console.log("Todos los scripts se han cargado correctamente.");
                        }).fail(function () {
                            console.error("Error al cargar uno o más scripts.");
                        });
                    }

                    // Cambiamos el pathname en la URL del navegador si se pasa
                    if (pathname) {
                        history.pushState({}, '', pathname);
                    }

                    // Una vez que se ha cargado el contenido, lo mostramos con fadeIn
                    $($newContainer).fadeIn();

                } else {
                    console.error("Error al cargar el contenido:", status);
                }

            });
        });
    }


    //  --------------------------------------------------------------
    //  ----------  Funcionalidad de las opciones del menú  ----------
    //  --------------------------------------------------------------

    function renderSeccionesMenu() {


        // ---------- 01-primeros-pasos ----------
        $('#primerosPasos').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './01-primeros-pasos-introduccion/01-introduccion.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './01-primeros-pasos-introduccion/01-introduccion.js'
                ],
                '/01-introduccion'
            );
        });


        // ---------- 02-selectores ----------
        $('#selectores').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './02-selectores/02-selectores.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './02-selectores/02-selectores.js'
                ],
                '/02-selectores'
            );
        });


        // ---------- 03-eventos ----------
        $('#eventos').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './03-eventos/03-eventos.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './03-eventos/03-eventos.js'
                ],

                '/03-eventos'
            );
        });


        // ---------- 04-funciones-y-efectos ----------
        $('#funcionesEfectos').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './04-funciones-y-efectos/04-funciones-efectos.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './04-funciones-y-efectos/04-funciones-efectos.js',
                ],
                '/04-funciones-y-efectos'
            );
        });


        // ---------- 05-jquery-html ----------
        $('#jqueryHtml').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './05-jquery-y-html/05-jquery-html.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './05-jquery-y-html/05-jquery-html.js',
                ],
                '/05-jquery-y-html'
            );
        });


        // ---------- 06-jquery-ajax ----------
        $('#jqueryAjax').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './06-jquery-y-ajax/06-jquery-ajax.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './06-jquery-y-ajax/06-jquery-ajax.js'
                ],
                '/06-jquery-y-ajax'
            );
        });


        // ---------- 07-widgets ----------
        $('#widgets').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './07-widgets/07-widgets.html',
                [
                    //'./assets/jquery/core/jquery-1.11.1.min.js',
                    //'./assets/jquery/core/jquery-3.7.1.min.js',
                    //'./assets/jquery/ui/jquery-ui-1.11.2.min.js',
                    './07-widgets/07-widgets.js'
                ],
                '/07-widgets'
            );
        });


        // ---------- 08-jQueryUI ----------
        $('#jqueryUI').on('click', function () {

            loadSimultaneousFade(
                "#renderHtml",
                './08-jquery-ui/08-jquery-ui.html',
                [
                    //'./assets/jquery/core/jquery-1.11.1.min.js',
                    //'./assets/jquery/ui/jquery-ui-1.11.2.min.js',
                    './08-jquery-ui/08-jquery-ui.js',
                ],
                '/08-jquery-ui'
            );

        });


        // ---------- 09-cierreCurso ----------
        $('#cierreCurso').on('click', function () {
            loadSimultaneousFade(
                "#renderHtml",
                './09-cierre-curso/09-cierre-curso.html',
                [
                    './assets/jquery/core/jquery-3.7.1.min.js',
                    './09-cierre-curso/09-cierre-curso.js',
                ],
                '/09-cierre-curso'
            );
        });

    }


});





// function loadSimultaneousFade( $newContainer, url, scriptUrl, pathname) {


//     // Empezamos con un fadeOut del contenedor actual
//     $($newContainer).fadeOut( function() {



//         // Mientras el fadeOut ocurre, cargamos el nuevo contenido
//         $($newContainer).load(url, function(response, status, xhr) {

//             if (status === "success") {
//                 // Si se pasa un scriptUrl, cargamos el script correspondiente
//                 if (scriptUrl) {
//                     $.getScript(scriptUrl);
//                 }

//                 // Cambiamos el pathname en la URL del navegador si se pasa
//                 //if (pathname) history.pushState({}, '', pathname);


//                 // Una vez que se ha cargado el contenido, lo mostramos con fadeIn
//                 $($newContainer).fadeIn(); // Ajusta el tiempo a lo que desees
//             } else {
//                 console.error("Error al cargar el contenido:", status);
//             }
//         });

//         $containerTemporal = $newContainer;
//         console.log($containerTemporal)

//     });
// }