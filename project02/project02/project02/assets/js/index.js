const pointColor = "#155ed1";
const lineColor = "#155ed1";
const barColor = "#155ed1";
const chartColor = "#eeeef0";

setDataForTodayStatistics();

$(function() {
    $('#min-date-picker, #max-date-picker').datepicker({
        format: 'dd/mm/yyyy',
    });
    $('#min-date-picker, #max-date-picker').datepicker('update', new Date());
    const elements = document.getElementsByClassName('today-header');
    for (var i = 0; i < elements.length; ++i) {
        elements[i].innerHTML = 'Ngày ' + dateData[dateData.length-1]['dateString'];
    }
    $(document).ready(showLineChart());
    $(document).ready(showBarChart());
    $(document).ready(setDataForDoctorTable());
    $(document).ready(setTableScroll());
    $('#show-by').change(showLineChart);
    $('#min-date-picker, #max-date-picker').on('input propertychange paste changeDate', showLineChart);
    $('#isscroll-checkbox').change(setTableScroll);
});

function alertAfterPageReady(message) {
    $(document).ready(function() {
        alert(message);
    })
}

function validateDate(dateString) {
    const pattern = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if (dateString.match(pattern)) {
        return true;
    }
    return false;
}

function parseDate(dateString) {
    var splitted = dateString.split('/');
    var mapped =  splitted.map(function(n) {
        return parseInt(n, 10);
    });
    return new Date(mapped[2], mapped[1]-1, mapped[0]);
}

function setDataForTodayStatistics() {
    $('.amount > h1').text(todayStats['total']);
    $('.done > h1').text(todayStats['done']);
    $('.unread > h1').text(todayStats['unread']);
    $('.reading > h1').text(todayStats['reading']);
}

function setDataForDoctorTable() {
    var tableRef = document.getElementById('doctor-list-table').getElementsByTagName('tbody')[0];
    for (var i = 0; i < doctorData.length; ++i) {
        var numberOfAttribute = Object.keys(doctorData[i]).length;
        var newRow = tableRef.insertRow(tableRef.rows.length);
        for (var j = 0; j < numberOfAttribute; ++j) {
            var newCell = newRow.insertCell(j);
            if (j === 0) {
                var newText = document.createTextNode('Bs ' + Object.values(doctorData[i])[j]);
            }
            else {
                var newText = document.createTextNode(Object.values(doctorData[i])[j]);
            }
            newCell.appendChild(newText);
        }
    }
}

function setDataForLineChart(showType, startDate, endDate, labels) {
    const map1 = new Map();
    const data = [];
    for (var i = 0; i < labels.length; ++i) {
        map1.set(labels[i], 0);
    }
    for (var i = 0; i < dateData.length; ++i) {
        var d = dateData[i]['fullDate'];
        if (d < startDate || d > endDate) {
            continue;
        }
        var key = dateData[i][showType];
        var valueToAdd = dateData[i]['numberOfCase'];
        map1.set(key, map1.get(key)+valueToAdd);
    }
    map1.forEach(function(value, key) {
        data.push(value);
    })
    return data;
}

function showLineChart() {
    var showType = $('#show-by').find(':selected').val();
    var startDateString = $('#min-date-picker input[type="text"]').val();
    var endDateString = $('#max-date-picker input[type="text"]').val();
    if (!validateDate(startDateString) || !validateDate(endDateString)) {
        return;
    }
    var startDate = parseDate(startDateString);
    var endDate = parseDate(endDateString);
    if (endDate < startDate) {
        return;
    }
    // let chartStatus = Chart.getChart("myChart1");
    // if (chartStatus != undefined) {
    //     chartStatus.destroy();
    // }
    var labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    if (showType === 'month') {
        labels = [];
        for (var i = 1; i < 13; ++i) {
            labels.push('Tháng ' + i);
        }
    }
    var data = setDataForLineChart(showType, startDate, endDate, labels);

}

function setDataForBarChart() {
    var totalCT = 0;
    var totalDX = 0;
    for (var i = 0; i < doctorData.length; ++i) {
        totalCT += doctorData[i]['CT'];
        totalDX += doctorData[i]['DX'];
    }
    return [totalCT, totalDX];
}

function showBarChart() {
    const labels = ['CT', 'DX'];
    const data = setDataForBarChart();

    new Chart("myChart2", {
        type: 'bar', 
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [barColor, barColor],
                borderColor: [barColor, barColor],
                barThickness: 60,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: {
                        color: chartColor,
                    },
                    grid: {
                        color: chartColor,
                        display: false,
                    },
                },
                y: {
                    suggestedMin: 0,
                    ticks: {
                        color: chartColor,
                        maxTicksLimit: 4,
                    },
                    grid: {
                        borderColor: chartColor,
                        color: chartColor,
                    }
                }
            }
        }
    });    
}