var modulValidation = (function (form) {

    var rule_errors = {
        required: 'Поле не может быть пустым',
        needName: 'Введите имя',
        phone: 'Не верный номер телефона',
        email: 'Странный имейл',
        equalWith: 'Пароль не совпадает',
        password: 'Пароль слижком легкий',
        city: 'Укажите город',
        house: 'Укажите дом',
        appartment: 'Квартира ?',
        ccName: 'Имя на краточке должно совподать с именем введенное вверху',
        ccNumber: 'Укажите номер карты',
        ccExp: 'Дата истичения срока действия',
        ccCvc: 'Этот код никому нельзя давать, но нам можно!',
        checked: 'Чекните это поле ))'
    };
    var rules = {
        required: function (el) {
            if (el.value !== '') {
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
            return regPhoneNumber.test(el.value);
        },
        email: function (el) {
            var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return reg.test(el.value);
        },
        equalWith: function (el) {
            var dataPassword = el.getAttribute('data-equalId'),
                pass = document.getElementById(dataPassword).value;
            if (el.value === pass) {
                return true;
            }
            return false;
        },
        password: function (el) {
            var regNumber = (/^(?=.*\d)[0-9a-zA-Z]{3,}$/);
            return regNumber.test(el.value);
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
            if (!el.value.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)) {
                return false;
            } else {
                var d = new Date(),
                    currentYear = d.getFullYear(),
                    currentMonth = d.getMonth() + 1,
                    parts = el.value.split('/'),
                    year = parseInt(parts[1], 10) + 2000,
                    month = parseInt(parts[0], 10);
                if (year < currentYear || (year === currentYear && month < currentMonth)) {
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
            if (!el.checked) {
                return false;
            }
            return true;
        }

    };

    function needValidate(el) {
        if (el.getAttribute('data-rule')) {
            return true;
        }
        return false;
    }

    function showErrors(arr) {
        console.log(arr);

        for (var i = 0, arrLength = arr.length; i < arrLength; i++) {

            arr[i].el.setAttribute('title', rule_errors[arr[i].error_idx]);

        }

        $('[title]').tooltip({
            position: {
                my: 'left top',
                at: 'right+5 top-5',
                collision: 'none'
            }
        });

        $('[title]').tooltip('open');
    }

    function validation(inputs) {
        var errors = [];
        for (var i = 0, inputLength = inputs.length; i < inputLength; i++) {

            if (!needValidate(inputs[i])) {
                continue;
            }

            var rulesList = inputs[i].dataset.rule;
            rulesList = rulesList.split(' ');

            for (var j = 0, ruleListLength = rulesList.length; j < ruleListLength; j++) {
                if (rulesList[j] in rules) {
                    if (!rules[rulesList[j]](inputs[i])) {
                        errors.push({
                            el: inputs[i],
                            name: inputs[i].name,
                            error_idx: rulesList[j],
                            error: rulesList[j]
                        })
                    }
                }
            }
        }
        if (errors.length > 0) {
            showErrors(errors);
        }
    }

    return {
        needValidate: needValidate,
        showErrors: showErrors,
        validation: validation
    }
}());


document.addEventListener('DOMContentLoaded', function () {
    var forms = document.getElementsByTagName('form');
    var requireForm = forms[0];

    requireForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var inputs = this.elements;
        modulValidation.validation(inputs);
    });

});
