document.getElementById('concern_select').addEventListener('change', (e) => {
    const selected = vipTags.find(s => s.name === e.target.value);
    const list = document.getElementById('managers-list');
    list.innerHTML = selected
        ? selected.managers.map(m => `<li>${m.name}</li>`).join('')
        : '';
});