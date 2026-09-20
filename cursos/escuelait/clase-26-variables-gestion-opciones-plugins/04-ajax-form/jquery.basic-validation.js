/*
    *  ---------------------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.basic-validation.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/04-ajax-form/jquery.basic-validation.js  -----  *
    *  ---------------------------------------------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {


    /**
     * ---------------------------
     * -----  `defaults {}`  -----
     * ---------------------------
     * - Valores por defecto del plugin.
     * @type {Required<BasicValidationOptions>}
     */
    const defaults = {
        selector: '.basic-validation',
        errorClass: 'is-invalid',
        message: 'Campo obligatorio',
        onInvalid: () => {}
    };


    /**
     * ----------------------------------------
     * -----  `basicValidation(options)`  -----
     * ----------------------------------------
     * - Valida al enviar los campos con la clase `.basic-validation`.
     * - Fusiona las opciones recibidas con `defaults` mediante `$.extend`.
     * @param {BasicValidationOptions} [options] - Opciones del plugin.
     * @this {JQuery} - `formulario que dispara el plugin`
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.basicValidation = function (options) {


        return this.each(function () {

            /** @type {HTMLFormElement} - `formulario que dispara el plugin` */
            const form = /** @type {HTMLFormElement} */ (this);

            /** @type {JQuery<HTMLFormElement>} - `formulario envuelto` */
            const $form = /** @type {JQuery<HTMLFormElement>} */ ($(form));

            /** @type {Required<BasicValidationOptions>} - `opciones fusionadas` */
            const settings = $.extend({}, defaults, options);


            //  -----  capturar el evento submit del formulario  -----
            $form.on('submit', (event) => {

                /** - `indica si todos los campos marcados son válidos` */
                let isValid = true;

                $form.find(settings.selector).each(function () {

                    /** @type {JQuery<HTMLInputElement>} - `campo a validar` */
                    const $field = /** @type {JQuery<HTMLInputElement>} */ ($(this));

                    /** @type {string} - `valor del campo sin espacios` */
                    const value = String($field.val() ?? '').trim();

                    $field.removeClass(settings.errorClass);
                    $field.next('span.basic-validation-error').remove();

                    //  -----  si el campo está vacío, marcar error  -----
                    if (value === '') {
                        isValid = false;
                        $field.addClass(settings.errorClass);

                        /** @type {HTMLSpanElement} - `mensaje de error` */
                        const error = document.createElement('span');
                        error.className = 'basic-validation-error';
                        error.textContent = settings.message;
                        $field.after(error);
                    }

                });

                //  -----  si hay errores, avisar; el Ajax sigue para pintar el mensaje de php  -----
                if (!isValid) {
                    event.preventDefault();
                    settings.onInvalid.call(form);
                }

            });

        });

    };


})(jQuery);
