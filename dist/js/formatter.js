
function showValues() {
  const refNum = document.getElementById('reference_number').value;
  const fullName = document.getElementById('full_name').value;
  const phoneNum = document.getElementById('phone_number').value;
  const concernSelect = document.getElementById('concern_select').value;

  console.log('Ref Number:', refNum);
  console.log('Full Name:', fullName);
  console.log('Phone Number:', phoneNum);
  console.log('Concern:', concernSelect);

  // Display values in the UI
  document.getElementById('ref_value').innerText = `Reference Number: ${refNum}`;

  document.getElementById('display_value').innerText =
    `Full Name: ${fullName}\nPhone Number: ${phoneNum}\nConcern: ${concernSelect}`;
}

function clearConverterForm() {
  document.getElementById('template_form').reset();
  document.getElementById('display_value').innerText = '';
}

