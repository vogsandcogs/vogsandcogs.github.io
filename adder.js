
function increment(target, amount, fieldName) {
    if (!target) {
        throw 'you found a bug';
    }
    var val = parseFloat(target.value || 0, 10);
    val += amount;
    target.value = val;

    removeError(fieldName);
}

function getFieldValue(fieldName) {
    return parseFloat(document.querySelector('input[name="' + fieldName + '"]').value || 0, 10);
}

function validateInput(target) {
    if (!target) {
        return;
    }

    var val = parseFloat(target.value || 0, 10);

    if (isNaN(val)) {
        return;
    }

    var fieldNum = $(target).data(name);

    if (val < 0) {
        $(target).addClass('error');
        target.value = '';
        showError('Value can not be less than 0', fieldNum);
    } else if (val > 10) {
        $(target).addClass('error');
        target.value = '';
        showError('Value can not be greater than 10', fieldNum);
    } else {
        removeError(fieldNum);
    }
}

function showError(msg, fieldNum) {
    removeError(fieldNum);
    $('.error').append('<span class="fieldError' + fieldNum + '">' + msg + '</span>');
}

function removeError(msg, fieldNum) {
    $('.fieldError' + fieldNum).remove();
}


function init() {
    $('.incrementer').on('click', function (e) {
        var fieldName = $(e.target).data('field');
        var field = document.querySelector('input[name="' + fieldName + '"]');

        $(field).removeClass('error');

        increment(field, 1, fieldName);
    });

    $('.decrementer').on('click', function (e) {
        var fieldName = $(e.target).data('field');
        var field = document.querySelector('input[name="' + fieldName + '"]');

        $(field).removeClass('error');
        increment(field, -1, fieldName);
    });


    $('input').on('change', function (e) {
        $(e.target).removeClass('error');
        validateInput(e.target);
    });

    $('.calculate').on('click', function () {
        var a = getFieldValue('field1');
        var b = getFieldValue('field2');

        if (a === 10) {
            a = 100;
        }
        if (b === 10) {
            b = 100;
        }

        document.querySelector('input[name="sum"]').value = a + b;
    });
}

init();