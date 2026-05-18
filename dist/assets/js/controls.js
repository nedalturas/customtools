// Helper function to show status message with Fomantic UI loader
function showStatus(message, type = 'loading') {
  const statusMessage = document.getElementById('status-message');
  if (!statusMessage) return;

  // reset visibility and classes
  statusMessage.style.display = 'flex';
  statusMessage.className = `ui message ${type}`;

  if (type === 'loading') {
    // inline active loader from Fomantic UI
    statusMessage.innerHTML = `<div class="ui active inline loader"></div> ${message}`;
  } else {
    statusMessage.textContent = message;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('add-label-form');

  // Check if the form actually exists on this page before attaching the listener
  if (form) {
      form.addEventListener('submit', async (e) => {
          e.preventDefault(); // Stops the ?newLabel=... URL change
          console.log("JavaScript successfully intercepted the form!"); 
          
          const newLabelInput = document.getElementById('new-label').value;
          const submitBtn = document.getElementById('submit-btn');

          // UX: Tell the user a build is starting
          submitBtn.disabled = true;
          showStatus('Sending update and rebuilding site... This may take a minute.', 'loading');

          try {
              // Send the data to your serverless function (e.g., a Netlify function)
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify({ label: newLabelInput }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  showStatus('Success! The site is rebuilding. Refresh in about 30 seconds to see your new label everywhere.', 'success');
                  document.getElementById('add-label-form').reset();
              } else {
                  throw new Error('Failed to trigger update');
              }
          } catch (error) {
              console.error(error);
              showStatus('Error updating the label. Please try again.', 'error');
              submitBtn.disabled = false;
          }
      });
  } else {
      console.error("The form was not found on this page.");
  }

  // Handle toggle switch changes (enable/disable)
  const toggles = document.querySelectorAll('.code-toggle');
  toggles.forEach(input => {
      input.addEventListener('change', async (e) => {
          const codeId = input.getAttribute('data-code-id');
          const codeLabel = input.parentElement.parentElement.querySelector('.header').textContent.replace('(Disabled)', '').trim();
          const enable = input.checked;
          const action = enable ? 'enable' : 'disable';

          const confirmed = confirm(`Are you sure you want to ${action} "${codeLabel}"?`);
          if (!confirmed) {
              // revert state
              input.checked = !enable;
              return;
          }

          input.disabled = true;
          showStatus(`${enable ? 'Enabling' : 'Disabling'} concern code...`, 'loading');

          try {
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify(enable ? { enable: codeId } : { disable: codeId }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  showStatus(`Concern code ${enable ? 'enabled' : 'disabled'}! Refreshing in 3 seconds...`, 'success');
                  setTimeout(() => location.reload(), 3000);
              } else {
                  throw new Error(`Failed to ${action} concern code`);
              }
          } catch (error) {
              console.error(error);
              showStatus(`Error ${enable ? 'enabling' : 'disabling'} the concern code. Please try again.`, 'error');
              input.disabled = false;
              input.checked = !enable; // revert
          }
      });
  });
});