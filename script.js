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
        var reg = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
        return reg.test(el.value);
    },
    equalWith: function (el) {
        var passwordRepeat = el.value;
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
    var regCcName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    return regCcName.test(el.value);
}


}
;

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
jQuery(function ($) {
    $("#tel").mask("(999) 999-9999");
});

// }();

