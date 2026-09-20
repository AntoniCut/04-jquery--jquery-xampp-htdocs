/*
    *  --------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.hilight.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/03-plugin-hilight/jquery.hilight.js  -----  *
    *  --------------------------------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {


    /**
     * ---------------------------
     * -----  `defaults {}`  -----
     * ---------------------------
     * - Valores por defecto del plugin.
     * @type {Required<HilightOptions>}
     */
    const defaults = {
        foreground: 'red',
        background: 'yellow',
        onFormatted: () => {}
    };


    /**
     * --------------------------------
     * -----  `hilight(options)`  -----
     * --------------------------------
     * - Resalta cada elemento: color, fondo y envuelve el contenido en `<strong>`.
     * - Fusiona las opciones recibidas con `defaults` mediante `$.extend`.
     * @param {HilightOptions} [options] - Opciones del plugin.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     * @this {JQuery}
     */
    $.fn.hilight = function (options) {

        /** @type {Required<HilightOptions>} - `opciones fusionadas` */
        const settings = $.extend({}, defaults, options);


        return this.each(function () {

            /** @type {JQuery<HTMLElement>} - `elemento a resaltar` */
            const $this = /** @type {JQuery<HTMLElement>} */ ($(this));

            $this.css({
                color: settings.foreground,
                'background-color': settings.background
            });

            $this.wrapInner($('<strong>'));

            settings.onFormatted.call(this);

        });

    };


    $.extend($.fn.hilight, { defaults });


})(jQuery);
