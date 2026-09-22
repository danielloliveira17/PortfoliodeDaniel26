document.addEventListener("DOMContentLoaded", () => {

    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    if (!hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    function fixTime(time) {
        return time < 10 ? '0' + time : time;
    }

    function updateClock() {

        const date = new Date();

        hoursElement.textContent = fixTime(date.getHours());
        minutesElement.textContent = fixTime(date.getMinutes());
        secondsElement.textContent = fixTime(date.getSeconds());
    }

    updateClock();
    setInterval(updateClock, 1000);

});