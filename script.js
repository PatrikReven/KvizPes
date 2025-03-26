const music = document.getElementById('introMusic');
music.muted = false;
// Po 12 sekundah skrij začetno animacijo in prikaži glavni meni
setTimeout(() => {
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');
}, 12000);
