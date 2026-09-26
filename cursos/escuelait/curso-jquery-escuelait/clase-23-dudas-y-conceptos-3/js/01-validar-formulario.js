/*
    *  --------------------------------------  *
    *  -----  01-validar-formulario.js  -----  *
    *  --------------------------------------  *
*/


/// <reference path="../../../../../types/global.d.ts" />



$(function () {


    /** @type {JQuery<HTMLSelectElement>} - `Select de productos` */
    const $selecProductos = $('.form-control');


    /**
     * -----------------------------------------
     * -----  `estanCambiados(elementos)`  -----
     * -----------------------------------------
     * @param {JQuery<HTMLSelectElement>} elementos 
     * @returns {boolean} - `true` si los elementos han cambiado, `false` si no han cambiado
     */
    const estanCambiados = (elementos) => {

        for (let index = 0; index < elementos.length; index++) {

            console.log(elementos.eq(index));

            if (elementos.eq(index).val() === '') {
                return false;
            }
        }

        return true;
    }


    //  -----  Evento que se ejecuta cuando se cambia el valor de los select de productos  -----
    $selecProductos.on('change', function () {

        console.log('\n\nProducto seleccionado');

        let cambiados = estanCambiados($selecProductos);

        if (cambiados) {
            console.log('Los elementos han cambiado');
        } else {
            console.log('Los elementos no han cambiado');
        }

    });


});