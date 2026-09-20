/*
    *  ----------------------------------------------------------------------------------------------------------------------  *
    *  -----  script.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/03-plugin-hilight/script.js  -----  *
    *  ----------------------------------------------------------------------------------------------------------------------  *
*/


$(function () {


    /*
        *  ---------------------------------  *
        *  -----  Referencias al HTML  -----  *
        *  ---------------------------------  *
    */

    /** @type {JQuery<HTMLSpanElement>} - Span del ejemplo con valores por defecto */
    const $hilightDefault = $('.hilight-default');

    /** @type {JQuery<HTMLSpanElement>} - Span del ejemplo solo con foreground */
    const $hilightForeground = $('.hilight-foreground');

    /** @type {JQuery<HTMLSpanElement>} - Span del ejemplo solo con background */
    const $hilightBackground = $('.hilight-background');

    /** @type {JQuery<HTMLSpanElement>} - Span del ejemplo con foreground y background */
    const $hilightColors = $('.hilight-colors');

    /** @type {JQuery<HTMLSpanElement>} - Span del ejemplo con onFormatted */
    const $hilightCallback = $('.hilight-callback');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de feedback del callback onFormatted */
    const $hilightLog = $('#hilightLog');


    /*
        *  -------------------------------------  *
        *    -----  Ejemplo con defaults  -----  *
        *  -------------------------------------  *
    */

    //  -----  aplicar plugin sin opciones: rojo sobre amarillo  -----
    $hilightDefault.hilight();


    /*
        *  ---------------------------------------  *
        *    -----  Ejemplo solo foreground  -----  *
        *  ---------------------------------------  *
    */

    /** @type {HilightOptions} - `solo color de texto` */
    const optionsForeground = {
        foreground: 'blue'
    };

    $hilightForeground.hilight(optionsForeground);


    /*
        *  ---------------------------------------  *
        *    -----  Ejemplo solo background  -----  *
        *  ---------------------------------------  *
    */

    /** @type {HilightOptions} - `solo color de fondo` */
    const optionsBackground = {
        background: 'lightblue'
    };

    $hilightBackground.hilight(optionsBackground);


    /*
        *  ----------------------------------------------  *
        *    -----  Ejemplo foreground y background  -----  *
        *  ----------------------------------------------  *
    */

    /** @type {HilightOptions} - `colores personalizados` */
    const optionsColors = {
        foreground: 'navy',
        background: 'orange'
    };

    $hilightColors.hilight(optionsColors);


    /*
        *  -------------------------------------------  *
        *    -----  Ejemplo con onFormatted  -----  *
        *  -------------------------------------------  *
    */

    /** @type {HilightOptions} - `colores y callback al terminar` */
    const optionsCallback = {
        foreground: 'white',
        background: 'purple',
        onFormatted: function () {
            $hilightLog.text(
                `Resaltado — ${this.textContent}`
            );
        }
    };

    $hilightCallback.hilight(optionsCallback);


});
