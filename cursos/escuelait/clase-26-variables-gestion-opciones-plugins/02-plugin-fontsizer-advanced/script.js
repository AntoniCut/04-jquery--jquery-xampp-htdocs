/*
    *  -----------------------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  02-plugins-fontsizer-advanced.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/js/02-plugins-fontsizer-advanced.js  -----  *
    *  -----------------------------------------------------------------------------------------------------------------------------------------------------  *
*/


$(function () {


    /*
        *  ---------------------------------  *
        *  -----  Referencias al HTML  -----  *
        *  ---------------------------------  *
    */

    /** @type {JQuery<HTMLButtonElement>} - Botones del ejemplo con valores por defecto */
    const $buttonFontSizerDefault = $('.font-sizer-default');

    /** @type {JQuery<HTMLButtonElement>} - Botones del ejemplo con settings personalizados */
    const $buttonFontSizerSettings = $('.font-sizer');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de feedback del callback onFontResized */
    const $fontSizerLog = $('#fontSizerLog');


    /*
        *  -------------------------------------  *
        *    -----  Ejemplo con defaults  -----  *
        *  -------------------------------------  *
    */

    //  -----  aplicar plugin sin opciones: usa target #fontSizer  -----
    $buttonFontSizerDefault.fontSizerAdvanced();


    /*
        *  -------------------------------------  *
        *    -----  Ejemplo con settings  -----  *
        *  -------------------------------------  *
    */

    /** @type {FontSizerAdvancedOptions} - `opciones personalizadas fusionadas con defaults` */
    const settings = {
        
        target: '#divFontSizer',
        
        onFontResized: function (param1, param2, param3) {
            $fontSizerLog.text(
                `Fuente animada — ${param1}, ${param2}, ${param3}`
            );
        }
    };

    //  -----  aplicar plugin con settings: target #divFontSizer y callback  -----
    $buttonFontSizerSettings.fontSizerAdvanced(settings);


});
