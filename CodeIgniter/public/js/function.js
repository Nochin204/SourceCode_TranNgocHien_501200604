//create promise to get data
const getData = (api) => {
    return new Promise((resolve, reject) => {
        fetch(api)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                if (data.feedback == 0) {
                    resolve();
                }
                resolve(data);
            });
    });
};

//get TimeStamp

const getTimeStamp = (input) => {
    var parts = input.trim().split(' ');
    var date = parts[0].split('-');
    var time = (parts[1] ? parts[1] : '00:00:00').split(':');
    var d = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
    return d.getTime() / 1000;
};
