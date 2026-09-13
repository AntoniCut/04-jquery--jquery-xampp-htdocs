/*
    *  -------------------------------------------------  *
    *  -----  global.d.ts  --  /types/global.d.ts  -----  *
    *  -------------------------------------------------  *
*/


//  -----  Referencias a otros archivos de tipos  -----  //
/// <reference path="./dom.d.ts" />
/// <reference path="./plugins.d.ts" />


//  -----  Declaración de tipos globales  -----  //
declare global {

    /*
        *  ------------------------------------------------------  *
        *  -----  Interfaces de jQuery en el objeto Window  -----  *
        *  ------------------------------------------------------  *
    */

    interface Window {
        $: JQueryStatic;
        jQuery: JQueryStatic;
    }

}

//  -----  Exportación de tipos globales  -----  //
export { };
