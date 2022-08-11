const dateData = [];
const doctorData = [];
var todayStats = {};

const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
const months = [];
for (var i = 1; i < 13; ++i) {
    months.push('Tháng ' + i);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function formatDateString(date) {
    const yyyy = date.getFullYear();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    if (dd < 10) { dd = '0' + dd; }
    if (mm < 10) { mm = '0' + mm; }
    const formattedString = dd + '/' + mm + '/' + yyyy;
    return formattedString;
}

function pushDateInfoIntoDateData(d, numberOfCase) {
    dateData.push(
        {
            fullDate: new Date(d),
            dateString: formatDateString(d),
            date: d.getDate(),
            month: months[d.getMonth()],
            year: d.getFullYear(),
            day: days[d.getDay()],
            numberOfCase: numberOfCase,
        }
    );
}

function fakeDateData(startDate = new Date(2019, 4, 5), endDate = new Date()) {
    endDate.setDate(endDate.getDate()-1);
    for (var d = startDate; d <= endDate; d.setDate(d.getDate()+1)) {
        var numberOfCase = getRandomInt(5, 120);
        pushDateInfoIntoDateData(d, numberOfCase);
    }
}

function fakeTodayData() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var totalCaseToday = 0;
    var done = 0;
    var fakeUnread = getRandomInt(0, 20);
    var fakeReading = getRandomInt(0, 10);
    for (var i = 0; i < doctorData.length; ++i) {
        done += doctorData[i]['total'];
        totalCaseToday += doctorData[i]['total'];
    }
    totalCaseToday += fakeReading + fakeUnread;
    pushDateInfoIntoDateData(today, totalCaseToday);
    todayStats = {
        total: totalCaseToday,
        done: done,
        unread: fakeUnread,
        reading: fakeReading
    };
}

function fakeDoctorData() {
    var randomDoctorStats = function(min=0, max=10) {
        return getRandomInt(min, max);
    }
    doctorData.push({
        fullName: 'Nguyễn Việt Anh',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(),
    });
    doctorData.push({
        fullName: 'Lương Xuân Anh',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Nguyễn Tuấn Anh',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Nguyễn Anh Tuấn',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Phạm Vũ Anh Quân',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Bùi Tiến Dũng',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Đặng Thanh Mai',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Nguyễn Đức Trung',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Võ Mai Khánh',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Trình Thị Xoan',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Hoàng Đức Hải',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    doctorData.push({
        fullName: 'Bùi Tiến Minh',
        CT: randomDoctorStats(),
        DX: randomDoctorStats(), 
    });
    for (var i = 0; i < doctorData.length; ++i) {
        doctorData[i]['total'] = doctorData[i]['CT'] + doctorData[i]['DX'];
    }
}

fakeDateData();
fakeDoctorData();
fakeTodayData();