$(document).ready(function() {
  fetch('/assets/data/concern_codes.json')
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('concern-codes');

      data.forEach(({ id, label }) => {
        select.innerHTML += `<option value="${id}">${label}</option>`;
      });

      // Init Fomantic dropdown after options are populated
      $('#concern-codes').dropdown();
    })
    .catch(error => {
      console.error('Error loading concern codes:', error);
    });
});