// ==========================================================
// SEÇİCİLER VE AYARLAR
// ==========================================================
const books = document.querySelectorAll('.book');
const MAX_SCALE = 1.25;
let activeBook = null;

// MÜZİK MOTORU
const musicBtn = document.querySelector('.music-btn');
let bgMusic = document.getElementById('bgMusic');

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '🎵 PAUSE';
                musicBtn.classList.add('playing');
            }).catch(err => console.log("Müzik izni gerekiyor:", err));
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '🎵 PLAY';
            musicBtn.classList.remove('playing');
        }
    });
}

// ==========================================================
// GİRİŞ ANİMASYONU MOTORU (Sihirli Gökten İniş Şovu)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    books.forEach((book, index) => {
        setTimeout(() => {
            book.style.opacity = "1";
            if (window.innerWidth > 700) {
                book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
                const img = book.querySelector("img");
                if (img) {
                    img.style.boxShadow = "0 30px 50px rgba(212, 175, 55, 0.3)";
                    setTimeout(() => {
                        img.style.boxShadow = "0 15px 35px rgba(0,0,0,0.5)";
                    }, 800);
                }
            } else {
                book.style.transform = "none";
            }
        }, 100 * (index + 1));
    });

    // 📱 MOBİL BUTON ENJEKSİYONU: 
    // Her kitabın içindeki açıklama paneline otomatik olarak şık bir gitme butonu ekler.
    if (window.innerWidth <= 8000) {
        books.forEach(book => {
            const intro = book.querySelector('.book-intro');
            const instagramUrl = book.getAttribute('href') || 'https://www.instagram.com/coktefekkurederim/';
            const lang = book.querySelector("img").alt;

let buttonText = "Ücretsiz İndir →";

switch(lang){
    case "Türkçe":
        buttonText = "Ücretsiz İndir →";
        break;

    case "English":
        buttonText = "Download Free →";
        break;

    case "Español":
        buttonText = "Descargar Gratis →";
        break;

    case "Русский":
        buttonText = "Скачать бесплатно →";
        break;

    case "Deutsch":
        buttonText = "Kostenlos herunterladen →";
        break;

    case "Português":
        buttonText = "Baixar Grátis →";
        break;
}
            if (intro && !intro.querySelector('.mobil-book-btn')) {
                const btn = document.createElement('a');
                btn.href = instagramUrl;
                btn.target = "_blank";
                btn.className = "mobil-book-btn";
                btn.innerText = buttonText;
                
                // Butonun asil stili (Altın çerçeve, premium karanlık tema)
                btn.style.display = "block";
                btn.style.marginTop = "15px";
                btn.style.padding = "10px 15px";
                btn.style.textAlign = "center";
                btn.style.background = "linear-gradient(135deg, #bf953f 0%, #b38728 100%)";
                btn.style.color = "#120d04";
                btn.style.textDecoration = "none";
                btn.style.fontFamily = "'Cinzel', serif";
                btn.style.fontWeight = "700";
                btn.style.fontSize = "0.85rem";
                btn.style.borderRadius = "5px";
                btn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
                
                intro.appendChild(btn);
            }
        });
    }
});


    // Ekranda boş bir yere dokunulduğunda paneli kapatma koruması
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.book')) {
            books.forEach(b => b.classList.remove('active-pop'));
            activeBook = null;
        }
    });
} else {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', resetEffects);
}

function resetEffects() {
    books.forEach(book => {
        book.classList.remove('active-pop');
        if (window.innerWidth <= 700) {
            book.style.transform = "none";
        } else {
            book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
        }
        const img = book.querySelector("img");
        if (img) img.style.filter = "brightness(1)";
    });
    activeBook = null;
}
