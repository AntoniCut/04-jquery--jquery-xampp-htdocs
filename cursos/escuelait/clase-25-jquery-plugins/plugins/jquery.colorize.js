/*
    *  ----------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.colorize.js  --  /cursos/escuelait/clase-25-jquery-plugins/plugins/jquery.colorize.js  -----  *
    *  ----------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * --------------------------
     * -----  `colorize()`  -----
     * --------------------------
     * - Aplica el color indicado en `data-color` a cada elemento.
     * - En `input[type="color"]`, aplica el valor elegido al destino de `data-colorize-target`.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.colorize = function () {
        
        return this.each(function () {
            
            const $this = $(this);

            //  -----  input color: pinta el destino al cambiar el valor  -----
            if ($this.is('input[type="color"]')) {

                /** @type {string} - Selector del elemento cuyo color de texto se actualizará */
                const target = $this.data('colorizeTarget') || '#colorize';

                /**
                 * ------------------------------
                 * -----  `applyColor()`  -----
                 * ------------------------------
                 * - Aplica el color elegido en el input al destino de `data-colorize-target`.  
                 */
                const applyColor = () => {
                    
                    /** @type {string} - Color elegido en el input */
                    const color = String($this.val());

                    $(target).css('color', color);

                };


                applyColor();
                
                $this.on('input change', applyColor);

                return;
            }

            const color = $this.data('color');
            
            if (color) {
                $this.css('color', color);
            }

        });

    };


})(jQuery);
