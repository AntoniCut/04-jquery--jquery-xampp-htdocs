/*
    *  --------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.boldize.js  --  /cursos/escuelait/clase-25-jquery-plugins/plugins/jquery.boldize.js  -----  *
    *  --------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * -------------------------
     * -----  `boldize()`  -----
     * -------------------------
     * - Aplica negrita a cada elemento de la colección.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.boldize = function () {
        
        return this.each(function () {
            
            const $this = $(this);

            //  -----  aplica negrita a cada elemento de la colección  -----  //
            $this.css('font-weight', 'bold');

        });
        
    };


})(jQuery);
