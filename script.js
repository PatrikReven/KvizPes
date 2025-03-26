const music = document.getElementById('introMusic');
// Poskrbi, da bo glasba začela predvajanje ob nalaganju
music.volume = 1.0; // Nastavi glasnost (če jo želiš prilagoditi)
music.play().catch(err => console.log("Napaka pri predvajanju glasbe:", err));

// Po 12 sekundah skrij začetno animacijo in prikaži glavni meni
setTimeout(() => {
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
}, 12000);
