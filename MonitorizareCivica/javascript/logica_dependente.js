
document.addEventListener('DOMContentLoaded', function () {
  const selectPartid = document.getElementById('select-partid');
  const selectMembru = document.getElementById('select-membru');

  if (selectPartid && selectMembru) {
    selectPartid.addEventListener('change', function () {
      const partid = this.value;
      selectMembru.innerHTML = '<option value="">-- Alege membrul --</option>';

      if (partid === '') {
        selectMembru.disabled = true;
      } else {
        selectMembru.disabled = false;
        datePartide[partid].forEach((nume) => {
          const opt = document.createElement('option');
          opt.value = nume;
          opt.textContent = nume;
          selectMembru.appendChild(opt);
        });
      }
    });
  }
});
