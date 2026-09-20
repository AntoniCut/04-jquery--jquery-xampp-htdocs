/*
    *  -----------------------------------------------------------------------------------------------------------------  *
    *  -----  script.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/04-ajax-form/script.js  -----  *
    *  -----------------------------------------------------------------------------------------------------------------  *
*/


$(function () {


    /*
        *  ---------------------------------  *
        *  -----  Referencias al HTML  -----  *
        *  ---------------------------------  *
    */

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con valores por defecto */
    const $formDefault = $('#formDefault');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo solo con target */
    const $formTarget = $('#formTarget');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con type GET */
    const $formGet = $('#formGet');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con onSuccess */
    const $formSuccess = $('#formSuccess');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con onError */
    const $formError = $('#formError');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con onAlways */
    const $formAlways = $('#formAlways');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de feedback del callback onSuccess */
    const $ajaxFormLog = $('#ajaxFormLog');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de feedback del callback onError */
    const $resultadoError = $('#resultadoError');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de feedback del callback onAlways */
    const $ajaxFormAlwaysLog = $('#ajaxFormAlwaysLog');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con basicValidation */
    const $formValidation = $('#formValidation');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de feedback del callback onInvalid */
    const $ajaxFormValidationLog = $('#ajaxFormValidationLog');


    /*
        *  -------------------------------  *
        *    -----  Configuraciones  -----  *
        *  -------------------------------  *
    */


    /** @type {BasicValidationOptions} - `mensaje y callback si el formulario no es válido` */
     const optionsValidation = {
        message: 'Rellena este campo',
        onInvalid: function () {
            $ajaxFormValidationLog.text('El formulario no es válido');
        }
    };


    /*
        *  -------------------------------------  *
        *    -----  Ejemplo con defaults  -----  *
        *  -------------------------------------  *
    */


    //  -----  aplicar plugin sin opciones: action, method y data-ajaxform-target  -----
    $formDefault
        .basicValidation() 
        .ajaxForm();
   


    /*
        *  -----------------------------------  *
        *    -----  Ejemplo solo target  -----  *
        *  -----------------------------------  *
    */

    /** @type {AjaxFormOptions} - `solo destino de la respuesta` */
    const optionsTarget = {
        target: '#resultadoTarget'
    };

    $formTarget
        .basicValidation(optionsValidation) 
        .ajaxForm(optionsTarget);


    /*
        *  --------------------------------  *
        *    -----  Ejemplo type GET  -----  *
        *  --------------------------------  *
    */

    /** @type {AjaxFormOptions} - `envío GET y destino` */
    const optionsGet = {
        type: 'GET',
        target: '#resultadoGet'
    };

    $formGet
        .basicValidation(optionsValidation) 
        .ajaxForm(optionsGet);


    /*
        *  ------------------------------------  *
        *    -----  Ejemplo con onSuccess  -----  *
        *  ------------------------------------  *
    */

    /** @type {AjaxFormOptions} - `destino y callback al terminar` */
    const optionsSuccess = {
        target: '#resultadoSuccess',
        onSuccess: function (respuesta) {
            $ajaxFormLog.text(
                `Enviado — ${respuesta.mensaje}`
            );
        }
    };

    $formSuccess
        .basicValidation(optionsValidation) 
        .ajaxForm(optionsSuccess);


    /*
        *  ----------------------------------  *
        *    -----  Ejemplo con onError  -----  *
        *  ----------------------------------  *
    */

    /** @type {AjaxFormOptions} - `url inexistente y callback de error` */
    const optionsError = {
        url: 'no-existe.php',
        onError: function (status) {
            $resultadoError.text(
                `Error Ajax — ${status}`
            );
        }
    };

    $formError
        .basicValidation(optionsValidation) 
        .ajaxForm(optionsError);


    /*
        *  ------------------------------------  *
        *    -----  Ejemplo con onAlways  -----  *
        *  ------------------------------------  *
    */

    /** @type {AjaxFormOptions} - `destino y callback al terminar siempre` */
    const optionsAlways = {
        target: '#resultadoAlways',
        onAlways: function () {
            $ajaxFormAlwaysLog.text('Petición terminada');
        }
    };

    $formAlways
        .basicValidation(optionsValidation) 
        .ajaxForm(optionsAlways);

    

});
