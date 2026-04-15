// javascript/logica_validare.js

document.addEventListener('DOMContentLoaded', function () {
  // Funcție generică pentru a marca eroarea
  function marcheazaEroare(element, conditie) {
    if (conditie) {
      element.style.border = '2px solid red';
      return false;
    } else {
      element.style.border = '1px solid #ccc';
      return true;
    }
  }

  // --- Validare Formular Profil ---
  const formProfil = document.getElementById('form-profil');
  if (formProfil) {
    formProfil.onsubmit = function (e) {
      let esteValid = true;

      const nume = document.getElementById('p-nume');
      const email = document.getElementById('p-email');
      const parola = document.getElementById('p-parola');

      if (
        !marcheazaEroare(nume, nume.value.length < 3 || /\d/.test(nume.value))
      )
        esteValid = false;

      if (!marcheazaEroare(email, !email.value.includes('@')))
        esteValid = false;

      if (!marcheazaEroare(parola, parola.value.length < 8)) esteValid = false;

      if (!esteValid) {
        e.preventDefault();
        alert('Corectați câmpurile marcate cu roșu în profil!');
      }
    };
  }

  // --- Validare Formular Contact ---
  const formContact = document.getElementById('form-contact');
  if (formContact) {
    formContact.onsubmit = function (e) {
      let esteValid = true;
      const subiect = document.getElementById('c-subiect');
      const mesaj = document.getElementById('c-mesaj');

      // Validare subiect (să nu fie gol)
      if (!marcheazaEroare(subiect, subiect.value.trim() === '')) {
        esteValid = false;
      }

      // Validare mesaj (minim 10 caractere)
      if (!marcheazaEroare(mesaj, mesaj.value.length < 10)) {
        esteValid = false;
      }

      if (!esteValid) {
        e.preventDefault();
        alert(
          'Te rugăm să completezi subiectul și un mesaj de minim 10 caractere.',
        );
      }
    };
  }

  // --- Validare Formular Proiect ---
  const formProiect = document.getElementById('form-proiect');
  if (formProiect) {
    formProiect.onsubmit = function (e) {
      let esteValid = true;
      const titlu = document.getElementById('pr-titlu');
      const dataProiect = document.getElementById('pr-data');
      const prioritate = document.getElementById('pr-prioritate');

      // Validare titlu
      if (!marcheazaEroare(titlu, titlu.value.trim() === '')) {
        esteValid = false;
      }

      // Validare dată (să fie selectată)
      if (!marcheazaEroare(dataProiect, dataProiect.value === '')) {
        esteValid = false;
      }

      // Validare prioritate (să fie selectată o opțiune cu valoare)
      if (!marcheazaEroare(prioritate, prioritate.value === '')) {
        esteValid = false;
      }

      if (!esteValid) {
        e.preventDefault();
        alert('Toate câmpurile sunt obligatorii: Titlu, Dată și Prioritate.');
      }
    };
  }
});
