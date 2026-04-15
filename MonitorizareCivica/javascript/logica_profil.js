window.onload = function () {
  const selJudet = document.getElementById('select-judet');
  const selLocalitate = document.getElementById('select-localitate');

  if (selJudet && selLocalitate) {
    selJudet.addEventListener('change', function () {
      const judet = this.value;
      selLocalitate.innerHTML =
        '<option value="">-- Alege localitatea --</option>';

      if (judet && dateLocatii[judet]) {
        selLocalitate.disabled = false;
        dateLocatii[judet].forEach((loc) => {
          let opt = document.createElement('option');
          opt.value = loc;
          opt.textContent = loc;
          selLocalitate.appendChild(opt);
        });
      } else {
        selLocalitate.disabled = true;
      }
    });
  }

  const inVarsta = document.getElementById('input-varsta-profil');
  const inData = document.getElementById('input-data-nastere');
  const helper = document.getElementById('v-helper');

  if (inVarsta && inData) {
    inVarsta.addEventListener('input', function() {
      const v = parseInt(this.value);

      if (v >= 18 && v <= 100) {
        const dataCurenta = new Date();
        const anCurent = dataCurenta.getFullYear();

        const anMinim = anCurent - v - 1;
        const anMaxim = anCurent - v;

        inData.min = `${anMinim}-01-01`;
        inData.max = `${anMaxim}-12-31`;

        helper.textContent = `Ani posibili: ${anMinim} sau ${anMaxim}`;
        helper.style.color = "green";

        if (inData.value) {
          const anSelectat = new Date(inData.value).getFullYear();
          if (anSelectat < anMinim || anSelectat > anMaxim) {
            inData.value = "";
          }
        }
      } else {
        inData.min = "";
        inData.max = "";
        helper.textContent = "Vârstă nepermisă (min 18 ani).";
        helper.style.color = "red";
      }
    });
  }}
