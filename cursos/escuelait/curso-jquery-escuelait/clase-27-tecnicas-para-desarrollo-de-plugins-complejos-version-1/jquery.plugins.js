/*
    *  --------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.plugins.js  --  /cursos/escuelait/curso-jquery-escuelait/27-tecnicas-para-desarrollo-de-plugins-complejos-recursos/jquery.plugins.js  -----  *
    *  --------------------------------------------------------------------------------------------------------  *
*/


/**
 * - Plugin jQuery `advancedValidation` (boilerplate Jonathan Nicol @f6design).
 */


; (function ($) {


    /** @type {string} - `nombre del plugin en $.fn` */
    const pluginName = 'advancedValidation';


    /**
     * ----------------------------------------
     * -----  `Plugin(element, options)`  -----
     * ----------------------------------------
     * - Constructor del plugin (Revealing Module Pattern).
     * @param {HTMLFormElement} element - Formulario al que se adjunta el plugin.
     * @param {AdvancedValidationOptions} [options] - Opciones de configuración.
     * @return {AdvancedValidationApi} API pública de la instancia.
     */
    function Plugin(element, options) {


        /** @type {HTMLFormElement} - `formulario del plugin` */
        const el = element;

        /** @type {JQuery<HTMLFormElement>} - `colección jQuery del formulario` */
        const $el = /** @type {JQuery<HTMLFormElement>} */ ($(element));


        /** @type {AdvancedValidationOptions} - `opciones efectivas del plugin` */
        options = $.extend(
            {},
            $.fn[pluginName].defaults,
            options
        );


        /**
         * --------------------------------
         * -----  `setIsValid(isValid)`  -----
         * --------------------------------
         * - Persiste el estado de validación en data del formulario.
         * @private
         * @param {boolean} isValid - Indica si el formulario es válido.
         * @return {void}
         */
        function setIsValid(isValid) {
            $el.data('advanced-validation-isValid', isValid);
        }


        /**
         * ------------------------
         * -----  `isValid()`  -----
         * ------------------------
         * - Devuelve el último estado de validación registrado.
         * @return {boolean|undefined} `true` o `false` tras validar; `undefined` si aún no se validó.
         */
        function isValid() {
            return $el.data('advanced-validation-isValid');
        }


        /**
         * -------------------------
         * -----  `validate()`  -----
         * -------------------------
         * - Valida los campos del formulario.
         * @return {JQuery.Promise<void>} Promesa resuelta si es válido; rechazada si hay campos vacíos.
         */
        function validate() {

            return $.when( _validate(), hook('onValidating'))
                .done(function() {
                    hook('onIsValid') 
                 })
                .fail(function() {
                    hook('onIsNotValid')
                })
                .always(function() {
                    hook('onValidated')
                })
              
        }


        /** @type {string} - `clase del mensaje de error bajo el campo` */
        const fieldErrorMessageClass = 'advanced-validation-error-message';


        /**
         * -------------------------------------------------------
         * -----  `getAdvancedFieldErrorMessage($target)`  -----
         * -------------------------------------------------------
         * - Devuelve el mensaje del primer fallo de validación del campo.
         * @private
         * @param {JQuery<HTMLInputElement>} $target - Campo a validar.
         * @return {string|null} Mensaje de error o `null` si el campo es válido.
         */
        function getAdvancedFieldErrorMessage($target) {

            /** @type {string} - `valor del campo` */
            const value = String($target.val() ?? '');

            /** @type {string} - `mensaje genérico del plugin o del data-attribute` */
            const fallbackMessage =
                $target.attr('data-advanced-validation-message')
                || options.message
                || 'Campo inválido';

            /** @type {boolean} - `si el campo es obligatorio` */
            const isRequired =
                Boolean($target.data('advanced-validation-required'))
                || $target[0].hasAttribute('data-advanced-validation');

            if (isRequired && value === '') {
                return $target.attr('data-advanced-validation-message-required') || fallbackMessage;
            }

            if (value === '') {
                return null;
            }

            /** @type {string|undefined} - `patrón de expresión regular` */
            const regexPattern = $target.attr('data-advanced-validation-regex');

            if (regexPattern) {

                try {

                    if (!new RegExp(regexPattern).test(value)) {
                        return $target.attr('data-advanced-validation-message-regex') || fallbackMessage;
                    }

                }

                catch {

                    return fallbackMessage;
                }

            }

            /** @type {string|undefined} - `atributo longitud mínima del campo` */
            const minlengthAttr = $target.attr('data-advanced-validation-minlength');

            if (minlengthAttr !== undefined && minlengthAttr !== '') {

                /** @type {number} - `longitud mínima del campo` */
                const minlength = Number(minlengthAttr);

                if (!Number.isNaN(minlength) && value.length < minlength) {
                    return $target.attr('data-advanced-validation-message-minlength')
                        || `Introduce al menos ${minlength} caracteres.`;
                }

            }

            /** @type {string|undefined} - `atributo longitud máxima del campo` */
            const maxlengthAttr = $target.attr('data-advanced-validation-maxlength');

            if (maxlengthAttr !== undefined && maxlengthAttr !== '') {

                /** @type {number} - `longitud máxima del campo` */
                const maxlength = Number(maxlengthAttr);

                if (!Number.isNaN(maxlength) && value.length > maxlength) {
                    return $target.attr('data-advanced-validation-message-maxlength')
                        || `Introduce como máximo ${maxlength} caracteres.`;
                }

            }

            return null;
        }


        /**
         * -----------------------------------------------------
         * -----  `clearFieldValidationFeedback($target)`  -----
         * -----------------------------------------------------
         * - Quita estilo y mensaje de error del campo.
         * @private
         * @param {JQuery<HTMLInputElement>} $target - Campo validado.
         * @return {void}
         */
        function clearFieldValidationFeedback($target) {

            /** @type {string} - `clase de error del input` */
            const errorClass = options.errorClass || 'advanced-validation-error';

            $target.removeClass(errorClass);
            $target.next(`span.${fieldErrorMessageClass}`).remove();
        }


        /**
         * --------------------------------------------------
         * -----  `showFieldValidationError($target, message)`  -----
         * --------------------------------------------------
         * - Marca el campo y muestra el mensaje debajo.
         * @private
         * @param {JQuery<HTMLInputElement>} $target - Campo inválido.
         * @param {string} message - Texto a mostrar bajo el input.
         * @return {void}
         */
        function showFieldValidationError($target, message) {

            /** @type {string} - `clase de error del input` */
            const errorClass = options.errorClass || 'advanced-validation-error';

            $target.addClass(errorClass);

            /** @type {JQuery<HTMLSpanElement>} - `mensaje bajo el campo` */
            const $error = $('<span>')
                .addClass(fieldErrorMessageClass)
                .attr('role', 'alert')
                .text(message);

            $target.after($error);
        }



        /**
         * ---------------------------
         * -----  `_validate()`  -----
         * ---------------------------
         * - Valida todos los campos `.advanced-validation` del formulario.
         * @return {JQuery.Promise<void>} Promesa resuelta si es válido; rechazada si hay errores.
         */
        function _validate() {

            setIsValid(true);

            /** @type {JQuery.Deferred<void, void, void>} */
            const deferred = $.Deferred();

            /** @type {JQuery} - `colección jQuery (.find), no es NodeList` */
            const targetValidation = $el.find('.advanced-validation');


            $.each(targetValidation, function (i, item) {

                /** @type {HTMLInputElement} - `nodo DOM en cada iteración de $.each` */
                const input = /** @type {HTMLInputElement} */ (item);

                /** @type {JQuery<HTMLInputElement>} */
                const $target = $(input);

                clearFieldValidationFeedback($target);

                /** @type {string|null} - `mensaje de error del campo` */
                const fieldErrorMessage = getAdvancedFieldErrorMessage($target);

                if (fieldErrorMessage !== null) {
                    setIsValid(false);
                    showFieldValidationError($target, fieldErrorMessage);
                }

            });


            //  -----  si el formulario es válido, se resuelve la promesa  -----
            if (isValid()) {
                deferred.resolve();
            }

            //  -----  si el formulario es inválido, se rechaza la promesa  -----
            else {
                deferred.reject();
            }

            //  -----  se devuelve la promesa tanto si es válido como si es inválido  -----
            return deferred.promise();

        }


        /**
         * --------------------
         * -----  `init()`  -----
         * --------------------
         * - Enlaza el submit del formulario y ejecuta la validación.
         * @return {void}
         */
        function init() {

            $el.on('submit', function (e) {

                e.preventDefault();

                validate()
                    .done(function () {
                        el.submit();
                    })
                    .fail(function () {
                        e.preventDefault();
                    });

            });

            hook('onInit');
        }


        /**
         * -----------------------------------
         * -----  `option(key, val)`  -----
         * -----------------------------------
         * - Obtiene o establece una opción del plugin.
         * @template {keyof AdvancedValidationOptions} K
         * @param {K} key - Nombre de la opción.
         * @param {AdvancedValidationOptions[K]} [val] - Valor a asignar; si se omite, solo lectura.
         * @return {AdvancedValidationOptions[K] | void} Valor de la opción al leer; nada al escribir.
         */
        function option(key, val) {

            if (val !== undefined) {
                options[key] = val;
                return;
            }

            return options[key];
        }


        /**
         * -------------------------
         * -----  `destroy()`  -----
         * -------------------------
         * - Restaura el elemento y elimina la instancia del plugin.
         * @return {void}
         */
        function destroy() {

            $el.find('.advanced-validation').each(function () {

                /** @type {JQuery<HTMLInputElement>} */
                const $field = $(/** @type {HTMLInputElement} */ (this));
                clearFieldValidationFeedback($field);
            });

            hook('onDestroy');
            $el.removeData('plugin_' + pluginName);
        }


        /**
         * -------------------------------
         * -----  `hook(hookName)`  -----
         * -------------------------------
         * - Invoca un callback definido en las opciones del plugin.
         * @param {keyof AdvancedValidationOptions} hookName - Nombre del hook (p. ej. `onInit`, `onDestroy`).
         * @return {void}
         */
        function hook(hookName) {
            
            const callback = options[hookName];

            if (typeof callback === 'function') {
                callback.call(el);
            }
        }


        init();


        /**
         * ----------------------------------
         * -----  `pluginPublicApi` {}  -----
         * -----------------------------------
         * - API pública de la instancia.
         * @type {AdvancedValidationApi} */
        const pluginPublicApi = {
            option: option,
            destroy: destroy,
            isValid: isValid,
            validate: validate,
        };

        return pluginPublicApi;
    }


    /**
     * -------------------------------------------------------
     * -----  `$.fn.advancedValidation(options)`  -----
     * -------------------------------------------------------
     * - Definición del plugin: inicialización o llamada a métodos públicos.
     */
    /** @type {AdvancedValidationPlugin} */
    $.fn[pluginName] = function (options) {

        if (typeof arguments[0] === 'string') {

            /** @type {string} */
            const methodName = arguments[0];

            /** @type {Array<*>} */
            const args = Array.prototype.slice.call(arguments, 1);

            /** @type {*|undefined} */
            let returnVal;

            this.each(function () {

                /** @type {AdvancedValidationApi|undefined} */
                const instance = $.data(this, 'plugin_' + pluginName);

                if (instance && typeof instance[methodName] === 'function') {
                    returnVal = instance[methodName].apply(instance, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });


            if (returnVal !== undefined) {
                return returnVal;
            }

            else {
                return this;
            }

        }


        else if (typeof options === 'object' || !options) {

            return this.each(function () {

                if (!$.data(this, 'plugin_' + pluginName)) {

                    $.data(
                        this,
                        'plugin_' + pluginName,
                        Plugin(/** @type {HTMLFormElement} */ (this), options)
                    );

                }

            });

        }

    };


    /**
     * ------------------------------------------------
     * -----  `$.fn.advancedValidation.defaults`  -----
     * ------------------------------------------------
     * - Opciones por defecto del plugin.
     * @type {AdvancedValidationPlugin['defaults']}
     */
    $.fn[pluginName].defaults = {
        errorClass: 'advanced-validation-error',
        message: 'Campo inválido',
        onInit: function () { },
        onDestroy: function () { }
    };


})(jQuery);
