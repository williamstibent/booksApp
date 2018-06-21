$(document).ready(function () {
    $('#loader').fadeOut(1500, function () {
        $(this).hide(0, function () {
            $('#all-content').show()
        })
    })

    router($(window)[0].location)

    $(window).on('hashchange', function (e) {
        let event = e.originalEvent
        let hash = event.newURL.split('#')[1];

        $.getJSON('./js/routes.json').done(function (response) {
            response.map(function (data) {
                if (location.hash == "" && data.path == "/") {
                    getContent("./components/" + data.component);
                } else if (hash == data.path) {
                    getContent("./components/" + data.component);
                }
            });
        });
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

    function router(location) {
        let hash = location.hash.split('#')[1]

        $.getJSON('./js/routes.json').done(function (response) {
            response.map(function (data) {
                if (location.hash == "" && data.path == "/")
                    getContent("./components/" + data.component)
                else if (hash == data.path)
                    getContent("./components/" + data.component)
            })
        })
    }

    function getContent(path) {
        $.ajax({
            url: path,
            type: 'GET',
            dataType: 'text',
            success: function (response) {
                $('#books-content').html(response)
                if (path.indexOf('list.html') > 0) {
                    $.getJSON('./data/data.json').done(function (resp) {
                        debugger
                        resp.books.forEach(element => {
                            debugger
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
                    })
                }
            }
        })
    }
})