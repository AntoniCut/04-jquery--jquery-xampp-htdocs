/*
    *  --------------------------------------------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.fontsizer-advanced.js  --  /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/plugins/jquery.fontsizer-advanced.js  -----  *
    *  --------------------------------------------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * ------------------------------------------
     * -----  `fontSizerAdvanced(options)`  -----
     * ------------------------------------------
     * - Anima el tamaño de fuente del objetivo según `data-fontsizer` al hacer clic.
     * - Fusiona las opciones recibidas con los valores por defecto mediante `$.extend`.
     * @param {{ target?: string, onFontResized?: function(): void }} [options] - Opciones del plugin.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.fontSizerAdvanced = function (options) {


        /** @type {{ target: string, onFontResized: function(): void }} - `opciones por defecto` */
        const defaults = {
            target: '#fontSizer',
            onFontResized: () => {}
        };

        /** @type {{ target: string, onFontResized: function(): void }} - `opciones fusionadas` */
        const settings = $.extend({}, defaults, options);


        return this.each(function () {

            /** @type {JQuery<HTMLElement>} - `elemento que dispara el plugin` */
            const $this = /** @type {JQuery<HTMLElement>} */ ($(this));

            $this.on('click', (event) => {
                
                event.preventDefault();

                /** @type {string} - `incremento o decremento de fuente segun el valor de `data-fontsizer` del elemento que dispara el plugin` */
                const fontSizer = /** @type {string} */ ($this.data('fontsizer'));

                $.when(
                    $(settings.target).animate({ 'font-size': fontSizer })
                )
                    .done(() => {
                        settings
                            .onFontResized
                            .call(this, 'p1', 'p2', 'p3');
                    });
                        
            });

        });

    };


})(jQuery);
