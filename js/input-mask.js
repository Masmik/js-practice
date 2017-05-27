"use strict";


jQuery(function ($) {
    $("#tel").mask("(999) 999-9999");
});

for (var i in ['input', 'change', 'blur', 'keyup']) {
    cardNumber.addEventListener('input', formatCardCode, false);
}
//
// for (var i in ['input', 'change', 'blur', 'keyup']) {
//     cardExpiry.addEventListener('input', formatCardExpiry, false);
// }
function formatCardCode() {
    var cardNumber = this.value.replace(/[^\d]/g, '').substring(0, 16);
    cardNumber = cardNumber != '' ? cardNumber.match(/.{1,4}/g).join(' ') : '';
    this.value = cardNumber;
}

// function formatCardExpiry() {
//     // var cardCode = this.value.replace(/^\d{1,2}\-\d{1,2}$/).substring(0, 4);
//     var cardCode = this.value != '' ? this.value.match(/.{1,2}/g).join('/') : '';
//     this.value = cardCode;
// }



