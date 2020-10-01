function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getEnding(value, opt1, opt2, opt3) {
    return (value == 1 || (value > 19 && value % 10 == 1)) ? opt1 :
        ((value > 1 && value < 5) || (value > 19 && value % 10 > 1 && value % 10 < 5)) ? opt2 : opt3;
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');


    var daysSpanText = clock.querySelector('.countdown-text__days');
    var hoursSpanText = clock.querySelector('.countdown-text__hours');
    var minutesSpanText = clock.querySelector('.countdown-text__mins');
    var secondsSpanText = clock.querySelector('.countdown-text__secs');


    function updateClock() {
        var t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        daysSpanText.innerHTML = getEnding(t.days, 'день', 'дня', 'дней');
        hoursSpanText.innerHTML = getEnding(t.hours, 'час', 'часа', 'часов');
        minutesSpanText.innerHTML = getEnding(t.minutes, 'минута', 'минуты', 'минут');
        secondsSpanText.innerHTML = getEnding(t.seconds, 'секунда', 'секунды', 'секунд');

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(document.querySelector('.countdown-deadline').dataset.deadline);
initializeClock('maintenance-countdown', deadline);