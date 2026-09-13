/*
    *  -------------------------------------------  *
    *  -----  dom.d.ts  --  /types/dom.d.ts  -----  *
    *  -------------------------------------------  *
*/


/// <reference lib="dom" />
/// <reference lib="es2022" />


/*
    * --------------------------------------------------------
    *  - Tipos DOM extendidos para compatibilidad
    *    (por si tu versión de lib.dom.d.ts no los incluye)
    * --------------------------------------------------------
 */

interface HTMLHeaderElement extends HTMLElement {}
interface HTMLFooterElement extends HTMLElement {}
interface HTMLMainElement extends HTMLElement {}
interface HTMLNavElement extends HTMLElement {}
interface HTMLSectionElement extends HTMLElement {}
interface HTMLArticleElement extends HTMLElement {}
interface HTMLAsideElement extends HTMLElement {}
interface HTMLFigureElement extends HTMLElement {}
interface HTMLFigcaptionElement extends HTMLElement {}
interface HTMLTimeElement extends HTMLElement {}


/**
 * --------------------------------------------------------
 *  - View Transitions API
 *    (declarada para compatibilidad con versiones de
 *     lib.dom.d.ts que no la incluyen, p.ej. Cursor)
 * --------------------------------------------------------
 */

interface ViewTransition {
    readonly finished: Promise<void>;
    readonly ready: Promise<void>;
    readonly updateCallbackDone: Promise<void>;
    skipTransition(): void;
}

interface Document {
    startViewTransition(callback: () => Promise<void> | void): ViewTransition;
}
