$(document).ready(function () {
    $('#loader').fadeOut(1500, function () {
        $(this).hide(0, function () {
            $('#all-content').show()      
        })
    })

    $('#activator-menu').click(function () {
        $('#container-nav-header').animate({width: 'toggle'});
    })
})