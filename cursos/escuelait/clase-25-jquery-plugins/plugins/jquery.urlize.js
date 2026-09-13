/*
    *  ------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.urlize.js  --  /cursos/escuelait/clase-25-jquery-plugins/plugins/jquery.urlize.js  -----  *
    *  ------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * ------------------------
     * -----  `urlize()`  -----
     * ------------------------
     * - Hace clickable cada elemento y redirige a la URL de `data-url`.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.urlize = function () {

        return this.each(function () {

            const $this = $(this);

            $this.css('cursor', 'pointer');

            $this.on('click', () => {

                /** @type {string} - URL a la que se redirigirá */
                const url = $this.data('url');

                if (url)
                    location.href = url;

            });

        });
        
    };


})(jQuery);
