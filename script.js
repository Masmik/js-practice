'use strict';
// var validate = function () {
// debugger;
var forms = document.getElementsByTagName('form');


for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', validation);
}

var rules = {
    required: function (el) {
        if (el.value != '') {
            return true;
        }
        return false;
    },
    needName: function (el) {
        var regLetters = /^[a-zA-Z]{1,20}$/;
        return regLetters.test(el.value);
    },
    phone: function (el) {
        var regPhoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return (regPhoneNumber.test(el.value));
    },
    email: function (el) {
        var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return reg.test(el.value);
    },
        equalWith: function (el) {
            var dataPassword = el.getAttribute("data-equalId");
            var pass = document.getElementById(dataPassword).value;
            if(el.value === pass){
                return true;
            }
            return false;
            // console.log(pass);
    },
    password: function (el) {
        var regNumber = /(?=^.{4,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        return (regNumber.test(el.value));
    },
    city: function (el) {
        if (el.value === 'value0') {
            return false;
        }
        return true;
    },
    house: function (el) {
        var regHouse = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
        return regHouse.test(el.value);
    },
    appartment: function (el) {
        var regAppartment = /^\d+$/;
        return regAppartment.test(el.value);
    },
    ccName: function (el) {
        var regCcName = /^[a-zA-Z_ ]*$/;
        return regCcName.test(el.value);
    },
    ccNumber: function (el) {
        var regCcNumber = /[0-9_ ]{13,16}/;
        return regCcNumber.test(el.value);
    },
    ccExp: function (el) {
        if(!el.value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)){
            return false;
        } else {
            var d = new Date();
            var currentYear = d.getFullYear();
            var currentMonth = d.getMonth() + 1;
            // get parts of the expiration date
            var parts = el.value.split('/');
            var year = parseInt(parts[1], 10) + 2000;
            var month = parseInt(parts[0], 10);
            // compare the dates
            if (year < currentYear || (year == currentYear && month < currentMonth)) {
                return false;
            }
        }
        return true;
    },
    ccCvc: function (el) {
        var regCvc = /^[0-9]{3}$/;
        return regCvc.test(el.value);
    },
    checked: function (el) {
        if(!el.checked) {
            return false;
        }
        return true;
    }

};

function needValidate(el) {
    if (el.getAttribute("data-rule")) {
        return true;
    }
    return false;
}

// function inputValidate(el) {
//     // debugger;
//     var rulesList = el.dataset.rule;
//     rulesList = rulesList.split(' ');
//
//     for (var j = 0; j < rulesList.length; j++) {
//         if (rulesList[j] in rules) {
//             if (!rules[rulesList[j]](el)) {
//                 errors.push({
//                     name: el.name,
//                     error: rulesList[j]
//                 })
//             }
//         }
//     }
// }

function showErrors(arr) {
    console.log(arr);

}

function validation(e) {
    e.preventDefault();
    var errors = [];

    var inputs = this.elements;
    for (var i = 0; i < inputs.length; i++) {

        if (!needValidate(inputs[i])) {
            continue;
        }

        var rulesList = inputs[i].dataset.rule;
        rulesList = rulesList.split(' ');

        for (var j = 0; j < rulesList.length; j++) {
            if (rulesList[j] in rules) {
                if (!rules[rulesList[j]](inputs[i])) {
                    errors.push({
                        name: inputs[i].name,
                        error: rulesList[j]
                    })
                }
            }
        }
    }
    if (errors.length > 0) {
        e.preventDefault();
        showErrors(errors);
    }
}

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

jQuery(function ($) {
    $("#tel").mask("(999) 999-9999");
});

// $("#myform :input").tooltip({
//
//     // place tooltip on the right edge
//     position: "center right",
//
//     // a little tweaking of the position
//     offset: [-2, 10],
//
//     // use the built-in fadeIn/fadeOut effect
//     effect: "fade",
//
//     // custom opacity setting
//     opacity: 0.7
//
// });

// }();

