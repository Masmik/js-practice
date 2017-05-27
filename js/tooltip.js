"use strict";

$( function() {
    var tooltips = $( "[title]" ).tooltip({
        position: {
            my: "left top",
            at: "right+5 top-5",
            collision: "none"
        }
    });
    //$( 'input[type="submit"]' )
    //    .text( "Show help" )
    //    .button()
    //    .on( "click", function() {
    //        tooltips.tooltip( "open" );
    //    })
    //    .insertAfter( "form" );
} );
