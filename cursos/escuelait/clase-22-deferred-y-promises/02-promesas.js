

$(() => {

    const $myButton = $('#mybutton');
    const $myButton2 = $('#mybutton2');
    const $myButton3 = $('#mybutton3');
    
    const $myDiv = $('#mydiv');
    const $myDiv2 = $('#mydiv2');
    const $myDiv3 = $('#mydiv3');


    const showResult = function (element, html) {
        element.append(html);
    }

    const showIsPartialError = function (element, html) {
        showResult('Error al cargar el partial');
    }


    $myButton.on('click', function () {

        $myDiv.empty();

        $.get('_partial-01.html', function (data) {
            console.log({ data });
            $('#mydiv').append(data);
        });

        $.get('_partial-02.html')
            .done((html) => showResult($myDiv, html))
            .fail(showIsPartialError);

        $.get('_partial-01.html').done(function (x1, x2, x3) {
            showResult($myDiv, x1);
        });

    });



    $myButton2.on('click', function () {

        $myDiv2.empty();

        $.when($.get('_partial-01.html'))
            .done((html) => showResult($myDiv2, html))
            .fail(showIsPartialError);

    });

    

    $myButton3.on('click', function () {

        $myDiv3.empty();

        $.when(
            $.get('_partial-01.html'),
            $.get('_partial-02.html')
        )
            .done((get1Return, get2Return) => {
                const html1 = get1Return[0];
                const html2 = get2Return[0];
                showResult($myDiv3, html1 + html2);
            })
            .fail(showIsPartialError);

    });

    

});