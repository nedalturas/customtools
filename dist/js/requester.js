$('#date_calendar')
    .calendar({
        type: 'date'
    });

$('#time_calendar')
    .calendar({
        type: 'time'
    });

function showReqValues() {
    const locationVal = document.getElementById('location_value').value.trim();
    const serviceDetail = document.getElementById('service_detail').value.trim();
    const dateVal = document.getElementById('date_value').value.trim();
    const timeVal = document.getElementById('time_value').value.trim();

    const today = new Date();
    const selectedDate = new Date(dateVal);

    let formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    let message = "Possible on " + formattedDate + " at " + timeVal + "?";

    if (selectedDate.toDateString() === today.toDateString()) {
        message = "Possible today at " + timeVal + "?";
    } else {
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);

        if (selectedDate.toDateString() === tomorrow.toDateString()) {
            message = "Possible tomorrow at " + timeVal + "?";
        }
    }

    document.getElementById('displayReq_value').innerHTML =
        `${locationVal.replace(/\n/g, "<br>")}<br><br>
    ${serviceDetail.replace(/\n/g, "<br>")}<br><br>
    <strong>${message}</strong>`;
}

function clearForm() {
    document.getElementById('template_request_form').reset();
    document.getElementById('displayReq_value').innerText = '';
}

function checkToday() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const isToday = document.getElementById("today_yes").checked;
    const dateInput = document.getElementById("date_value");

    if (isToday) {
        dateInput.value = today; // Replace value instead of appending
        dateInput.disabled = true;
    } else {
        dateInput.value = ""; // Clear value when switching to "No"
        dateInput.disabled = false;
    }
}
