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

  headers.forEach((h) => h.classList.remove('sorted-asc', 'sorted-desc'));
  headers[colIndex].classList.add(isAsc ? 'sorted-asc' : 'sorted-desc');

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

  // Curățăm datele vechi dacă există (păstrăm doar primul TH de pe fiecare rând)
  Array.from(table.rows).forEach(row => {
    while (row.cells.length > 1) {
      row.deleteCell(1);
    }
  });

  // Adăugăm datele din variabila globală dateProiecte (din date_dependente.js)
  dateProiecte.forEach(p => {
    table.rows[0].insertCell(-1).innerText = p.id;
    table.rows[1].insertCell(-1).innerText = p.titlu;
    table.rows[2].insertCell(-1).innerText = p.voturi;
    table.rows[3].insertCell(-1).innerText = p.buget;
  });
}

// --- SORTARE TABEL VERTICAL ---
function sortVertical(rowIndex) {
  const table = document.getElementById("tabel-vertical");
  const rows = Array.from(table.rows);
  const headerCell = rows[rowIndex].cells[0];

  // Toggle între asc/desc folosind o clasă
  const isAsc = !headerCell.classList.contains('sorted-asc');

  // 1. Extragem coloanele ca array-uri de date
  let columns = [];
  const numDataCols = rows[0].cells.length - 1;

  for (let j = 1; j <= numDataCols; j++) {
    let col = rows.map(row => row.cells[j].innerText);
    columns.push(col);
  }

  // 2. Sortăm array-ul de coloane în funcție de valoarea de pe rândul rowIndex
  columns.sort((a, b) => {
    let valA = a[rowIndex];
    let valB = b[rowIndex];

    // Sortare numerică dacă e cazul, altfel alfabetică
    return isAsc
      ? valA.localeCompare(valB, undefined, { numeric: true })
      : valB.localeCompare(valA, undefined, { numeric: true });
  });

  // 3. Update vizual header
  rows.forEach(r => r.cells[0].classList.remove('sorted-asc', 'sorted-desc'));
  headerCell.classList.add(isAsc ? 'sorted-asc' : 'sorted-desc');

  // 4. Scriem datele înapoi în tabel
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