
window.onbeforeunload = function () {
    sessionStorage.clear();

    // Get all cookies
    var cookies = document.cookie.split(";");

    // Loop through the cookies and delete each one
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Strict;";
    }
};
window.addEventListener('unload', function () {
    window.location.href = '/Account/Login';
});
function switchCommonFormatter(cell, table, formatterParams) {
    var value = cell.getValue();
    var checked = value ? "checked" : "";
    return `
                <label class="switch">
                    <input type="checkbox" ${checked} onclick="toggleActive(${cell.getRow().getIndex(), table})">
                    <span class="slider"></span>
                </label>`;
}

function toggleActive(rowIndex, table) {
    var row = table.getRow(rowIndex);
    var data = row.getData();
    data.IsActive = !data.IsActive;
    row.update(data);
}

function makeFormGeneric(formSelector, submitButtonSelector) {
    var form = $(formSelector);
    var submitButton = $(submitButtonSelector);

    form.on('input change', 'input, select, textarea', checkFormValidity);
    checkFormValidity();

    function checkFormValidity() {
        if (form[0].checkValidity()) {
            submitButton.prop('disabled', false);
        } else {
            submitButton.prop('disabled', true);
        }
    }
}
function getFormData(formSelector) {
    var formData = {};
    $(formSelector).find('input, select, textarea').each(function () {
        var id = $(this).attr('id');
        if (id) {
            formData[id] = $(this).val();
        }
    });
    return formData;
}
// ajaxHelper.js
function makeAjaxRequest({
    url,
    data = {},
    type = 'GET',
    contentType = 'application/json; charset=utf-8',
    dataType = 'json',
    processData = true,
    cache = false,
    headers = {},
    successCallback = function (response) { console.log(response); },
    errorCallback = function (xhr, status, error) { console.error(`Error: ${error}`); }
}) {
    const BASE_API_URL = 'http://localhost:5298/api';
    const baseUrl = `${BASE_API_URL}${url}`;
    $.ajax({
        url: baseUrl,
        data: type === 'GET' ? data : JSON.stringify(data),
        type: type,
        contentType: contentType,
        dataType: dataType,
        processData: processData,
        cache: cache,
        headers: headers,
        success: successCallback,
        error: errorCallback
    });
}
const Id = "00000000-0000-0000-0000-000000000000";

const API_URLS = {
    GetVehicleSalesAsync: "/VehicleSales/GetVehicleSalesAsync",
};
function addCommonProperties(data) {
    var appuser = storageService.get("ApplicationUser");
    var userId = appuser ? appuser.Id : null;
    data.CreatedOn = new Date();
    data.CreatedBy = userId;
    data.ModifiedOn = new Date();
    data.ModifiedBy = userId;
    data.IsActive = true;
    return data;
}
function getQueryStringParameter(name) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
$(document).on("click", ".toggle-password", function () {
    var inputField = $(this).closest('.input-group').find('.form-control');
    var icon = $(this).find('i');

    if (inputField.attr('type') === 'password') {
        inputField.attr('type', 'text');
        icon.removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
        inputField.attr('type', 'password');
        icon.removeClass('fa-eye').addClass('fa-eye-slash');
    }
});


function genarateDropdown(dropdownId, data, valueField, textField) {
    var $dropdown = $('#' + dropdownId);
    $dropdown.empty();

    var $defaultOption = $('<option>', {
        value: '',
        text: 'Select an option'
    });
    $dropdown.append($defaultOption);

    $.each(data, function (index, item) {
        var $option = $('<option>', {
            value: item[valueField],
            text: item[textField]
        });
        $dropdown.append($option);
    });

    $dropdown.trigger('change');

    /*$dropdown.dropdown();*/
};

function formatDate(date) {
    const dateParts = date.split('-');
    return `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
}

function showLoader() {
    $('#overlay').attr('style', 'display:grid');
    $('#overlay').show();
}

function hideLoader() {
    $('#overlay').attr('style', 'display:none');
    $('#overlay').hide();
}