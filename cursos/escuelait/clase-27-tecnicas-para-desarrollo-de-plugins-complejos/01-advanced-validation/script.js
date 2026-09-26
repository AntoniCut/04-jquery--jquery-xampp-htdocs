/*
    *  --------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  script.js  --  /cursos/escuelait/clase-27-tecnicas-para-desarrollo-de-plugins-complejos/01-advanced-validation/script.js  -----  *
    *  --------------------------------------------------------------------------------------------------------------------------------------  *
*/


$(function () {


    /*
        *  ---------------------------------  *
        *  -----  Referencias al HTML  -----  *
        *  ---------------------------------  *
    */

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con valores por defecto */
    const $formDefault = $('#formDefault');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo con hooks */
    const $formHooks = $('#formHooks');

    /** @type {JQuery<HTMLButtonElement>} - Botón que llama al método validate */
    const $btnValidateHooks = $('#btnValidateHooks');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo del hook onInit */
    const $hooksInit = $('#hooksInit');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo de onIsValid / onIsNotValid */
    const $hooksState = $('#hooksState');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo del hook onValidated */
    const $hooksDone = $('#hooksDone');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo isValid */
    const $formIsValid = $('#formIsValid');

    /** @type {JQuery<HTMLButtonElement>} - Botón que lee isValid */
    const $btnIsValid = $('#btnIsValid');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo con el resultado de isValid */
    const $isValidLog = $('#isValidLog');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo option */
    const $formOption = $('#formOption');

    /** @type {JQuery<HTMLButtonElement>} - Botón que lee la opción message */
    const $btnOptionRead = $('#btnOptionRead');

    /** @type {JQuery<HTMLButtonElement>} - Botón que escribe la opción message */
    const $btnOptionWrite = $('#btnOptionWrite');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo con la opción message */
    const $optionLog = $('#optionLog');

    /** @type {JQuery<HTMLFormElement>} - Formulario del ejemplo destroy */
    const $formDestroy = $('#formDestroy');

    /** @type {JQuery<HTMLButtonElement>} - Botón que destruye la instancia */
    const $btnDestroy = $('#btnDestroy');

    /** @type {JQuery<HTMLParagraphElement>} - Párrafo del hook onDestroy */
    const $destroyLog = $('#destroyLog');


    /*
        *  -------------------------------  *
        *    -----  Configuraciones  -----  *
        *  -------------------------------  *
    */

    /** @type {AdvancedValidationOptions} - `hooks de la validación` */
    const optionsHooks = {
        onInit: function () {
            $hooksInit.text(`Plugin iniciado — ${this.id}`);
        },
        onValidating: function () {
            $hooksState.text(`Validando — ${this.id}`);
        },
        onIsValid: function () {
            $hooksState.text(`Válido — ${this.id}`);
        },
        onIsNotValid: function () {
            $hooksState.text(`No válido — ${this.id}`);
        },
        onValidated: function () {
            $hooksDone.text('Validación terminada');
        }
    };

    /** @type {AdvancedValidationOptions} - `aviso al destruir la instancia` */
    const optionsDestroy = {
        onDestroy: function () {
            $destroyLog.text(`Plugin destruido — ${this.id}. El envío ya no se valida.`);
        }
    };


    /*
        *  ----------------------------------  *
        *  -----  Ejemplo con defaults  -----  *
        *  ----------------------------------  *
    */

    //  -----  aplicar plugin sin opciones: clase, mensaje y borde por defecto  -----
    $formDefault.advancedValidation();


    /*
        *  -------------------------------  *
        *  -----  Ejemplo con hooks  -----  *
        *  -------------------------------  *
    */

    $formHooks.advancedValidation(optionsHooks);

    //  -----  este formulario se queda en la página para poder leer los hooks  -----
    $formHooks.on('submit', (event) => {
        event.preventDefault();
    });

    //  -----  llamada al método público validate  -----
    $btnValidateHooks.on('click', (event) => {
        event.preventDefault();
        $formHooks.advancedValidation('validate');
    });


    /*
        *  ------------------------------------  *
        *  -----  Ejemplo método isValid  -----  *
        *  ------------------------------------  *
    */

    $formIsValid.advancedValidation();

    //  -----  este formulario se queda en la página para poder leer isValid  -----
    $formIsValid.on('submit', (event) => {
        event.preventDefault();
    });

    $btnIsValid.on('click', (event) => {
        event.preventDefault();

        //  -----  validate escribe el flag antes de devolver el deferred  -----
        $formIsValid.advancedValidation('validate');

        /** @type {boolean | undefined} - `resultado de la última validación` */
        const valid = $formIsValid.advancedValidation('isValid');

        $isValidLog.text(valid ? 'isValid: true' : 'isValid: false');
    });


    /*
        *  -----------------------------------  *
        *  -----  Ejemplo método option  -----  *
        *  -----------------------------------  *
    */

    $formOption.advancedValidation();

    $btnOptionRead.on('click', (event) => {
        event.preventDefault();

        /** @type {string} - `mensaje de error de la instancia` */
        const message = /** @type {string} */ (
            $formOption.advancedValidation('option', 'message')
        );

        $optionLog.text(`Mensaje actual: ${message}`);
    });

    $btnOptionWrite.on('click', (event) => {
        event.preventDefault();

        $formOption.advancedValidation('option', 'message', 'Rellena este campo');

        /** @type {string} - `mensaje de error ya actualizado` */
        const message = /** @type {string} */ (
            $formOption.advancedValidation('option', 'message')
        );

        $optionLog.text(`Mensaje actualizado: ${message}`);
    });


    /*
        *  ------------------------------------  *
        *  -----  Ejemplo método destroy  -----  *
        *  ------------------------------------  *
    */

    $formDestroy.advancedValidation(optionsDestroy);

    $btnDestroy.on('click', (event) => {
        event.preventDefault();
        $formDestroy.advancedValidation('destroy');
        $btnDestroy.prop('disabled', true);
    });


});
