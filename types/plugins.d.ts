/*
    *  ---------------------------------------------------  *
    *  -----  plugins.d.ts  --  /types/plugins.d.ts  -----  *
    *  ---------------------------------------------------  *
*/


//  -----  Declaración de tipos globales para Handlebars  -----
declare const Handlebars: {
    compile(template: string): (context: Record<string, unknown>) => string;
};


//  -----  Declaración de tipos globales para jQuery  -----
declare global {
   

    /**
     * -------------------------------------------
     * -----  `FontSizerAdvancedOptions {}`  -----
     * -------------------------------------------
     * Opciones de `fontSizerAdvanced`.
     * Se fusionan con `{ target: '#fontSizer', onFontResized: () => {} }` mediante `$.extend`.
     */
    interface FontSizerAdvancedOptions {
        /** Selector del elemento cuya fuente se animará. */
        target?: string;
        /** Función a ejecutar cuando la fuente se ha animado. Recibe el elemento como `this`. */
        onFontResized?: (this: HTMLElement, param1?: string, param2?: string, param3?: string) => void;
    }


    /**
     * ---------------------------------
     * -----  `HilightOptions {}`  -----
     * ---------------------------------
     * Opciones de `hilight`.
     * Se fusionan con los valores por defecto mediante `$.extend`.
     */
    interface HilightOptions {
        /** Color del texto. */
        foreground?: string;
        /** Color de fondo. */
        background?: string;
        /** Función a ejecutar cuando el elemento ya está resaltado. Recibe el elemento como `this`. */
        onFormatted?: (this: HTMLElement) => void;
    }


    /**
     * ----------------------------------
     * -----  `AjaxFormOptions {}`  -----
     * ----------------------------------
     * Opciones de `ajaxForm`.
     * Se fusionan con `action` / `method` del formulario y con los valores por defecto.
     */
    interface AjaxFormOptions {
        /** URL de envío. Si se omite, se usa el `action` del formulario. */
        url?: string;
        /** Método HTTP. Si se omite, se usa el `method` del formulario o `POST`. */
        type?: string;
        /** Selector donde pintar `respuesta.mensaje`. */
        target?: string;
        /** Callback tras un envío correcto. Recibe el formulario como `this`. */
        onSuccess?: (this: HTMLFormElement, respuesta: AjaxFormResponse) => void;
        /** Callback si el Ajax falla o PHP devuelve `ok: false`. Recibe el formulario como `this`. */
        onError?: (this: HTMLFormElement, status: string) => void;
        /** Callback si el Ajax termina. Recibe el formulario como `this`. */
        onAlways?: (this: HTMLFormElement) => void;
    }


    /**
     * -----------------------------------
     * -----  `AjaxFormResponse {}`  -----
     * -----------------------------------
     * JSON que devuelve `enviar.php`.
     */
    interface AjaxFormResponse {
        /** Indica si nombre y email llegaron informados. */
        ok: boolean;
        /** Mensaje para pintar en el destino. */
        mensaje: string;
    }


    /**
     * -----------------------------------------
     * -----  `BasicValidationOptions {}`  -----
     * -----------------------------------------
     * Opciones de `basicValidation`.
     * Se fusionan con los valores por defecto mediante `$.extend`.
     */
    interface BasicValidationOptions {
        /** Selector de los campos a validar. */
        selector?: string;
        /** Clase que se añade al campo si no es válido. */
        errorClass?: string;
        /** Texto del mensaje de error junto al campo. */
        message?: string;
        /** Callback si el formulario no es válido. Recibe el formulario como `this`. */
        onInvalid?: (this: HTMLFormElement) => void;
    }


    interface JQuery {


        /*
            *  ------------------------------------------------------------------------------------------------  *
            *  -----  plugins jQuery (clase 25) — /cursos/escuelait/clase-25-jquery-plugins/plugins/*.js  -----  *
            *  -----  Documentación en /cursos/escuelait/clase-25-jquery-plugins/plugins/*.js             -----  *
            *  ------------------------------------------------------------------------------------------------  *
        */


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



        /*
            *  --------------------------------------------------------------------------------------------------------------------  *
            *  -----  plugins jQuery (clase 26) — /cursos/escuelait/clase-26-variables-gestion-opciones-plugins/plugins/*.js  -----  *
            *  -----  Documentación en /cursos/escuelait/clase-25-jquery-plugins/plugins/*.js                                 -----  *
            *  --------------------------------------------------------------------------------------------------------------------  *
        */


        /**
         * ------------------------------------------
         * -----  `fontSizerAdvanced(options)`  -----
         * ------------------------------------------
         * - Anima el tamaño de fuente del objetivo según `data-fontsizer` al hacer clic.
         * - Fusiona las opciones recibidas con `{ target: '#fontSizer' }` mediante `$.extend`.
         * @param {FontSizerAdvancedOptions} [options] - Opciones del plugin.
         * @param {string} [options.target] - Selector del elemento cuya fuente se animará.
         * @param {() => void} [options.onFontResized] - Función a ejecutar cuando la fuente se ha animado.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
        */
        fontSizerAdvanced(options?: FontSizerAdvancedOptions): JQuery;


        /**
         * --------------------------------
         * -----  `hilight(options)`  -----
         * --------------------------------
         * - Resalta cada elemento: color, fondo y envuelve el contenido en `<strong>`.
         * - Fusiona las opciones recibidas con los valores por defecto mediante `$.extend`.
         * @param {HilightOptions} [options] - Opciones del plugin.
         * @param {string} [options.foreground] - Color del texto.
         * @param {string} [options.background] - Color de fondo.
         * @param {(this: HTMLElement) => void} [options.onFormatted] - Callback al terminar el resaltado.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
        */
        hilight(options?: HilightOptions): JQuery;


        /**
         * ---------------------------------
         * -----  `ajaxForm(options)`  -----
         * ---------------------------------
         * - Envía el formulario por Ajax y evita la recarga de la página.
         * - Fusiona las opciones recibidas con los valores por defecto mediante `$.extend`.
         * @param {AjaxFormOptions} [options] - Opciones del plugin.
         * @param {string} [options.url] - URL de envío.
         * @param {string} [options.type] - Método HTTP.
         * @param {string} [options.target] - Selector donde pintar la respuesta.
         * @param {(this: HTMLFormElement, respuesta: AjaxFormResponse) => void} [options.onSuccess] - Callback si el envío va bien.
         * @param {(this: HTMLFormElement, status: string) => void} [options.onError] - Callback si el Ajax falla o PHP devuelve `ok: false`.
         * @param {(this: HTMLFormElement) => void} [options.onAlways] - Callback al terminar, vaya bien o mal.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
        */
        ajaxForm(options?: AjaxFormOptions): JQuery;


        /**
         * ----------------------------------------
         * -----  `basicValidation(options)`  -----
         * ----------------------------------------
         * - Valida al enviar los campos con la clase `.basic-validation`.
         * - Fusiona las opciones recibidas con los valores por defecto mediante `$.extend`.
         * @param {BasicValidationOptions} [options] - Opciones del plugin.
         * @param {string} [options.selector] - Selector de los campos a validar.
         * @param {string} [options.errorClass] - Clase que se añade al campo si no es válido.
         * @param {string} [options.message] - Texto del mensaje de error junto al campo.
         * @param {(this: HTMLFormElement) => void} [options.onInvalid] - Callback si el formulario no es válido.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
        */
        basicValidation(options?: BasicValidationOptions): JQuery;

    }

}

//  -----  Exportación de tipos globales  -----  //
export { };
