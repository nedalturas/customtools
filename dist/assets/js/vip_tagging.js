document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("concern_select").addEventListener("change", (e) => {
    const selected = vip_tags.find((s) => s.name === e.target.value);
    const list = document.getElementById("managers-list");
    list.innerHTML = selected
      ? selected.managers.map((m) => `<li>${m.name}</li>`).join("")
      : "";
  });
});
