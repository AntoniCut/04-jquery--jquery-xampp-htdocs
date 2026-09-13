/*
    *  --------------------------------------------  *
    *  -----  deferred.js  --  /deferred.js  -----  *
    *  --------------------------------------------  *
*/

$(() => {

    const deferred = $.Deferred();

    const show = (text) => {
        $('<p></p>').text(text).appendTo('#message');
    };

    deferred
        .done(() => {
            show('done');
        })
        .fail(() => {
            show('fail');
        })
        .always(() => {
            show('always');
        })
        .always(() => {
            show('always');
        });

    deferred.reject();
    show(deferred.state());

    deferred.resolve();
    show(deferred.state());

});
