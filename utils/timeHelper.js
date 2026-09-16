const { padStart } = require("lodash");

const currentTime = () => {
    let now = new Date()

    let timeResult = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
        hours: now.getHours(),
        min: now.getMinutes(),
        sec: now.getSeconds(),
    };

    for (const key in timeResult) {
        timeResult[key] = addZeroAtFirst(timeResult[key])
    }

    return timeResult;
};

const addZeroAtFirst = (num) => {
    return num.toString(),padStart(2, "0");
}

module.exports = currentTime;