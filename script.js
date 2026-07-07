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
                musicBtn.innerHTML = '🎵 Müziği Durdur';
                musicBtn.classList.add('playing');
            }).catch(err => console.log("Müzik izni gerekiyor:", err));
        } else {
            bgMusic.pause();
            musicBtn.innerHTML = '🎵 Müziği Başlat';
            musicBtn.classList.remove('playing');
        }
    });
}

// ==========================================================
// GİRİŞ ANİMASYONU VE MOBİL BUTON ENJEKSİYONU MOTORU
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
    // Her kapağın kendi 'alt' etiketindeki dile bakarak BAŞINA butonu ekler.
    if (window.innerWidth <= 700) {
        books.forEach(book => {
            const intro = book.querySelector('.book-intro');
            const imgAlt = book.querySelector('img') ? book.querySelector('img').getAttribute('alt') : 'Türkçe';
            
            if (intro && !intro.querySelector('.mobil-book-btn')) {
                const btn = document.createElement('a');
                
                // İndirme linki (Mevcut Instagram bağlantısını taşır veya istediğiniz bir linki verebilirsiniz)
                btn.href = book.getAttribute('href') || 'https://www.instagram.com/coktefekkurederim/';
                btn.target = "_blank";
                btn.className = "mobil-book-btn";
                
                // Kapağın diline göre buton metnini belirleme
                switch(imgAlt) {
                    case 'English':
                        btn.innerText = "Download Book for Free ↓";
                        break;
                    case 'Español':
                        btn.innerText = "Descargar Libro Gratis ↓";
                        break;
                    case 'Русский':
                        btn.innerText = "Скачать книгу бесплатно ↓";
                        break;
                    case 'Deutsch':
                        btn.innerText = "Buch kostenlos herunterladen ↓";
                        break;
                    case 'Português':
                        btn.innerText = "Baixar Livro Grátis ↓";
                        break;
                    default:
                        btn.innerText = "Kitabı Ücretsiz İndir ↓";
                }
                
                // Butonu, CSS'teki 'order' kuralıyla uyumlu çalışması için kutunun en başına ekler
                intro.insertBefore(btn, intro.firstChild);
            }
        });
    }
});

// ==========================================================
// GELİŞMİŞ FARE HAREKET VE MOBİL TIKLAMA MOTORU
// ==========================================================
function handleMove(e)
