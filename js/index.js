$(document).ready(function () {
    $('#loader').fadeOut(1500, function () {
        $(this).hide(0, function () {
            $('#all-content').show()
        })
    })

    $.ajax({
        url: './components/list.html',
        type: 'GET',
        dataType: 'text',
        success: function (response) {
            $('#books-content').html(response)
            $.ajax({
                url: './data/data.json',
                type: 'GET',
                dataType: 'json',
                success: function (books) {
                    debugger
                    Array.from(books).forEach(element => {
                        let item = $('#book').clone().appendTo('.books-content');
                        let currentHtml = item.html();
                        let newHtml = "";
                        Object.keys(element).forEach(k => {
                            newHtml = currentHtml.replace("{{" + k + "}}", element[k]);
                            currentHtml = newHtml;
                        });
                        item.html(newHtml)
                    });
                    $('#book').remove();
                }
            })
        },
        error: function () {
            console.log(error)
        },
        complete: function (xhr, status) {
            console.log(status)
        }
    })

    $('#activator-menu').one('click', reduceSizeNav)

    function reduceSizeNav() {
        changeSizeNav(true)
        $(this).one('click', maximazeSizeNav)
    }

    function maximazeSizeNav() {
        changeSizeNav(false)
        $(this).one('click', reduceSizeNav)
    }

    function changeSizeNav(reduce) {
        var widthNav
        if (reduce) {
            $('#username-navbar').hide()
            widthNav = '150px'
        }
        else {
            $('#username-navbar').show()
            widthNav = '350px'
        }
        $('#container-nav-header').animate({
            width: widthNav
        }, 500)
    }
})