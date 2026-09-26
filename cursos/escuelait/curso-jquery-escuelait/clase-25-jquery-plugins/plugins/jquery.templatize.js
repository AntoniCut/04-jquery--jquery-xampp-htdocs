/*
    *  --------------------------------------------------------------------------------------------------------------  *
    *  -----  jquery.templatize.js  --  /cursos/escuelait/clase-25-jquery-plugins/plugins/jquery.templatize.js  -----  *
    *  --------------------------------------------------------------------------------------------------------------  *
*/


(function ($) {

    /**
     * --------------------------------------------------------
     * -----  `renderTemplate($target, source, context)`  -----
     * --------------------------------------------------------
     * - Compila la plantilla Handlebars y actualiza el destino.
     * @param {JQuery} $target - Elemento donde se insertará el HTML generado.
     * @param {string} source - Código fuente de la plantilla Handlebars.
     * @param {Record<string, unknown>} context - Datos del contexto Handlebars.
     * @return {void}
     */
    const renderTemplate = ($target, source, context) => {

        /** @type {(context: Record<string, unknown>) => string} - Plantilla compilada */
        const compiledTemplate = Handlebars.compile(source);

        /** @type {string} - HTML generado */
        const html = compiledTemplate(context);

        $target.html(html);
    };


    /**
     * ------------------------------------------
     * -----  `templatize(template, data)`  -----
     * ------------------------------------------
     * - Compila una plantilla Handlebars y reemplaza el contenido del elemento.
     * - Si `data` es un objeto, lo usa como contexto Handlebars.
     * - Si `data` es una URL, obtiene un JSON con `$.getJSON` y lo usa como contexto.
     * @param {string} template - Id o selector del `<script>` con la plantilla.
     * @param {Record<string, unknown> | string} data - Contexto Handlebars o URL del JSON.
     * @return {JQuery} - Cadena jQuery para encadenar métodos.
     */
    $.fn.templatize = function (template, data) {

        return this.each(function () {

            const $this = $(this);

            /** @type {string} - Selector del script plantilla */
            const selector = template.startsWith('#') ? template : `#${template}`;

            /** @type {string | undefined} - Código fuente de la plantilla Handlebars */
            const source = $(selector).html();

            if (!source)
                return;

            //  -----  contexto desde una URL JSON  -----  //
            if (typeof data === 'string') {

                $.getJSON(data)
                    .done((json) => {
                        renderTemplate($this, source, json);
                    })
                    .fail((error) => {
                        console.error('Error al obtener JSON para templatize:', error);
                    });

                return;
            }

            //  -----  contexto desde un objeto  -----  //
            renderTemplate($this, source, data);

        });

    };


})(jQuery);
