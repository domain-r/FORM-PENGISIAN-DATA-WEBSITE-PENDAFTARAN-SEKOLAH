const form = document.getElementById('formSekolah');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(form);
  let msg = 'Data Pendaftaran Sekolah:\n\n';
  for (let [key, value] of data.entries()) {
    msg += `${key}: ${value}\n`;
  }

  const wa = form.waPendaftaran.value || '085141396865';
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  window.open(waLink, '_blank');
});
