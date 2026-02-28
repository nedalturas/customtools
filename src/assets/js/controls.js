// document.getElementById('add-label-form').addEventListener('submit', async (e) => {
//   e.preventDefault();
  
//   const newLabelInput = document.getElementById('new-label').value;
//   const statusMessage = doggcument.getElementById('status-message');
//   const submitBtn = document.getElementById('submit-btn');

//   // UX: Tell the user a build is starting
//   submitBtn.disabled = true;
//   statusMessage.textContent = "Sending update and rebuilding site... This may take a minute.";

//   try {
//       // Send the data to your serverless function (e.g., a Netlify function)
//       const response = await fetch('/.netlify/functions/update-json', {
//           method: 'POST',
//           body: JSON.stringify({ label: newLabelInput }),
//           headers: { 'Content-Type': 'application/json' }
//       });

//       if (response.ok) {
//           statusMessage.textContent = "Success! The site is rebuilding. Refresh in about 30 seconds to see your new label everywhere.";
//           document.getElementById('add-label-form').reset();
//       } else {
//           throw new Error('Failed to trigger update');
//       }
//   } catch (error) {
//       console.error(error);
//       statusMessage.textContent = "Error updating the label. Please try again.";
//       submitBtn.disabled = false;
//   }
// });


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('add-label-form');

  // Check if the form actually exists on this page before attaching the listener
  if (form) {
      form.addEventListener('submit', async (e) => {
          e.preventDefault(); // Stops the ?newLabel=... URL change
          console.log("JavaScript successfully intercepted the form!"); 
          
          const newLabelInput = document.getElementById('new-label').value;
          const statusMessage = document.getElementById('status-message');
          const submitBtn = document.getElementById('submit-btn');

          // UX: Tell the user a build is starting
          submitBtn.disabled = true;
          statusMessage.textContent = "Sending update and rebuilding site... This may take a minute.";

          try {
              // Send the data to your serverless function (e.g., a Netlify function)
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify({ label: newLabelInput }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  statusMessage.textContent = "Success! The site is rebuilding. Refresh in about 30 seconds to see your new label everywhere.";
                  document.getElementById('add-label-form').reset();
              } else {
                  throw new Error('Failed to trigger update');
              }
          } catch (error) {
              console.error(error);
              statusMessage.textContent = "Error updating the label. Please try again.";
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
          const statusMessage = document.getElementById('status-message');
          
          // Show confirmation dialog
          const confirmed = confirm(`Are you sure you want to disable "${codeLabel}"?`);
          
          if (!confirmed) {
              return;
          }
          
          button.disabled = true;
          button.textContent = "Disabling...";
          statusMessage.textContent = "Disabling concern code...";

          try {
              // Send disable request to your serverless function
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify({ disable: codeId }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  statusMessage.textContent = "Concern code disabled! Refreshing in 3 seconds...";
                  setTimeout(() => location.reload(), 3000);
              } else {
                  throw new Error('Failed to disable concern code');
              }
          } catch (error) {
              console.error(error);
              statusMessage.textContent = "Error disabling the concern code. Please try again.";
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
          const statusMessage = document.getElementById('status-message');
          
          // Show confirmation dialog
          const confirmed = confirm(`Are you sure you want to enable "${codeLabel}"?`);
          
          if (!confirmed) {
              return;
          }
          
          button.disabled = true;
          button.textContent = "Enabling...";
          statusMessage.textContent = "Enabling concern code...";

          try {
              // Send enable request to your serverless function
              const response = await fetch('/.netlify/functions/update-json', {
                  method: 'POST',
                  body: JSON.stringify({ enable: codeId }),
                  headers: { 'Content-Type': 'application/json' }
              });

              if (response.ok) {
                  statusMessage.textContent = "Concern code enabled! Refreshing in 3 seconds...";
                  setTimeout(() => location.reload(), 3000);
              } else {
                  throw new Error('Failed to enable concern code');
              }
          } catch (error) {
              console.error(error);
              statusMessage.textContent = "Error enabling the concern code. Please try again.";
              button.disabled = false;
              button.textContent = "Enable";
          }
      });
  });
});