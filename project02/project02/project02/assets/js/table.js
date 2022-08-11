var index = 0;
var isScrollable = true;
window.time = 0;

function setTableScroll() {
    var resultFromURL = getNumberOfDoctorToShowInTable();
    var rowNumbers = $("#doctor-list-table > tbody > tr").length;
    var rowsPerDisplay = resultFromURL['numberOfDoctor'];
    var isValid = resultFromURL['isValid'];
    if (!isValid) {
        alertAfterPageReady('Số lượng bác sĩ phải là một số nguyên lớn hơn hoặc bằng 5');
    }
    if (rowNumbers < rowsPerDisplay) {
        rowsPerDisplay = rowNumbers;
        alertAfterPageReady('Vượt quá số lượng bác sĩ');
    }
    setHeightForTable(rowsPerDisplay);
    if ($('#isscroll-checkbox').is(':checked')) {
        $('.table-container').css('overflow-y', 'auto');
        isScrollable = true;
    }
    else {
        $('.table-container').css('overflow-y', 'hidden');
        isScrollable = false;
    }
    if (isScrollable === false) {
        time = setInterval(function() {
            var step = rowsPerDisplay-1;
            ++index;
            if (index > rowNumbers) {
                index = 0;
                return;
            }
            var indexAfterAdd = index + rowsPerDisplay - 1;
            if (indexAfterAdd > rowNumbers) {
                step = rowsPerDisplay - (indexAfterAdd-rowNumbers);
            }
            var beginIndex = index;
            index += step;
            for (var i = 1; i <= rowNumbers; ++i) {
                if (beginIndex <= i && i <= index) {
                    $('#doctor-list-table > tbody > tr:nth-child(' + i + ')').show();
                }
                else {
                    $('#doctor-list-table > tbody > tr:nth-child(' + i + ')').hide();
                }
            }
        }, 2000);
    }
    else {
        clearInterval(time);
        for (var i = 1; i <= rowNumbers; ++i) {
            $('#doctor-list-table > tbody > tr:nth-child(' + i + ')').show();
        }
    }
}

function getURLParam(paramName) {
    var searchParams = new window.URLSearchParams(window.location.search);
    return searchParams.get(paramName);
}

function getNumberOfDoctorToShowInTable() {
    var defaultNumberOfDoctor = 5;
    var numberOfDoctor = getURLParam('doctors');
    var isValid = true;
    if (numberOfDoctor == null) {
        numberOfDoctor = defaultNumberOfDoctor;
    }
    else {
        numberOfDoctor = parseInt(numberOfDoctor);
        if (isNaN(numberOfDoctor)) {
            numberOfDoctor = defaultNumberOfDoctor;
            isValid = false;
        }
        else {
            if (numberOfDoctor < 5) {
                numberOfDoctor = defaultNumberOfDoctor;
                isValid = false;
            }
        }
    }
    return { numberOfDoctor: numberOfDoctor, isValid: isValid };
}

function setHeightForTable(rowNumbers) {
    var height = rowNumbers*2 + 4;
    height += 'rem';
    $('#doctor-table-container').css('height', height);
}