$(document).ready(function () {
  // functie helper pt erori
  function marcheazaEroare($el, conditie) {
    $el.css('border', conditie ? '2px solid red' : '1px solid #ccc');
    return !conditie;
  }

  // Validare Formular Profil
  $('#form-profil').on('submit', function (e) {
    let v1 = marcheazaEroare(
      $('#p-nume'),
      $('#p-nume').val().length < 3 || /\d/.test($('#p-nume').val()),
    );
    let v2 = marcheazaEroare($('#p-email'), !$('#p-email').val().includes('@'));
    let v3 = marcheazaEroare($('#p-parola'), $('#p-parola').val().length < 8);

    if (!(v1 && v2 && v3)) {
      e.preventDefault();
      alert('Corectați profilul!');
    }
  });

  // Validare Formular Proiect
  $('#form-proiect').on('submit', function (e) {
    let v1 = marcheazaEroare(
      $('#pr-titlu'),
      $.trim($('#pr-titlu').val()) === '',
    );
    let v2 = marcheazaEroare($('#pr-data'), $('#pr-data').val() === '');
    let v3 = marcheazaEroare(
      $('#pr-prioritate'),
      $('#pr-prioritate').val() === '',
    );

    if (!(v1 && v2 && v3)) {
      e.preventDefault();
      alert('Toate câmpurile sunt obligatorii!');
    }
  });

  // Validare Formular Contact
  $('#form-contact').on('submit', function (e) {
    let esteValid = true;
    const $subiect = $('#c-subiect');
    const $mesaj = $('#c-mesaj');

    if (!marcheazaEroare($subiect, $.trim($subiect.val()) === '')) {
      esteValid = false;
    }
    if (!marcheazaEroare($mesaj, $mesaj.val().length < 10)) {
      esteValid = false;
    }

    if (!esteValid) {
      e.preventDefault();
      alert(
        'Te rugăm să completezi subiectul și un mesaj de minim 10 caractere.',
      );
    }
  });
});
