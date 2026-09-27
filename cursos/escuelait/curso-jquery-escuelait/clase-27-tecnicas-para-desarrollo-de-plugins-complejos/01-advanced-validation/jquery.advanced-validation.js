/*
    *  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.advanced-validation.js  --  /cursos/escuelait/clase-27-tecnicas-para-desarrollo-de-plugins-complejos/01-advanced-validation/jquery.advanced-validation.js  -----  *
    *  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {


    /** - `nombre del plugin y clave de la instancia en $.data` */
    const pluginName = 'advancedValidation';

    /** - `clave de la instancia guardada en el elemento` */
    const dataKey = 'plugin_' + pluginName;

    /** @type {string} - `clase del mensaje bajo campos .advanced-validation` */
    const advancedErrorMessageClass = 'advanced-validation-error-message';


    /**
     * ---------------------------
     * -----  `defaults {}`  -----
     * ---------------------------
     * - Valores por defecto del plugin.
     * @type {Required<AdvancedValidationOptions>}
     */
    const defaults = {
        selector: '.basic-validation, .advanced-validation',
        errorClass: 'is-invalid',
        message: 'Campo obligatorio',
        onInit: () => {},
        onDestroy: () => {},
        onValidating: () => {},
        onIsValid: () => {},
        onIsNotValid: () => {},
        onValidated: () => {}
    };


    /**
     * ----------------------------------------------
     * -----  `createPlugin(element, options)`  -----
     * ----------------------------------------------
     * - Crea la instancia del plugin con el revealing module.
     * @param {HTMLFormElement} element - Formulario que dispara el plugin.
     * @param {AdvancedValidationOptions} [options] - Opciones del plugin.
     * @return {AdvancedValidationApi} - Métodos públicos de la instancia.
     */
    const createPlugin = (element, options) => {

        /** @type {HTMLFormElement} - `formulario que dispara el plugin` */
        const el = element;

        /** @type {JQuery<HTMLFormElement>} - `formulario envuelto` */
        const $el = /** @type {JQuery<HTMLFormElement>} */ ($(el));

        /** @type {Required<AdvancedValidationOptions>} - `opciones fusionadas` */
        const settings = $.extend({}, defaults, options);


        /**
         * -------------------------
         * -----  `isValid()`  -----
         * -------------------------
         * @return {boolean | undefined} - Resultado de la última validación.
         */
        const isValid = () =>  /** @type {boolean | undefined} */ ($el.data('basic-validation-isvalid'));
        


        /**
         * ---------------------------------
         * -----  `setIsValid(value)`  -----
         * ---------------------------------
         * @param {boolean} value - Resultado de la validación.
         * @return {void}
         */
        const setIsValid = (value) => {
            $el.data('basic-validation-isvalid', value);
        };


        /**
         * ----------------------------------------------------
         * -----  `getAdvancedFieldErrorMessage($field)`  -----
         * ----------------------------------------------------
         * - Reglas `data-advanced-validation-*` en campos `.advanced-validation`.
         * @param {JQuery<HTMLInputElement | HTMLTextAreaElement>} $field - Campo a validar.
         * @return {string | null} - Mensaje de error o `null` si es válido.
         */
        const getAdvancedFieldErrorMessage = ($field) => {

            /** @type {string} - `valor del campo` */
            const value = String($field.val() ?? '');

            /** @type {string} - `mensaje genérico` */
            const fallbackMessage =
                $field.attr('data-advanced-validation-message')
                || settings.message
                || 'Campo inválido';

            /** @type {boolean} - `campo obligatorio` */
            const isRequired =
                Boolean($field.data('advanced-validation-required'))
                || $field[0].hasAttribute('data-advanced-validation');

            //  -----  si el campo es obligatorio y está vacío, se devuelve el mensaje de error requerido  -----
            if (isRequired && value === '') {
                return $field.attr('data-advanced-validation-message-required') || fallbackMessage;
            }

            //  -----  si el campo está vacío, se devuelve null  -----
            if (value === '') {
                return null;
            }

            /** @type {string | undefined} - `patrón regex` */
            const regexPattern = $field.attr('data-advanced-validation-regex');

            //  -----  si el campo tiene un patrón regex, se valida  -----
            if (regexPattern) {

                //  -----  se intenta validar el campo con el patrón regex  -----
                try {

                    if (!new RegExp(regexPattern).test(value)) {
                        return $field.attr('data-advanced-validation-message-regex') || fallbackMessage;
                    }

                }

                //  -----  si el campo no coincide con el patrón regex, se devuelve el mensaje de error de regex  -----
                catch {

                    return fallbackMessage;
                }

            }


            /** @type {string | undefined} - `longitud mínima` */
            const minlengthAttr = $field.attr('data-advanced-validation-minlength');

            //  -----  si el campo tiene una longitud mínima, se valida  -----
            if (minlengthAttr !== undefined && minlengthAttr !== '') {

                /** @type {number} */
                const minlength = Number(minlengthAttr);

                //  -----  si la longitud mínima es menor que la longitud del campo, se devuelve el mensaje de error de longitud mínima  -----
                if (!Number.isNaN(minlength) && value.length < minlength) {
                    return $field.attr('data-advanced-validation-message-minlength')
                        || `Introduce al menos ${minlength} caracteres.`;
                }

            }

            /** @type {string | undefined} - `longitud máxima` */
            const maxlengthAttr = $field.attr('data-advanced-validation-maxlength');

            //  -----  si el campo tiene una longitud máxima, se valida  -----
            if (maxlengthAttr !== undefined && maxlengthAttr !== '') {

                /** @type {number} */
                const maxlength = Number(maxlengthAttr);

                if (!Number.isNaN(maxlength) && value.length > maxlength) {
                    return $field.attr('data-advanced-validation-message-maxlength')
                        || `Introduce como máximo ${maxlength} caracteres.`;
                }

            }

            //  -----  si el campo no cumple ninguna regla, se devuelve null  -----
            return null;
        };



        /**
         * -----------------------------------------------
         * -----  `clearBasicFieldFeedback($field)`  -----
         * -----------------------------------------------
         * @param {JQuery<HTMLElement>} $field - Campo básico.
         * @return {void}
         */
        const clearBasicFieldFeedback = ($field) => {
            $field.removeClass(settings.errorClass);
            $field.next('span.basic-validation-error').remove();
        };


        /**
         * --------------------------------------------------------
         * -----  `clearAdvancedFieldFeedback($field)`  -----
         * --------------------------------------------------------
         * @param {JQuery<HTMLElement>} $field - Campo avanzado.
         * @return {void}
         */
        const clearAdvancedFieldFeedback = ($field) => {
            $field.removeClass('advanced-validation-error');
            $field.next(`span.${advancedErrorMessageClass}`).remove();
        };


        /**
         * -------------------------------------------------------
         * -----  `showAdvancedFieldError($field, message)`  -----
         * -------------------------------------------------------
         * @param {JQuery<HTMLElement>} $field - Campo inválido.
         * @param {string} message - Texto bajo el input.
         * @return {void}
         */
        const showAdvancedFieldError = ($field, message) => {

            $field.addClass('advanced-validation-error');

            /** @type {JQuery<HTMLSpanElement>} - `mensaje bajo el campo` */
            const $error = $('<span>')
                .addClass(advancedErrorMessageClass)
                .attr('role', 'alert')
                .text(message);

            $field.after($error);
        };


        /**
         * --------------------------------
         * -----  `validateFields()`  -----
         * --------------------------------
         * - Valida campos `.basic-validation` (obligatorios) y `.advanced-validation` (reglas data-*).
         * @return {JQuery.Promise<void>}
         */
        const validateFields = () => {

            /** @type {JQuery.Deferred<void>} */
            const deferred = $.Deferred();

            setIsValid(true);

            $el.find(settings.selector).each(function () {

                /** @type {JQuery<HTMLInputElement | HTMLTextAreaElement>} */
                const $field = /** @type {JQuery<HTMLInputElement | HTMLTextAreaElement>} */ ($(this));

                //  -----  si el campo contiene la clase .advanced-validation, se valida  -----
                if ($field.hasClass('advanced-validation')) {

                    clearAdvancedFieldFeedback($field);

                    /** @type {string | null} */
                    const advancedMessage = getAdvancedFieldErrorMessage($field);

                    //  -----  si el campo tiene un mensaje de error, se marca como inválido  -----
                    if (advancedMessage !== null) {
                        setIsValid(false);
                        showAdvancedFieldError($field, advancedMessage);
                    }

                    //  -----  si el campo no tiene un mensaje de error, se continúa  -----
                    return;
                }

                clearBasicFieldFeedback($field);

                /** @type {boolean} */
                const required = Boolean($field.data('basic-validation-required'));

                //  -----  si el campo no es obligatorio, se continúa  -----
                if (!required) {
                    return;
                }

                /** @type {string} */
                const value = String($field.val() ?? '').trim();

                //  -----  si el campo está vacío, se marca como inválido  -----
                if (value === '') {
                    
                    setIsValid(false);
                    $field.addClass(settings.errorClass);

                    /** @type {JQuery<HTMLSpanElement>} - `mensaje bajo el campo` */
                    const $error = $('<span>')
                        .addClass('basic-validation-error')
                        .attr('role', 'alert')
                        .text(settings.message);

                    $field.after($error);
                }

            });

            if (isValid()) {
                deferred.resolve();
            } else {
                deferred.reject();
            }

            return deferred.promise();
        };


        /**
         * ------------------------------
         * -----  `hook(hookName)`  -----
         * ------------------------------
         * @param {keyof AdvancedValidationOptions} hookName - Nombre del callback.
         * @return {void | JQuery.Promise<void>}
         */
        const hook = (hookName) => {

            const callback = settings[hookName];

            if (typeof callback === 'function') {
                return callback.call(el);
            }
        };


        /**
         * --------------------------
         * -----  `validate()`  -----
         * --------------------------
         * @return {JQuery.Promise<void>}
         */
        const validate = () => {

            return $.when(validateFields(), hook('onValidating'))
                .done(() => {
                    hook('onIsValid');
                })
                .fail(() => {
                    hook('onIsNotValid');
                })
                .always(() => {
                    hook('onValidated');
                });
        };


        /**
         * ----------------------------------
         * -----  `option(key, value)`  -----
         * ----------------------------------
         * - Lee o escribe una opción de la instancia (`message`, `errorClass`, `selector`, hooks, etc.).
         * - Escritura: `$('#form').advancedValidation('option', 'message', 'Texto')`.
         * - Lectura: `$('#form').advancedValidation('option', 'message')`.
         * @template {keyof AdvancedValidationOptions} K
         * @param {K} key - Nombre de la opción en `AdvancedValidationOptions`.
         * @param {AdvancedValidationOptions[K]} [value] - Nuevo valor; si se omite, solo lectura.
         * @return {AdvancedValidationOptions[K] | void} Valor al leer; `undefined` al escribir.
         */
        const option = (key, value) => {

            if (value !== undefined) {

                /** @type {Record<keyof AdvancedValidationOptions, AdvancedValidationOptions[keyof AdvancedValidationOptions]>} */
                const writableSettings = /** @type {Record<keyof AdvancedValidationOptions, AdvancedValidationOptions[keyof AdvancedValidationOptions]>} */ (
                    settings
                );

                writableSettings[key] = value;
                return;
            }

            return settings[key];
        };


        /**
         * -------------------------
         * -----  `destroy()`  -----
         * -------------------------
         */
        const destroy = () => {

            $el.off('submit.' + pluginName);

            $el.find(settings.selector).each(function () {

                /** @type {JQuery<HTMLElement>} */
                const $field = /** @type {JQuery<HTMLElement>} */ ($(this));

                if ($field.hasClass('advanced-validation')) {
                    clearAdvancedFieldFeedback($field);
                } else {
                    clearBasicFieldFeedback($field);
                }
            });

            $el.removeData('basic-validation-isvalid');

            hook('onDestroy');
            $el.removeData(dataKey);
        };


        /**
         * ----------------------
         * -----  `init()`  -----
         * ----------------------
         */
        const init = () => {

            $el.on('submit.' + pluginName, (event) => {

                event.preventDefault();

                validate()
                    .done(() => {
                        el.submit();
                    });

            });

            hook('onInit');
        };


        init();


        return {
            option,
            destroy,
            isValid,
            validate
        };

    };


    
    /**
     * -------------------------------------------
     * -----  `advancedValidation(options)`  -----
     * -------------------------------------------
     * - Registra el plugin en la colección jQuery (`$.fn.advancedValidation`).
     * - Objeto u omisión: crea una instancia por formulario (`createPlugin`).
     * - String: llama a un método público (`validate`, `isValid`, `option`, `destroy`).
     * @param {AdvancedValidationOptions | string} [options] - Opciones o nombre del método.
     * @this {JQuery}
     * @return {AdvancedValidationCallResult} Cadena jQuery o valor devuelto por el método.
     */
    const advancedValidation = function (options) {

        if (typeof arguments[0] === 'string') {

            /** @type {string} */
            const methodName = arguments[0];

            /** @type {unknown[]} */
            const args = Array.prototype.slice.call(arguments, 1);

            /** @type {AdvancedValidationCallResult} */
            let returnVal;

            this.each(function () {

                /** @type {AdvancedValidationApi | undefined} */
                const instance = $.data(this, dataKey);

                if (instance && typeof instance[methodName] === 'function') {
                    returnVal = instance[methodName].apply(instance, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });

            if (returnVal !== undefined) {
                return returnVal;
            }

            return this;
        }


        if (typeof options !== 'string') {

            return this.each(function () {

                if (!$.data(this, dataKey)) {
                    $.data(
                        this,
                        dataKey,
                        createPlugin(/** @type {HTMLFormElement} */ (this), options)
                    );
                }
            });
        }
    };


    $.fn.advancedValidation = /** @type {AdvancedValidationPlugin} */ (advancedValidation);

    
    /**
     * ---------------------------------------------------
     * -----  `$.fn.advancedValidation.defaults`  -----
     * ---------------------------------------------------
     * - Opciones por defecto; se fusionan con `$.extend` al crear la instancia.
     * @type {Required<AdvancedValidationOptions>}
     */
    $.fn.advancedValidation.defaults = defaults;


})(jQuery);
