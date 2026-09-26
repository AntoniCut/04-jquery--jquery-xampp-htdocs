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


    /**
     * ---------------------------
     * -----  `defaults {}`  -----
     * ---------------------------
     * - Valores por defecto del plugin.
     * @type {Required<AdvancedValidationOptions>}
     */
    const defaults = {
        selector: '.basic-validation',
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
     * - Los métodos públicos se guardan en `$.data` del formulario.
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
         * - Lee si la última validación del formulario fue correcta.
         * @return {boolean | undefined} - `true` si es válido, `undefined` si aún no se ha validado.
         */
        const isValid = () => {
            return /** @type {boolean | undefined} */ ($el.data('basic-validation-isvalid'));
        };


        /**
         * ---------------------------------
         * -----  `setIsValid(value)`  -----
         * ---------------------------------
         * - Guarda el resultado de la validación en el formulario.
         * @param {boolean} value - Resultado de la validación.
         * @return {void}
         */
        const setIsValid = (value) => {
            $el.data('basic-validation-isvalid', value);
        };


        /**
         * --------------------------------
         * -----  `validateFields()`  -----
         * --------------------------------
         * - Revisa los campos obligatorios y marca los que están vacíos.
         * - Solo exige los que llevan `data-basic-validation-required`.
         * @return {JQuery.Promise<void>} - Se resuelve si el formulario es válido.
         */
        const validateFields = () => {

            /** @type {JQuery.Deferred<void>} - `resultado de la validación` */
            const deferred = $.Deferred();

            setIsValid(true);

            $el.find(settings.selector).each(function () {

                /** @type {JQuery<HTMLInputElement | HTMLTextAreaElement>} - `campo a validar` */
                const $field = /** @type {JQuery<HTMLInputElement | HTMLTextAreaElement>} */ ($(this));

                /** - `el campo es obligatorio si el data attribute viene informado` */
                const required = Boolean($field.data('basic-validation-required'));

                $field.removeClass(settings.errorClass);
                $field.next('span.basic-validation-error').remove();

                //  -----  sin el data attribute el campo no se valida  -----
                if (!required) {
                    return;
                }

                /** @type {string} - `valor del campo sin espacios` */
                const value = String($field.val() ?? '').trim();

                //  -----  si el campo está vacío, marcar error  -----
                if (value === '') {
                    setIsValid(false);
                    $field.addClass(settings.errorClass);

                    /** @type {HTMLSpanElement} - `mensaje de error` */
                    const error = document.createElement('span');
                    error.className = 'basic-validation-error';
                    error.textContent = settings.message;
                    $field.after(error);
                }

            });

            //  -----  resolver o rechazar según el resultado ya guardado  -----
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
         * - Ejecuta un callback de las opciones con el formulario como `this`.
         * @param {keyof AdvancedValidationOptions} hookName - Nombre del callback.
         * @return {void | JQuery.Promise<void>} - Lo que devuelva el callback, si devuelve algo.
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
         * - Lanza la validación y los hooks `onValidating`, `onIsValid`, `onIsNotValid` y `onValidated`.
         * @return {JQuery.Promise<void>} - Se rechaza si el formulario no es válido.
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
         * - Lee o escribe una opción de la instancia.
         * @param {keyof AdvancedValidationOptions} key - Nombre de la opción.
         * @param {AdvancedValidationOptions[keyof AdvancedValidationOptions]} [value] - Nuevo valor. Si se omite, solo lee.
         * @return {AdvancedValidationOptions[keyof AdvancedValidationOptions] | void} - Valor leído, o nada si se escribió.
         */
        const option = (key, value) => {

            if (value !== undefined) {

                /** @type {Record<keyof AdvancedValidationOptions, AdvancedValidationOptions[keyof AdvancedValidationOptions]>} - `opciones con escritura por clave` */
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
         * - Quita la validación y la instancia guardada en el formulario.
         * @return {void}
         */
        const destroy = () => {

            $el.off('submit.' + pluginName);

            $el.find(settings.selector).each(function () {

                /** @type {JQuery<HTMLElement>} - `campo con restos de la validación` */
                const $field = /** @type {JQuery<HTMLElement>} */ ($(this));

                $field.removeClass(settings.errorClass);
                $field.next('span.basic-validation-error').remove();
            });

            $el.removeData('basic-validation-isvalid');

            hook('onDestroy');

            //  -----  sin instancia, una llamada posterior a un método lanza error  -----
            $el.removeData(dataKey);
        };


        /**
         * ----------------------
         * -----  `init()`  -----
         * ----------------------
         * - Valida al enviar y cancela el envío si el formulario no es válido.
         * @return {void}
         */
        const init = () => {

            //  -----  el flag queda escrito en el acto; el fail del deferred llega después  -----
            $el.on('submit.' + pluginName, (event) => {

                validate();

                if (!isValid()) {
                    event.preventDefault();
                }
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
     * - Crea una instancia por elemento, o llama a un método público si el primer argumento es un string.
     * - Métodos: `validate`, `isValid`, `option`, `destroy`.
     * @param {AdvancedValidationOptions | string} [options] - Opciones del plugin o nombre del método.
     * @this {JQuery} - `formulario que dispara el plugin`
     * @return {AdvancedValidationCallResult} - Cadena jQuery, o el valor del método.
     */
    const advancedValidation = function (options) {


        //  -----  string: llamada a un método público de la instancia  -----
        if (typeof arguments[0] === 'string') {

            /** @type {string} - `nombre del método público` */
            const methodName = arguments[0];

            /** @type {unknown[]} - `argumentos del método, sin el nombre` */
            const args = Array.prototype.slice.call(arguments, 1);

            /** @type {AdvancedValidationCallResult} - `valor devuelto por el método` */
            let returnVal;

            this.each(function () {

                /** @type {Record<string, (...args: unknown[]) => AdvancedValidationCallResult> | undefined} - `instancia del elemento` */
                const instance = $.data(this, dataKey);

                if (instance && typeof instance[methodName] === 'function') {
                    returnVal = instance[methodName].apply(this, args);
                } else {
                    throw new Error('Method ' + methodName + ' does not exist on jQuery.' + pluginName);
                }
            });

            //  -----  si el método devuelve algo, se pierde el encadenado  -----
            if (returnVal !== undefined) {
                return returnVal;
            }

            return this;
        }


        //  -----  objeto u omisión: una instancia por elemento  -----
        if (typeof options !== 'string') {

            return this.each(function () {

                //  -----  no volver a crear la instancia si ya existe  -----
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

    $.fn.advancedValidation.defaults = defaults;


})(jQuery);
