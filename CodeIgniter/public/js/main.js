// Lấy api>đổ vào object mới> lấy object cho vào thư viện> cấu hình thư viện (màu sắc, icon này nọ)
function ABC(input) {
    if (input == 1) {
        return String('Yếu');
    }
    if (input == 2) {
        return String('2G');
    }
    if (input == 3) {
        return String('3G');
    }
    if (input == 4) {
        return String('4G');
    }
    if (input == null) {
        return String('Offline');
    }
    return input;
}
const APIDATA = [];
const LOCATIONS = [];
const listmang = [];
var hienthi = null;
const ggf = document.querySelector('.danhsach');
const ggf1 = document.querySelector('.danhsach span');
//Call API trong promise => return data
getData('https://api.midvietnam.com/studyapi/getdatagps').then((data3) => {
    data3.tracks.forEach((data) => {
        const location = data.location.split(/[\s,]+/);
        const lng = Number(location[1]);
        const lat = Number(location[0]);
        const time = getTimeStamp(data.time);
        const dir = Number(data.direction);
        // const bienso = String(data.licence_plate);
        const speed = Number(data.speed);
        const s1 = Number(data.s1);
        const binary_ = s1.toString(2).slice(-13, -10);
        const Tinhiu = parseInt(binary_, 2);
        const obj = { lng, lat, time, dir };
        APIDATA.push(obj);
        LOCATIONS.push([lat, lng]);
        const color = speed ? 'green' : 'red';
        const lgr = document.querySelector('.thitbo');
        const list1 = document.createElement('div');
        list1.className = 'aoeui';
        list1.id = obj.time;
        var d = new Date(data.time.slice(0, 10).split('/').reverse().join('-'));
        var dd = d.getDate();
        var mm = d.getMonth() + 1;
        var yy = d.getFullYear();
        ngaykh = dd + '/' + mm + '/' + yy;
        list1.innerHTML = `
        <div class="bakugan"  style="color: ${color};cursor: pointer; font-size:0.79em;display: flex;width: 100% ;padding: 1em 1em 0em 0em;font-weight: 650;">
            <span style="width: 30%;">${data.time.slice(-8)}</span>
            <div style="width:1.35px;background-color: gray;height: 1.3em;"></div>
            <span style="width: 81%;"> ${Number(location[1])} - ${Number(location[0])}</span>
        </div>`;
        list1.onclick = (e) => {
            lgr.style.display = 'block';
            // list1.classList.add('hiddend');
            const detailsElement = document.createElement('div');
            detailsElement.classList.add('list-details');

            detailsElement.innerHTML = `
            <button class="TapDong"><i class="bi bi-x Clotask"></i></button>
            <p>Biển số : ${data.licence_plate}</p>
            <p>Trạng Thái :  ${speed ? 'Đang chạy' : 'Đang dừng'} </p>
            <p>Tính hiệu mạng : ${ABC(Tinhiu)}  </p>
            <p>Ngày khởi hành : ${ngaykh}</p>
            <p>Giờ khởi hành : ${data.time.slice(-8)}</p>
            <p>Vận tốc : ${data.speed} km/h</p>
            <p>Vị trí :  ${Number(location[0])} -  ${Number(location[1])} </p>
            <p>Quãng đường: </p>
            <p>Số bằng lái :  ${data.s1} </p>
           `;

            //    <p>Tên tài xế : </p>
            //    <p>Số điện thoại tài xế : </p>
            if (document.querySelector('.list-details')) {
                document.querySelector('.list-details').remove();
            }
            lgr.appendChild(detailsElement);
            document.querySelector('.TapDong').onclick = (e) => {
                lgr.style.display = 'none';
            };
        };

        ggf.append(list1);

        const timeString = data.time.slice(-8);
        const timeRange = timeString.split(':');
        let seconds = 0;
        timeRange.forEach((value, weight) => (seconds += parseInt(value) * Math.pow(60, 2 - weight)));
        listmang.push({ lat, lng, status: Tinhiu, time: seconds });
    });
    //create map
    const map = L.map('map').setView([APIDATA[1500].lat, APIDATA[1500].lng], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //create Maker:
    var marker = L.marker([APIDATA[0].lat, APIDATA[0].lng]).addTo(map);

    //set trackplayback
    const trackplayback = L.trackplayback(APIDATA, map, {
        targetOptions: {
            useImg: true,
            imgUrl: '/public/images/aww.png',
            height: 50,
            width: 50,
        },
        // trackLineOptions: {
        //     isDraw: true,
        //     stroke: true,
        //     color: '#1C54E2',
        //     weight: 2,
        //     fill: false,
        //     fillColor: '#000',
        //     opacity: 0.9,
        // },
    });
    const trackplaybackControl = L.trackplaybackcontrol(trackplayback);
    trackplaybackControl.addTo(map);

    //////////////////////////////////////++++++++++++++++++++++++++++++++++++
    const dataLength = listmang.length;
    let st = listmang[0].status;
    var khoangthoigian = 0;
    var colo = null;
    var mot = [];

    for (let i = 0; i < dataLength; i++) {
        if (st != listmang[i].status) {
            switch (st) {
                case 1: {
                    colo = 'yellow';
                    break;
                }
                case 2: {
                    colo = 'yellow';
                    break;
                }
                case 3: {
                    colo = 'red';
                    break;
                }
                case 4: {
                    colo = 'blue';
                    break;
                }
            }
            st = listmang[i].status;
            L.polyline(mot, { color: colo }).addTo(map);
            mot = [];
        }
        if (i > 0) {
            khoangthoigian = listmang[i].time - listmang[i - 1].time;
        }
        if (khoangthoigian > 300) {
            colo = 'black';
            // hienthi = 'Offline';
            L.polyline(
                [
                    [listmang[i].lat, listmang[i].lng],
                    [listmang[i - 1].lat, listmang[i - 1].lng],
                ],
                { color: colo },
            ).addTo(map);
        } else {
            mot.push([listmang[i].lat, listmang[i].lng]);
            if (i == dataLength - 1) {
                switch (st) {
                    case 1: {
                        colo = 'yellow';

                        break;
                    }
                    case 2: {
                        colo = 'yellow';

                        break;
                    }
                    case 3: {
                        colo = 'red';

                        break;
                    }
                    case 4: {
                        colo = 'blue';
                        break;
                    }
                }
                L.polyline(mot, { color: colo }).addTo(map);
            }
        }
    }
    ///////////////////////////////////////////////
    // draw direct line
    // polyline = L.polyline(LOCATIONS, { color: 'red' }).addTo(map);

    const InforSpeedRatio = document.querySelector('.infoContainer div:nth-child(4)');
    const qq = document.createElement('div');
    qq.classList.add('speed-option');
    qq.classList.add('chinhsua');
    qq.innerHTML = `<span value="5">X5</span>
          <span value="10">X10</span>
          <span value="15">X15</span>
          <span value="20">X20</span>`;
    InforSpeedRatio.append(qq);

    const ui = document.querySelector('.infoContainer div:nth-child(4) .info-speed-ratio');
    const ui1 = document.querySelector('.chinhsua');

    ui.addEventListener('click', function () {
        if (ui1.style.display == 'none') {
            ui1.style.display = 'block';
        } else {
            ui1.style.display = 'none';
        }
    });
    ui1.addEventListener('click', function (e) {
        if (e.target.closest('span')) {
            const value = e.target.closest('span').getAttribute('value');
            trackplayback.setSpeed(Number(value));
            ui.innerHTML = `X${value}`;
            e.target.closest('span').addEventListener('click', function () {
                ui1.style.display = 'none';
            });
        }
    });

const cotphatsong = document.querySelector('.leaflet-bottom.leaflet-left');
const tinhhieumang = document.createElement('div');
tinhhieumang.classList.add('tinhhieumang');
tinhhieumang.innerHTML = `
    <div class="tenmang">
            <span>4G</span>
            <div style="background-color: blue;"> </div>
        </div>
        <div class="tenmang">
            <span>3G</span>
            <div style="background-color: red;"> </div>
        </div>
        <div class="tenmang">
            <span>2G/Yếu</span>
            <div style="background-color: yellow;"> </div>
        </div>
        <div class="tenmang">
            <span>Offline</span>
            <div style="background-color: black;"> </div>
        </div>
    `;
    cotphatsong.append(tinhhieumang);
});
