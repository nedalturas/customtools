function showValues() {
  const fullName = document.getElementById('full_name').value;
  const phoneNum = document.getElementById('phone_number').value;
  const concernSelect = document.getElementById('concern_select').value;

  const displayValueElement = document.getElementById('display_value');
  if (displayValueElement) {
    // Format as plain text without HTML tags
    displayValueElement.innerHTML = `Full Name: ${fullName}<br>Phone Number: ${phoneNum}<br>Concern: ${concernSelect}`;
  }
}


function clearConverterForm() {
  const form = document.getElementById('template_form');
  if (form) {
    form.reset();
  }

  const displayValueElement = document.getElementById('display_value');
  if (displayValueElement) {
    displayValueElement.innerHTML = `Full Name: <br>Phone Number: <br>Concern:`;
  }
}