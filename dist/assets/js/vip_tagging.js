document.addEventListener("DOMContentLoaded", function () {
  
  const select = document.getElementById('concern_select');
  const display = document.getElementById('display_value');
  
  select.addEventListener('change', () => {
    const selected = vip_tags.find(s => s.name === select.value);
  
    display.innerHTML = selected
      ? selected.managers.map(m => `<p>${m.id}. ${m.name}</p>`).join('')
      : '';
  });
});
