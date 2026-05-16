$(document).ready(function () {
    $('.ui.dropdown').dropdown()
    $('.menu .item').tab();
    $('#date_calendar').calendar({ type: 'date' });
    $('#time_calendar').calendar({ type: 'time' });
    $('.ui.sticky').sticky();
});