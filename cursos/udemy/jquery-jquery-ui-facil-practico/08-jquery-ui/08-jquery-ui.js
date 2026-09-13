//  *****************************************************
//  **********  /08-jquery-ui/08-jquery-ui.js  **********  
//  *****************************************************  


$(document).ready(function () {


    console.warn('-----  08-jquery-ui.js - cargado!!!  -----');
    console.warn('----- Versiones  --  jQuery ', $.fn.jquery, '\n  --  jQuery UI ', $.ui);


    //  -----  Cambiar el título de la página  -----
    document.title = '08 - jQuery UI';


    //  ---------------------------------
    //  ----------  jQuery UI  ----------
    //  ---------------------------------


    //  ---------------------------------------------------------------
    //  ----------  Introducción  --  Calendar como ejemplo  ----------
    //  ---------------------------------------------------------------

    $("#calendario").datepicker();


    //  ---------------------------------------------
    //  ----------  Draggable y Droppable  ----------
    //  ---------------------------------------------

    $("#contenedorDraggable")
        .css({
            width: 300,
            height: 300,
            backgroundColor: 'red'
        })
        .draggable();

    $("#contenedorDroppable")
        .css({
            width: 500,
            height: 500,
            backgroundColor: 'green'
        })
        .droppable({
            tolerance: 'fit',
            drop: function () {
                alert('Elemento soltado!!!');
                $(this).css('backgroundColor', 'yellow');
            },
            out: function () {
                alert('Elemento Fuera!!!');
                $(this).css('backgroundColor', 'green');
            }
        });


    //  -------------------------------------------
    //  ----------  Juego Drag and Drop  ----------
    //  -------------------------------------------

    $(".img__bandera").draggable({
        containment: 'parent',
        drop: soltar,
        out: salir
    });

    $("#recAle").droppable({
        tolerance: 'fit',
        accept: '#alemania',
        drop: soltar,
        out: salir
    });

    $("#recEsp").droppable({
        tolerance: 'fit',
        accept: '#espanna',
        drop: soltar,
        out: salir
    });

    $("#recFra").droppable({
        tolerance: 'fit',
        accept: '#francia',
        drop: soltar,
        out: salir
    });

    $("#recIta").droppable({
        tolerance: 'fit',
        accept: '#italia',
        drop: soltar,
        out: salir
    });

    function soltar() {
        $(this)
            .html("Correcto!!!")
            .css('background-color', 'green')
    }

    function salir() {

        const nombrePais = $(this).data('name');

        $(this)
            .html(nombrePais)
            .css('background-color', '#666666')
    }


    //  ---------------------------------------------
    //  ----------  Selectable y Sorteable ----------
    //  ---------------------------------------------

    $("#listaMeses").selectable();

    $("#listaDias").sortable();


    //  ---------------------------------
    //  ----------  Resizable  ----------
    //  ---------------------------------

    $(".parrafo__container")
        .css({
            width: 300,
            height: 350,
            padding: 20,
            backgroundColor: 'orange'
        })
        .resizable();


    //  --------------------------------
    //  ----------  Acordeon  ----------
    //  --------------------------------

    $("#acordeonContainer").accordion({
        heightStyle: "content" // Ajusta la altura según el contenido
    });


    //  -------------------------------------
    //  ----------  Autocompletar  ----------
    //  -------------------------------------

    const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    $("#caja").autocomplete({
        source: meses
    });


    //  -------------------------------
    //  ----------  Botones  ----------
    //  -------------------------------

    $("#boton").button({
        icons: {
            primary: 'ui-icon-circle-triangle-e',
            secondary: 'ui-icon-plus'
        },
    });

    $("#on").button();

    $("#deportes").buttonset();

    $("#radio").buttonset();


    //  ----------------------------------
    //  ----------  Calendario  ----------
    //  ----------------------------------

    $("#calendar1").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
    });

    $("#calendar2").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: -4,
        //maxDate: 14,
        maxDate: "+2M+15D",   //  + 2 meses y 15 dias
    });

    $("#calendar3").datepicker({
        showWeek: true,
        numberOfMonths: 3
    });

    $("#calendar4").datepicker({
        showOn: "button",
        buttonImage: "./assets/img/gato-button-calendar.png",
        buttonImageOnly: true
    });


    //  -------------------------------------------
    //  ----------  Ventanas de Diálogo  ----------
    //  -------------------------------------------

    $("#ventana").dialog({
        modal: true,
        width: 300,
        height: 300,
        buttons: {
            "Aceptar": function () {
                $(this).dialog('close');
            }
        }
    });


    //  -----------------------------
    //  ----------  Menús  ----------
    //  -----------------------------

    //  -----  Utilizar la version 1.12.0 de jQueryUI para los iconos de los menus -----

    $("#listaMenu").menu();


    //  --------------------------------------------------------
    //  ----------  Barras de Progreso, Deslizadores  ----------
    //  --------------------------------------------------------

    //  -----  inicializamos la barra de progreso  -----
    $("#progressBar").progressbar({
        value: 50
    });

    //  -----  manejar el cambio en el input  -----
    $('#valueProgressBar').on('input', function () {

        let valueProgressBar = $(this).val();
        valueProgressBar = Math.max(0, Math.min(100, valueProgressBar)); // Asegurarse que esté en el rango 0-100
        console.log('Valor cambiado:', valueProgressBar);

        //  -----  actualizar la barra de progreso  -----
        $("#progressBar").progressbar("option", "value", valueProgressBar);
    });


    //  ------------------------------
    //  ----------  Slider  ----------
    //  ------------------------------
    $("#slider").slider({

        range: 'max',
        min: 1,
        max: 5,
        value: 2,

        slide: function (event, ui) {
            $("#comensales").val(ui.value);
        }
    });

    $("#comensales").val($("#slider").slider("value"))


    //  -------------------------------
    //  ----------  Spinner  ----------
    //  -------------------------------

    $("#spinner").spinner({
        min: 1,
        max: 20,
        step: 2
    });


    //  ----------------------------
    //  ----------  Tabs  ----------
    //  ----------------------------

    $("#tabs").tabs();



    //  --------------------------------
    //  ----------  Tooltips  ----------
    //  --------------------------------

    $(document).tooltip();


    //  -------------------------------
    //  ----------  Efectos  ----------
    //  -------------------------------

    //  ----------  Effect  -----------------------------------------------------------------
    //  -----       Highlight    Bounce     Shake   Scale   Explode     fade    drop    -----
    //  -----       Puff         Pulsate    Slide   Blind   Clip        Fold    -------------
    //  -------------------------------------------------------------------------------------

    //  ----------  Easing  -------------------------------------------------------------------------------------------------
    //  -----  linear           swing            easeInQuad          easeOutQuad     easeInOutQuad                      -----
    //  -----  easeInCubic      easeOutCubic     easeInOutCubic      easeInQuart     easeOutQuart      easeInOutQuart   -----  
    //  -----  easeInSine       easeOutSine      easeInOutSine       easeInExpo      easeOutExpo       easeInOutExpo    -----
    //  -----  easeInQuint      easeOutQuint     easeInOutQuint      easeInCirc      easeOutCirc       easeInOutCirc    -----
    //  -----  easeInElastic    easeOutElastic   easeInOutElastic    easeInBack      easeOutBack       easeInOutBack    -----
    //  -----  easeInBounce     easeInOutBounce  easeOutBounce                                                          -----                                                                                  -----
    //-----------------------------------------------------------------------------------------------------------------------

    $('#apply-effect-easing').on('click', function () {

        const effect = $('#effect-select').val();
        const easing = $('#easing-select').val();
        const $box = $('#efectoUI');

        console.log(effect, ' - ', easing);

        //  -----  Aplicar efecto  -----
        $box.effect(effect, easing, 3000);

    });


    //  -----  Aplicar efecto  -----
    $("#ventanaEfectos").dialog({
        show: {
            effect: "bounce",
            duration: 3000
        },
        hide: {
            effect: "explode",
            duration: 2000
        }
    });

});
