$(document).ready(function () {
    $('#loader').fadeOut(1500, function () {
        $(this).hide(0, function () {
            $('#all-content').show()      
        })
    })

    $('#activator-menu').click(function () {
        $('#container-nav-header').animate({width: 'toggle'});
    })

    //
    var books = [
          {
              "name": "Book 1",
              "image": "https://images-na.ssl-images-amazon.com/images/I/51HSkTKlauL._SX346_BO1,204,203,200_.jpg",
              "description" :"Harry Potter es una serie de novelas fantásticas escrita por la autora británica J. K. Rowling, considerada una de las sagas más importantes de la historia. Realmente la más leída según el Libro de los récords Guiness."
  
          },
          {
              "name": "Book 2",
              "image": "https://hpmedia.bloomsbury.com/rep/s/9781408855669_309028.jpeg",
              "description" :"Harry Potter es una serie de novelas fantásticas escrita por la autora británica J. K. Rowling, considerada una de las sagas más importantes de la historia. Realmente la más leída según el Libro de los récords Guiness."
  
          },
          {
              "name": "Book 3",
              "image": "https://hpmedia.bloomsbury.com/rep/s/9781408855683_309032.jpeg",
              "description" :"Harry Potter es una serie de novelas fantásticas escrita por la autora británica J. K. Rowling, considerada una de las sagas más importantes de la historia. Realmente la más leída según el Libro de los récords Guiness."
  
          }
  
        ];

  books.forEach(element => {
    let item = $( '#books-content' ).clone().appendTo( '.page-content' );
    let currentHtml = item.html();
    let newHtml = "";
    Object.keys(element).forEach(k => {
        newHtml = currentHtml.replace("{{"+k+"}}", element[k]);
        currentHtml = newHtml;
    });    
    item.html(newHtml)
  });
  $( '#books-content' ).remove();
})