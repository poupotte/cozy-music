// convert a duration in second to a readable string
export function timeToString(time) {
    var totalSec = Math.floor(time);
    var hours = Math.floor(totalSec / 3600) % 24;
    var minutes = Math.floor(totalSec / 60) % 60;
    var seconds = totalSec % 60;

    hours = (hours < 10 ? '0' + hours : hours);
    minutes = (minutes < 10 ? '0' + minutes : minutes);
    seconds = (seconds < 10 ? '0' + seconds : seconds);

    var r = (hours == '00' ? '' : hours + ':')
            + (minutes == '00' ? '0:' : minutes + ':')
            + seconds;
    return r;
};
