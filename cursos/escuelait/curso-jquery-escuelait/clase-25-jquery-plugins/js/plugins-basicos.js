/*
    *  -----------------------------------------------------------------------------------------------------  *
    *  -----  plugins-basicos.js  --  /cursos/escuelait/clase-25-jquery-plugins/js/plugins-basicos.js  -----  *
    *  -----------------------------------------------------------------------------------------------------  *
*/


$(function () {


    /*
        *  ---------------------------------  *
        *  -----  Referencias al HTML  -----  *
        *  ---------------------------------  *
    */


    /** @type {JQuery<HTMLDivElement>} - Div para el ejemplo con urlize con el id "urlize" */
    const $divUrlize = $('#urlize');

    /** @type {JQuery<HTMLDivElement>} - Div para el ejemplo con underlinize con el id "underlinize" */
    const $divUnderlinize = $('#underlinize');

    /** @type {JQuery<HTMLDivElement>} - Div para el ejemplo con boldize con el id "boldize" */
    const $divBoldize = $('#boldize');

    /** @type {JQuery<HTMLDivElement>} - Div para el ejemplo con colorize con el id "colorize" */
    const $divColorize = $('#colorize');

    /** @type {JQuery<HTMLInputElement>} - Input para el ejemplo con colorize con el id "colorizeInput" */
    const $inputColorize = $('#colorizeInput');

    /** @type {JQuery<HTMLButtonElement>} - Botones para el ejemplo con fontSizer con la clase "fontSizer" */
    const $buttonFontSizer = $('.fontSizer');

    
    /*
        *  -------------------------------------  *
        *    -----  Ejemplos individuales  -----  *
        *  -------------------------------------  *
    */

        
    //  -----  aplicar plugin urlize a un div  -----
    $divUrlize.urlize();

    //  -----  aplicar plugin underlinize a un div  -----
    $divUnderlinize.underlinize();

    //  -----  aplicar plugin boldize a un div  -----
    $divBoldize.boldize();

    //  -----  aplicar plugin colorize a un div  -----
    $divColorize.colorize();

    //  -----  aplicar plugin colorize a un input  -----
    $inputColorize.colorize();

    //  -----  aplicar plugin fontSizer a los botones de clase fontSizer  -----
    $buttonFontSizer.fontSizer();


    /*
        *  -----------------------------------------------------  *
        *    -----  Ejemplo combinado encadenando métodos  -----  *
        *  -----------------------------------------------------  *
    */

    //  -----  aplicar plugin urlize y underlinize a un div  -----  
    $('.urlize')
        .urlize()
        .underlinize();
    
    //  -----  aplicar plugin boldize y colorize a un div  -----
    $('.boldize, .colorize')
        .boldize()
        .colorize();

    //  -----  aplicar plugin fontSizer a un div  -----
    $('.font-sizer').fontSizer();


});
