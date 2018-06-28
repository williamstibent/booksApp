$(document).ready(function () {
    $('#loader').fadeOut(1500, function () {
        $(this).hide(0, function () {
            $('#all-content').show().css( "display", "contents" );
        })
    })

    router($(window)[0].location)

    $(window).on('hashchange', function (e) {
        let event = e.originalEvent
        let hash = event.newURL.split('#')[1];
        preProcessContent(hash, location)
    })

    function router(location) {
        let hash = location.hash.split('#')[1]
        preProcessContent(hash, location)
    }

    function preProcessContent(currentHash, currentLocation) {
        $.getJSON('./js/routes.json').done(function (response) {
            response.map(function (data) {
                debugger
                if (currentLocation.hash == '' && data.path == '/')
                    getContent('./components/' + data.component)
                else if (currentHash && currentHash.indexOf(data.path) > -1 && data.path != '/')
                    getContent('./components/' + data.component)
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
                if (path.indexOf('list.html') > 0)
                    loadBooks()
                else
                    loadBook()
            }
        })
    }

    function loadBook() {
        let bookId = location.hash.split('/')[2]
        let currentHtml = $('#detail-book').html()
        
        $.getJSON('./data/data.json').done(function (resp) {
            resp.books.forEach(element => {
                if(element.id == bookId){
                    Object.keys(element).forEach(k => {
                        currentHtml = currentHtml.replace('{{'+k+'}}', element[k])
                    })
                    $('#detail-book').html(currentHtml)
                }
            })
        })
    }

    function loadBooks() {
        $.getJSON('./data/data.json').done(function (resp) {
            resp.books.forEach(element => {
                let item = $('#book').clone().appendTo('.books-content')
                let currentHtml = item.html()
                let newHtml = ''
                Object.keys(element).forEach(k => {
                    newHtml = currentHtml.replace("{{" + k + "}}", element[k])
                    currentHtml = newHtml
                })
                item.html(newHtml)
            });
            $('#book').remove()
        })
    }

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