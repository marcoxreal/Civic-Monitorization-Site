$(document).ready(function () {
  // CAROUSEL
  let currentSlide = 0;

  function updateCarousel() {
    const $img = $('#carousel-img');
    if ($img.length === 0) return;

    const item = dateCarousel[currentSlide];
    $img.attr('src', item.img);
    $('#carousel-link').attr('href', item.link);
    $('#carousel-caption').text(item.text);
  }

  // atasam evenimente butoanelor
  window.moveSlide = function (step) {
    currentSlide =
      (currentSlide + step + dateCarousel.length) % dateCarousel.length;
    updateCarousel();
  };

  if (typeof dateCarousel !== 'undefined') updateCarousel();
  setInterval(() => moveSlide(1), 3000);

  // TABEL ORIZONTAL (Populare)
  function populateTable() {
    const $body = $('#body-tabel');
    $body.empty(); // Curățăm corpul tabelului

    $.each(dateProiecte, function (i, p) {
      const row = `<tr><td>${p.id}</td><td>${p.titlu}</td><td>${p.voturi}</td></tr>`;
      $body.append(row);
    });
  }

  // TABEL ORIZONTAL (Sortare)
  window.sortTable = function (colIndex) {
    const $table = $('#tabel-proiecte');
    const $headers = $table.find('th');
    const $rows = $table.find('tbody tr').get();
    const isAsc = !$headers.eq(colIndex).hasClass('sorted-asc');

    $rows.sort(function (a, b) {
      const valA = $(a).children('td').eq(colIndex).text();
      const valB = $(b).children('td').eq(colIndex).text();
      return isAsc
        ? $.isNumeric(valA)
          ? valA - valB
          : valA.localeCompare(valB)
        : $.isNumeric(valA)
          ? valB - valA
          : valB.localeCompare(valA);
    });

    // Update vizual iconite
    $headers.removeClass('sorted-asc sorted-desc').find('span').text('↕');
    $headers
      .eq(colIndex)
      .addClass(isAsc ? 'sorted-asc' : 'sorted-desc')
      .find('span')
      .text(isAsc ? '▲' : '▼');

    $.each($rows, function (i, row) {
      $table.children('tbody').append(row);
    });
  };

  // TABEL VERTICAL (Populare & Sortare)
  function populateVerticalTable() {
    const $table = $('#tabel-vertical');
    if ($table.length === 0) return;

    $table.find('tr').each(function () {
      $(this).find('td').remove(); // Ștergem celulele de date vechi
    });

    $.each(dateProiecte, function (i, p) {
      $table.find('tr').eq(0).append(`<td>${p.id}</td>`);
      $table.find('tr').eq(1).append(`<td>${p.titlu}</td>`);
      $table.find('tr').eq(2).append(`<td>${p.voturi}</td>`);
      $table.find('tr').eq(3).append(`<td>${p.buget}</td>`);
    });
  }

  window.sortVertical = function (rowIndex) {
    const $table = $('#tabel-vertical');
    const $rows = $table.find('tr');
    const isAsc = !$rows.eq(rowIndex).find('th').hasClass('sorted-asc');

    let columns = [];
    const numDataCols = $rows.first().find('td').length;

    for (let j = 0; j < numDataCols; j++) {
      let col = $rows
        .map(function () {
          return $(this).find('td').eq(j).text();
        })
        .get();
      columns.push(col);
    }

    columns.sort((a, b) =>
      isAsc
        ? a[rowIndex].localeCompare(b[rowIndex], undefined, { numeric: true })
        : b[rowIndex].localeCompare(a[rowIndex], undefined, { numeric: true }),
    );

    $rows.find('th').removeClass('sorted-asc sorted-desc');
    $rows
      .eq(rowIndex)
      .find('th')
      .addClass(isAsc ? 'sorted-asc' : 'sorted-desc');

    $rows.each(function (rIdx) {
      const $currentRow = $(this);
      $.each(columns, function (cIdx, colData) {
        $currentRow.find('td').eq(cIdx).text(colData[rIdx]);
      });
    });
  };

  // LISTE COLAPSABILE
  $('.collapsible-item').on('click', function () {
    $(this).toggleClass('collapsed').next('.nested-list').slideToggle();
  });

  // SCOR IMPACT AUTOMAT
  $('#pr-titlu, #pr-prioritate, #pr-fisier').on('input change', function () {
    let scor = 0;
    const titlu = $('#pr-titlu').val();
    const prioritate = $('#pr-prioritate').val();
    const areFisier = $('#pr-fisier')[0].files.length > 0;

    if (prioritate === 'mare') scor += 40;
    else if (prioritate === 'mica') scor += 20;

    if (titlu.length > 20) scor += 30;
    else if (titlu.length > 10) scor += 15;

    if (areFisier) scor += 30;

    scor = Math.min(scor, 100);
    let mesaj =
      scor < 30
        ? 'Impact scăzut'
        : scor < 70
          ? 'Impact mediu'
          : 'Impact ridicat';
    $('#impact-preview').text(`Scor impact: ${scor} (${mesaj})`);
  });

  // executare initiala
  if ($('#body-tabel').length) populateTable();
  if ($('#tabel-vertical').length) populateVerticalTable();
});
