
function showValues() {
  const uiFeed = document.getElementById('ui_feedback');
  const refNum = document.getElementById('reference_number').value;
  const fullName = document.getElementById('full_name').value;
  const phoneNum = document.getElementById('phone_number').value;
  const concernSelect = document.getElementById('concern_select').value;

  console.log('Ref Number:', refNum);
  console.log('Full Name:', fullName);
  console.log('Phone Number:', phoneNum);
  console.log('Concern:', concernSelect);

  refValue = document.getElementById('ref_value').innerHTML = `Reference: ${refNum}`;
  displayValue = document.getElementById('display_value').innerHTML = `
  Full Name: ${fullName}\n Phone Number: ${phoneNum}\n Concern: ${concernSelect}
  `;
}

function clearConverterForm() {
  document.getElementById('template_form').reset();
  document.getElementById('ref_value').innerHTML = 'Reference: ';
}
