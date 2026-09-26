/*
    *  ------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.fontSizer.js  --  /cursos/escuelait/clase-25-jquery-plugins/plugins/jquery.fontSizer.js  -----  *
    *  ------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * ---------------------------
     * -----  `fontSizer()`  -----
     * ---------------------------
     * - Anima el tamaño de fuente del objetivo según `data-fontsizer` al hacer clic.
     * - Usa `data-fontsizer-target` para indicar el selector destino (por defecto `#mydiv`).
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.fontSizer = function () {
        
        return this.each(function () {
            
            const $this = $(this);

            $this.on('click', () => {
                
                /** @type {string} - Selector del elemento cuya fuente se animará */
                const target = $this.data('fontsizerTarget') || '#mydiv';

                $(target).animate({ 'font-size': $this.data('fontsizer') });
            });

        });

    };

    
})(jQuery);
