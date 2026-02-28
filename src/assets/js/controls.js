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

  // Handle disable button clicks
  const disableButtons = document.querySelectorAll('.disable-code-btn');
  disableButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
          e.preventDefault();
          const codeId = button.getAttribute('data-code-id');
          const codeLabel = button.parentElement.querySelector('.header').textContent.trim();
          
          // Show confirmation dialog
          const confirmed = confirm(`Are you sure you want to disable "${codeLabel}"?`);
          
          if (!confirmed) {
              return;
          }
          
          button.disabled = true;
          button.textContent = "Disabling...";
          showStatus('Disabling concern code...', 'loading');

          try {
              // Send disable request to your serverless function
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify({ disable: codeId }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  showStatus('Concern code disabled! Refreshing in 3 seconds...', 'success');
                  setTimeout(() => location.reload(), 3000);
              } else {
                  throw new Error('Failed to disable concern code');
              }
          } catch (error) {
              console.error(error);
              showStatus('Error disabling the concern code. Please try again.', 'error');
              button.disabled = false;
              button.textContent = "Disable";
          }
      });
  });

  // Handle enable button clicks
  const enableButtons = document.querySelectorAll('.enable-code-btn');
  enableButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
          e.preventDefault();
          const codeId = button.getAttribute('data-code-id');
          const codeLabel = button.parentElement.querySelector('.header').textContent.replace('(Disabled)', '').trim();
          
          // Show confirmation dialog
          const confirmed = confirm(`Are you sure you want to enable "${codeLabel}"?`);
          
          if (!confirmed) {
              return;
          }
          
          button.disabled = true;
          button.textContent = "Enabling...";
          showStatus('Enabling concern code...', 'loading');

          try {
              // Send enable request to your serverless function
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify({ enable: codeId }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  showStatus('Concern code enabled! Refreshing in 3 seconds...', 'success');
                  setTimeout(() => location.reload(), 3000);
              } else {
                  throw new Error('Failed to enable concern code');
              }
          } catch (error) {
              console.error(error);
              showStatus('Error enabling the concern code. Please try again.', 'error');
              button.disabled = false;
              button.textContent = "Enable";
          }
      });
  });
});