const form = document.getElementById('formSekolah');

form.addEventListener('submit', function(e){
  e.preventDefault();

  const data = new FormData(form);
  let msg = '📄 *Data Pendaftaran Sekolah* 📄\n\n';

  // Loop FormData
  const formObj = {};
  for (let [key, value] of data.entries()) {
    // Kalau key array (ekskul[], seragamNama[], syarat[])
    if(key.endsWith('[]')){
      if(!formObj[key]) formObj[key] = [];
      formObj[key].push(value);
    } else {
      formObj[key] = value;
    }
  }

  // Tambahin Ekskul
  if(formObj['ekskul[]']) {
    msg += '*Ekstrakurikuler:*\n';
    formObj['ekskul[]'].forEach((ex, i) => {
      if(ex.trim() !== '') msg += `  - ${ex}\n`;
    });
    msg += '\n';
  }

  // Tambahin Seragam (nama aja)
  if(formObj['seragamNama[]']) {
    msg += '*Seragam Sekolah:*\n';
    formObj['seragamNama[]'].forEach((ser, i) => {
      if(ser.trim() !== '') msg += `  - ${ser}\n`;
    });
    msg += '\n';
  }

  // Tambahin Syarat
  if(formObj['syarat[]']) {
    msg += '*Syarat Pendaftaran:*\n';
    formObj['syarat[]'].forEach((sy, i) => {
      if(sy.trim() !== '') msg += `  - ${sy}\n`;
    });
    msg += '\n';
  }

  // Tambahin field lain
  const singleFields = ['namaSekolah','singkatanSekolah','tahunAjaran','alamatSekolah','waSekolah','emailSekolah','peraturanSekolah','waPendaftaran'];
  singleFields.forEach(f => {
    if(formObj[f] && formObj[f].trim() !== '') {
      const label = f.replace(/([A-Z])/g, ' $1').replace(/^./, str=>str.toUpperCase());
      msg += `*${label}:* ${formObj[f]}\n`;
    }
  });

  // Nomor WA pendaftaran ke format internasional
  let wa = formObj.waPendaftaran || '6285141396865';
  wa = wa.replace(/^0/, '62'); // ganti 0 di depan jadi 62

  // Bikin link WA
  const waLink = `https://wa.me/6285141396865?text=${encodeURIComponent(msg)}`;
  window.open(waLink, '_blank');
});
