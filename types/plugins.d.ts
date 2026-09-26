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


    /**
     * --------------------------------------------
     * -----  `AdvancedValidationOptions {}`  -----
     * --------------------------------------------
     * Opciones de `advancedValidation`.
     * Se fusionan con los valores por defecto mediante `$.extend`.
     */
    interface AdvancedValidationOptions {
        /** Selector de los campos a revisar. */
        selector?: string;
        /** Clase que se añade al campo si no es válido. */
        errorClass?: string;
        /** Texto del mensaje de error junto al campo. */
        message?: string;
        /** Callback al crear la instancia. Recibe el formulario como `this`. */
        onInit?: (this: HTMLFormElement) => void;
        /** Callback al destruir la instancia. Recibe el formulario como `this`. */
        onDestroy?: (this: HTMLFormElement) => void;
        /** Callback al empezar a validar. Puede devolver una promesa para esperar. Recibe el formulario como `this`. */
        onValidating?: (this: HTMLFormElement) => void | JQuery.Promise<void>;
        /** Callback si el formulario es válido. Recibe el formulario como `this`. */
        onIsValid?: (this: HTMLFormElement) => void;
        /** Callback si el formulario no es válido. Recibe el formulario como `this`. */
        onIsNotValid?: (this: HTMLFormElement) => void;
        /** Callback al terminar la validación, vaya bien o mal. Recibe el formulario como `this`. */
        onValidated?: (this: HTMLFormElement) => void;
    }


    /**
     * ----------------------------------------
     * -----  `AdvancedValidationApi {}`  -----
     * ----------------------------------------
     * Métodos públicos guardados en `$.data` del formulario.
     */
    interface AdvancedValidationApi {
        
        /** Lee o escribe una opción de la instancia. */
        option(
            key: keyof AdvancedValidationOptions, 
            value?: AdvancedValidationOptions[keyof AdvancedValidationOptions]
        ): AdvancedValidationOptions[keyof AdvancedValidationOptions] | void;
        
        /** Quita eventos, marcas de error e instancia. */
        destroy(): void;
        
        /** Resultado de la última validación. `undefined` si aún no se ha validado. */
        isValid(): boolean | undefined;
        
        /** Valida y dispara los hooks. La promesa se rechaza si no es válido. */
        validate(): JQuery.Promise<void>;
    }


    /**
     * --------------------------------------------
     * -----  `AdvancedValidationCallResult`  -----
     * --------------------------------------------
     * Valor de `advancedValidation` al crear la instancia o al llamar a un método público.
     */
    type AdvancedValidationCallResult =
        | JQuery
        | boolean
        | undefined
        | JQuery.Promise<void>
        | AdvancedValidationOptions[keyof AdvancedValidationOptions];


    /**
     * -------------------------------------------
     * -----  `AdvancedValidationPlugin {}`  -----
     * -------------------------------------------
     * Firma de `$.fn.advancedValidation` y sus valores por defecto.
     */
    interface AdvancedValidationPlugin {

        /**
         * -------------------------------------------
         * -----  `advancedValidation(options)`  -----
         * -------------------------------------------
         * - Valida al enviar los campos con `data-basic-validation-required`.
         * - Guarda una instancia por formulario y no vuelve a crearla.
         * @param {AdvancedValidationOptions} [options] - Opciones del plugin.
         * @param {string} [options.selector] - Selector de los campos a revisar.
         * @param {string} [options.errorClass] - Clase que se añade al campo si no es válido.
         * @param {string} [options.message] - Texto del mensaje de error junto al campo.
         * @param {(this: HTMLFormElement) => void} [options.onInit] - Callback al crear la instancia.
         * @param {(this: HTMLFormElement) => void} [options.onDestroy] - Callback al destruir la instancia.
         * @param {(this: HTMLFormElement) => void | JQuery.Promise<void>} [options.onValidating] - Callback al empezar a validar.
         * @param {(this: HTMLFormElement) => void} [options.onIsValid] - Callback si el formulario es válido.
         * @param {(this: HTMLFormElement) => void} [options.onIsNotValid] - Callback si el formulario no es válido.
         * @param {(this: HTMLFormElement) => void} [options.onValidated] - Callback al terminar la validación.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
         */
        (options?: AdvancedValidationOptions): JQuery;


        /**
         * ----------------------------------------------
         * -----  `advancedValidation("validate")`  -----
         * ----------------------------------------------
         * - Llama al método público `validate` de la instancia.
         * @param {'validate'} method - Nombre del método.
         * @return {JQuery.Promise<void>} - Se rechaza si el formulario no es válido.
         */
        (method: 'validate'): JQuery.Promise<void>;


        /**
         * ---------------------------------------------
         * -----  `advancedValidation("isValid")`  -----
         * ---------------------------------------------
         * - Llama al método público `isValid` de la instancia.
         * @param {'isValid'} method - Nombre del método.
         * @return {boolean | undefined} - Resultado de la última validación.
         */
        (method: 'isValid'): boolean | undefined;


        /**
         * ---------------------------------------------
         * -----  `advancedValidation("destroy")`  -----
         * ---------------------------------------------
         * - Llama al método público `destroy` de la instancia.
         * @param {'destroy'} method - Nombre del método.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
         */
        (method: 'destroy'): JQuery;


        /**
         * -------------------------------------------------
         * -----  `advancedValidation("option", key)`  -----
         * -------------------------------------------------
         * - Lee una opción de la instancia.
         * @template {keyof AdvancedValidationOptions} K
         * @param {'option'} method - Nombre del método.
         * @param {K} key - Nombre de la opción.
         * @return {Required<AdvancedValidationOptions>[K]} - Valor guardado.
         */
        <K extends keyof AdvancedValidationOptions>(method: 'option', key: K): Required<AdvancedValidationOptions>[K];


        /**
         * --------------------------------------------------------
         * -----  `advancedValidation("option", key, value)`  -----
         * --------------------------------------------------------
         * - Escribe una opción de la instancia.
         * @template {keyof AdvancedValidationOptions} K
         * @param {'option'} method - Nombre del método.
         * @param {K} key - Nombre de la opción.
         * @param {Required<AdvancedValidationOptions>[K]} value - Nuevo valor.
         * @return {JQuery} - Cadena jQuery para encadenar métodos.
         */
        <K extends keyof AdvancedValidationOptions>(method: 'option', key: K, value: Required<AdvancedValidationOptions>[K]): JQuery;


        /** - `valores por defecto del plugin` */
        defaults: Required<AdvancedValidationOptions>;
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



        /*
            *  -----------------------------------------------------------------------------------  *
            *  -----  plugins jQuery (clase 27) — jquery.advanced-validation.js              -----  *
            *  -----  Documentación en 01-advanced-validation/jquery.advanced-validation.js  -----  *
            *  -----------------------------------------------------------------------------------  *
        */


        /**
         * -------------------------------------------
         * -----  `advancedValidation(options)`  -----
         * -------------------------------------------
         * - Valida al enviar los campos con `data-basic-validation-required`.
         * - Guarda una instancia por formulario y no vuelve a crearla.
         * - Si el primer argumento es un string, llama a `validate`, `isValid`, `option` o `destroy`.
         * - Los valores por defecto están en `defaults`.
         */
        advancedValidation: AdvancedValidationPlugin;

    }

}

//  -----  Exportación de tipos globales  -----  //
export { };
