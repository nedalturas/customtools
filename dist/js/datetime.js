const { DateTime } = luxon;

  function updateClocks() {
    const dubai = DateTime.now().setZone("Asia/Dubai").toFormat("ff");
    const manila = DateTime.now().setZone("Asia/Manila").toFormat("ff");

    document.getElementById("dubai-time").textContent = dubai;
    document.getElementById("ph-time").textContent = manila;
  }

updateClocks(); // Initial call
setInterval(updateClocks, 1000); // Update every second