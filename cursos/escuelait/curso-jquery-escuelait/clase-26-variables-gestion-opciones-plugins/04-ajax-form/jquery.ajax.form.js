/*
    *  -------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.ajax.form.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/04-ajax-form/jquery.ajax.form.js  -----  *
    *  -------------------------------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {


    /**
     * ---------------------------
     * -----  `defaults {}`  -----
     * ---------------------------
     * - Valores por defecto del plugin.
     * @type {Required<AjaxFormOptions>}
     */
    const defaults = {
        url: '',
        type: 'POST',
        target: '',
        onSuccess: () => {},
        onError: () => {},
        onAlways: () => {}
    };


    /**
     * ---------------------------------
     * -----  `ajaxForm(options)`  -----
     * ---------------------------------
     * - Envía el formulario por Ajax y evita la recarga de la página.
     * - Fusiona las opciones recibidas con `defaults` y con `action` / `method` del form.
     * @param {AjaxFormOptions} [options] - Opciones del plugin.
     * @this {JQuery} - `formulario que dispara el plugin`
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.ajaxForm = function (options) {


        return this.each(function () {

            /** @type {HTMLFormElement} - `formulario que dispara el plugin` */
            const form = /** @type {HTMLFormElement} */ (this);

            /** @type {JQuery<HTMLFormElement>} - `formulario envuelto` */
            const $form = /** @type {JQuery<HTMLFormElement>} */ ($(form));

            /** @type {Required<AjaxFormOptions>} - `opciones fusionadas` */
            const settings = $.extend(
                {},
                defaults,
                {
                    url: $form.attr('action') || defaults.url,
                    type: $form.attr('method') || defaults.type,
                    target: /** @type {string} */ ($form.data('ajaxformTarget') || defaults.target)
                },
                options
            );

            //  -----  convertir el tipo de petición a mayúsculas  -----
            settings.type = settings.type.toUpperCase();


            //  -----  capturar el evento submit del formulario  -----
            $form.on('submit', (event) => {
                
                event.preventDefault();

                $.ajax({
                    url: settings.url,
                    type: settings.type,
                    data: $form.serialize(),
                    dataType: 'json'
                })
                    .done((/** @type {AjaxFormResponse} */ respuesta) => {

                        //  -----  pintar el mensaje en el destino si hay target  -----
                        if (settings.target) {
                            /** @type {JQuery<HTMLElement>} - `destino de la respuesta` */
                            const $target = $(settings.target);
                            $target.text(respuesta.mensaje);

                            //  -----  marcar error si php indica que no es ok  -----
                            if (respuesta.ok) {
                                $target.removeClass('error-message');
                            } else {
                                $target.addClass('error-message');
                            }
                        }

                        //  -----  callback segun el ok de php  -----
                        if (respuesta.ok) {
                            settings.onSuccess.call(form, respuesta);
                        } else {
                            settings.onError.call(form, respuesta.mensaje);
                        }
                    })
                    
                    .fail((jqXHR, textStatus) => {

                        /** @type {AjaxFormResponse | undefined} - `json de php si lo hay` */
                        const respuesta = /** @type {AjaxFormResponse | undefined} */ (jqXHR.responseJSON);

                        /** @type {string} - `mensaje de php o estado ajax` */
                        const mensaje = respuesta?.mensaje || textStatus;

                        //  -----  pintar el error en el destino si hay target  -----
                        if (settings.target) {
                            $(settings.target).text(mensaje).addClass('error-message');
                        }

                        settings.onError.call(form, mensaje);
                    })

                    .always(() => {
                        settings.onAlways.call(form);
                    });
                   
            });

        });

    };


})(jQuery);
