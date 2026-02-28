document.getElementById('add-label-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
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