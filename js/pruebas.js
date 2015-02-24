  var elems = document.getElementsByTagName( 'a' );

  for ( var i = 0; i < elems.length; i++ ) {

    (function( lockedInIndex ){

      elems[ i ].addEventListener( 'click', function(e){
        e.preventDefault();
        alert( 'I am link #' + lockedInIndex );
      }, 'false' );

    })( i );

  }