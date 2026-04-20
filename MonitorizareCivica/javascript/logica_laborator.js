// CAROUSEL
let currentSlide = 0;

function updateCarousel() {
  const img = document.getElementById('carousel-img');
  if (!img) return;
  const item = dateCarousel[currentSlide];
  img.src = item.img;
  document.getElementById('carousel-link').href = item.link;
  document.getElementById('carousel-caption').innerText = item.text;
}

function moveSlide(step) {
  currentSlide =
    (currentSlide + step + dateCarousel.length) % dateCarousel.length;
  updateCarousel();
}

// Auto-play la 3 secunde
setInterval(() => moveSlide(1), 3000);

// TABEL SORTABIL
function populateTable() {
  const body = document.getElementById('body-tabel');
  body.innerHTML = '';
  dateProiecte.forEach((p) => {
    let row = `<tr><td>${p.id}</td><td>${p.titlu}</td><td>${p.voturi}</td></tr>`;
    body.innerHTML += row;
  });
}

function sortTable(colIndex) {
  const table = document.getElementById('tabel-proiecte');
  const headers = table.querySelectorAll('th');
  let rows = Array.from(table.rows).slice(1);

  let isAsc = !headers[colIndex].classList.contains('sorted-asc');

  rows.sort((a, b) => {
    let valA = a.cells[colIndex].innerText;
    let valB = b.cells[colIndex].innerText;
    return isAsc
      ? valA.localeCompare(valB, undefined, { numeric: true })
      : valB.localeCompare(valA, undefined, { numeric: true });
  });

  headers.forEach((h, index) => {
    h.classList.remove('sorted-asc', 'sorted-desc');
    const icon = document.getElementById(`sort-icon-${index}`);
    if (icon) icon.innerText = '↕';
  });

  const currentIcon = document.getElementById(`sort-icon-${colIndex}`);
  if (isAsc) {
    headers[colIndex].classList.add('sorted-asc');
    if (currentIcon) currentIcon.innerText = '▲';
  } else {
    headers[colIndex].classList.add('sorted-desc');
    if (currentIcon) currentIcon.innerText = '▼';
  }

  // Reatașăm rândurile sortate
  rows.forEach((row) => table.tBodies[0].appendChild(row));
}
// LISTE COLAPSABILE
function initCollapsible() {
  const items = document.querySelectorAll('.collapsible-item');
  items.forEach((item) => {
    item.addEventListener('click', function () {
      const sublist = this.nextElementSibling;
      sublist.classList.toggle('hidden');
      this.classList.toggle('collapsed');
    });
  });
}

// Dark Mode Automat
// schimba tema in functie de ora utilizatorului
function checkCreativeTheme() {
  const ora = new Date().getHours();
  if (ora < 8 || ora > 20) {
    document.body.style.filter = 'invert(0.9) hue-rotate(180deg)';
    console.log('Mod de Noapte Activ (Creativ)');
  }
}

// --- POPULARE TABEL VERTICAL ---
function populateVerticalTable() {
  const table = document.getElementById('tabel-vertical');
  if (!table) return;

  // curatam datele vechi daca exista
  Array.from(table.rows).forEach((row) => {
    while (row.cells.length > 1) {
      row.deleteCell(1);
    }
  });

  // adaugam datele din variabila globale dateProiecte
  dateProiecte.forEach((p) => {
    table.rows[0].insertCell(-1).innerText = p.id;
    table.rows[1].insertCell(-1).innerText = p.titlu;
    table.rows[2].insertCell(-1).innerText = p.voturi;
    table.rows[3].insertCell(-1).innerText = p.buget;
  });
}

function sortVertical(rowIndex) {
  const table = document.getElementById('tabel-vertical');
  if (!table) return;

  const rows = Array.from(table.rows);
  const headerCell = rows[rowIndex].cells[0]; // Celula TH pe care s-a dat click

  const isAsc = !headerCell.classList.contains('sorted-asc');

  // extragem date din coloane
  let columns = [];
  const numDataCols = rows[0].cells.length - 1; // cate coloane de date avem

  for (let j = 1; j <= numDataCols; j++) {
    let col = [];
    for (let i = 0; i < rows.length; i++) {
      col.push(rows[i].cells[j].innerText);
    }
    columns.push(col);
  }

  columns.sort((a, b) => {
    let valA = a[rowIndex];
    let valB = b[rowIndex];

    // Folosim localeCompare cu numeric:true pentru a trata corect numerele
    if (isAsc) {
      return valA.localeCompare(valB, undefined, { numeric: true });
    } else {
      return valB.localeCompare(valA, undefined, { numeric: true });
    }
  });

  // GESTIONAREA VIZUALA A SAGETILOR
  rows.forEach((r) => {
    const th = r.cells[0];
    if (th) th.classList.remove('sorted-asc', 'sorted-desc');
  });

  headerCell.classList.add(isAsc ? 'sorted-asc' : 'sorted-desc');

  rows.forEach((row, rIdx) => {
    columns.forEach((colData, cIdx) => {
      row.cells[cIdx + 1].innerText = colData[rIdx];
    });
  });
}

// initializare tot la incarcare
window.onload = function () {
  if (typeof dateCarousel !== 'undefined') {
    updateCarousel();
  }
  if (document.getElementById('body-tabel')) {
    populateTable();
  }
  if (document.getElementById('tabel-vertical')) {
    populateVerticalTable();
  }
  initCollapsible();
  checkCreativeTheme();
};


// scor impact automat
const titluInput = document.getElementById('pr-titlu');
const prioritateSelect = document.getElementById('pr-prioritate');
const fisierInput = document.getElementById('pr-fisier');
const preview = document.getElementById('impact-preview');

function calculeazaImpact() {
  let scor = 0;

  // prioritate
  const prioritate = prioritateSelect.value;
  if (prioritate === 'mare') scor += 40;
  else if (prioritate === 'mica') scor += 20;

  // lungime titlu
  const titluLength = titluInput.value.length;
  if (titluLength > 20) scor += 30;
  else if (titluLength > 10) scor += 15;

  // fisier atasat
  if (fisierInput.files.length > 0) scor += 30;

  // limitare
  if (scor > 100) scor = 100;

  // interpretare
  let mesaj = '';
  if (scor < 30) mesaj = 'Impact scăzut';
  else if (scor < 70) mesaj = 'Impact mediu';
  else mesaj = 'Impact ridicat';

  preview.textContent = `Scor impact: ${scor} (${mesaj})`;
}

// event listeners
titluInput.addEventListener('input', calculeazaImpact);
prioritateSelect.addEventListener('change', calculeazaImpact);
fisierInput.addEventListener('change', calculeazaImpact);