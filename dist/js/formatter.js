function showValues() {
  const refNum = document.getElementById('reference_number').value;
  const fullName = document.getElementById('full_name').value;
  const phoneNum = document.getElementById('phone_number').value;
  const concernSelect = document.getElementById('concern_select').value;

  const refValueElement = document.getElementById('ref_value');
  if (refValueElement) {
    refValueElement.innerHTML = `Reference: ${refNum}`;
  }

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

  const refValueElement = document.getElementById('ref_value');
  if (refValueElement) {
    refValueElement.innerHTML = 'Reference: '; // or clear it completely
  }

  const displayValueElement = document.getElementById('display_value');
  if (displayValueElement) {
    displayValueElement.innerHTML = `Full Name: <br>Phone Number: <br>Concern:`;
  }
}