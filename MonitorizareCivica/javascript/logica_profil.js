$(document).ready(function () {
  // logica judet -> localitate
  $('#select-judet').on('change', function () {
    const judet = $(this).val();
    const $localitate = $('#select-localitate');

    $localitate.html('<option value="">-- Alege localitatea --</option>');

    if (judet && dateLocatii[judet]) {
      $localitate.prop('disabled', false);
      $.each(dateLocatii[judet], function (i, loc) {
        $localitate.append($('<option>', { value: loc, text: loc }));
      });
    } else {
      $localitate.prop('disabled', true);
    }
  });

  // logica varsta -> an nastere
  $('#input-varsta-profil').on('input', function () {
    const v = parseInt($(this).val());
    const $inData = $('#input-data-nastere');
    const $helper = $('#v-helper');

    if (v >= 18 && v <= 100) {
      const anCurent = new Date().getFullYear();
      const anMinim = anCurent - v - 1;
      const anMaxim = anCurent - v;

      // setam limitele calendarului folosind .attr()
      $inData.attr('min', `${anMinim}-01-01`);
      $inData.attr('max', `${anMaxim}-12-31`);

      $helper
        .text(`Ani posibili: ${anMinim} sau ${anMaxim}`)
        .css('color', 'green');

      // verificam daca data deja selectata mai e valida
      if ($inData.val()) {
        const anSelectat = new Date($inData.val()).getFullYear();
        if (anSelectat < anMinim || anSelectat > anMaxim) {
          $inData.val('');
        }
      }
    } else {
      $inData.removeAttr('min max');
      $helper.text('Vârstă nepermisă (min 18 ani).').css('color', 'red');
    }
  });
});
