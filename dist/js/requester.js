
function showReqValues() {
    const locationVal = document.getElementById('location_value').value.trim();
    const serviceDetail = document.getElementById('service_detail').value.trim();
    const dateVal = document.getElementById('date_value').value.trim();
    const timeVal = document.getElementById('time_value').value.trim();
    const isSoonest = document.getElementById('soonest_yes').checked;
    
    let message = "Soonest please?"; // Default to soonest
    
    if (!isSoonest && dateVal && timeVal) {
      const today = new Date();
      const selectedDate = new Date(dateVal);
      
      let formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
      message = "Possible on " + formattedDate + " at " + timeVal + "?";
      
      if (selectedDate.toDateString() === today.toDateString()) {
        message = "Possible today at " + timeVal + "?";
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        if (selectedDate.toDateString() === tomorrow.toDateString()) {
          message = "Possible tomorrow at " + timeVal + "?";
        }
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
    const isToday = document.getElementById("today_yes").checked;
    const dateInput = document.getElementById("date_value");
    
    if (isToday) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.value = today;
      dateInput.disabled = true;
      
      // Uncheck soonest when today is selected
      document.getElementById("soonest_yes").checked = false;
      document.getElementById("time_value").disabled = false;
    } else {
      dateInput.value = "";
      dateInput.disabled = false;
    }
  }
function checkSoonest(){
    const isSoonest = document.getElementById("soonest_yes").checked;
    const dateInput = document.getElementById("date_value");
    const timeInput = document.getElementById("time_value");

    if (isSoonest) {
        // Disable date and time inputs when soonest is selected
        dateInput.disabled = true;
        timeInput.disabled = true;
        dateInput.value = "";
        timeInput.value = "";
        
        // Also uncheck "Today" checkbox
        document.getElementById("today_yes").checked = false;
      } else {
        // Re-enable inputs when soonest is unchecked
        dateInput.disabled = false;
        timeInput.disabled = false;
      }
}