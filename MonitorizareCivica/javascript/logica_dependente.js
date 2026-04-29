$(document).ready(function () {
  $('#select-partid').on('change', function () {
    const partid = $(this).val();
    const $membru = $('#select-membru');

    $membru.html('<option value="">-- Alege membrul --</option>');

    if (!partid) {
      $membru.prop('disabled', true);
    } else {
      $membru.prop('disabled', false);
      $.each(datePartide[partid], function (i, nume) {
        $membru.append($('<option>', { value: nume, text: nume }));
      });
    }
  });
});
