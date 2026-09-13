/*
    *  ---------------------------------------------------  *
    *  -----  plugins.d.ts  --  /types/plugins.d.ts  -----  *
    *  ---------------------------------------------------  *
*/


//  -----  Declaración de tipos globales  -----  //
declare const Handlebars: {
    compile(template: string): (context: Record<string, unknown>) => string;
};

declare global {


    /*
        *  ------------------------------------------------------------------------------------------------  *
        *  -----  plugins jQuery (clase 25) — /cursos/escuelait/clase-25-jquery-plugins/plugins/*.js  -----  *
        *  -----  Documentación en /cursos/escuelait/clase-25-jquery-plugins/plugins/*.js             -----  *
        *  ------------------------------------------------------------------------------------------------  *
    */

    interface JQuery {


        /**
         * ------------------------
         * -----  `urlize()`  -----
         * ------------------------
         * - Hace clickable cada elemento y redirige a la URL de `data-url`.
        */
        urlize(): JQuery;


        /**
         * -----------------------------
         * -----  `underlinize()`  -----
         * -----------------------------
         * - Aplica subrayado a cada elemento de la colección.
        */
        underlinize(): JQuery;


        /**
         * -------------------------
         * -----  `boldize()`  -----
         * -------------------------
         * - Aplica negrita a cada elemento de la colección.
        */
        boldize(): JQuery;


        /**
         * --------------------------
         * -----  `colorize()`  -----
         * --------------------------
         * - Aplica el color indicado en `data-color` a cada elemento.
         * - En `input[type="color"]`, aplica el valor elegido al destino de `data-colorize-target`.
        */
        colorize(): JQuery;


        /**
         * ---------------------------
         * -----  `fontSizer()`  -----
         * ---------------------------
         * - Anima el tamaño de fuente del objetivo según `data-fontsizer` al hacer clic.
         * - Usa `data-fontsizer-target` para indicar el selector destino (por defecto `#mydiv`).
        */
        fontSizer(): JQuery;


        /**
         * ------------------------------------------
         * -----  `templatize(template, data)`  -----
         * ------------------------------------------
         * - Compila una plantilla Handlebars y reemplaza el contenido del elemento.
         * @param {string} template - Id o selector del `<script>` con la plantilla.
         * @param {Record<string, unknown> | string} data - Contexto Handlebars o URL del JSON.
         * - Si `data` es un objeto, lo usa como contexto Handlebars.
         * - Si `data` es una URL, obtiene un JSON con `$.getJSON` y lo usa como contexto.
        */
        templatize(template: string, data: Record<string, unknown> | string): JQuery;
        

    }

}

//  -----  Exportación de tipos globales  -----  //
export { };
