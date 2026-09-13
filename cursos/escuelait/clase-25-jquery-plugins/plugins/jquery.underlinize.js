/*
    *  ----------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.underlinize.js  --  /cursos/escuelait/clase-25-jquery-plugins/plugins/jquery.underlinize.js  -----  *
    *  ----------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * -----------------------------
     * -----  `underlinize()`  -----
     * -----------------------------
     * - Aplica subrayado a cada elemento de la colección.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.underlinize = function () {
        
        return this.each(function () {
            
            const $this = $(this);

            //  -----  aplica subrayado a cada elemento de la colección  -----  //
            $this.css('text-decoration', 'underline');

        });
        
    };


})(jQuery);
