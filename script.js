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
    if (window.innerWidth <= 700) {
        books.forEach(book => {
            const intro = book.querySelector('.book-intro');
            const instagramUrl = book.getAttribute('href') || 'https://www.instagram.com/coktefekkurederim/';
            
            if (intro && !intro.querySelector('.mobil-book-btn')) {
                const btn = document.createElement('a');
                btn.href = instagramUrl;
                btn.target = "_blank";
                btn.className = "mobil-book-btn";
                const lang = book.querySelector("img").alt;

const buttonTexts = {
    "Türkçe": "📖 Kitabı Oku / İndir",
    "English": "📖 Read / Download",
    "Español": "📖 Leer / Descargar",
    "Русский": "📖 Читать / Скачать",
    "Deutsch": "📖 Lesen / Herunterladen",
    "Português": "📖 Ler / Baixar"
};

btn.innerText = buttonTexts[lang] || "📖 Read / Download";
                
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

// ==========================================================
// GELİŞMİŞ FARE HAREKET VE MOBİL TIKLAMA MOTORU
// ==========================================================
function handleMove(e) {
    if (window.innerWidth <= 700) return; // Mobilde mouse takibini tamamen kapat

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (e.target.closest('.book-intro')) {
        return; 
    }

    let insideAnyBook = false;

    books.forEach(book => {
        const r = book.getBoundingClientRect();
        const isMouseOverBook = (
            clientX >= r.left && 
            clientX <= r.right && 
            clientY >= r.top && 
            clientY <= r.bottom
        );

        if (isMouseOverBook) {
            insideAnyBook = true;
            
            if (activeBook && activeBook !== book) {
                activeBook.classList.remove('active-pop');
                activeBook.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
                const oldImg = activeBook.querySelector("img");
                if (oldImg) oldImg.style.filter = "brightness(1)";
            }

            activeBook = book;
            book.classList.add('active-pop');

            const mouseX = clientX - r.left;
            const mouseY = clientY - r.top;
            const rx = -(mouseY - r.height / 2) / 12;
            const ry = (mouseX - r.width / 2) / 10;

            book.style.transform = `
                translateY(-25px)
                scale(${MAX_SCALE})
                rotateX(${rx}deg)
                rotateY(${ry}deg)
            `;
            
            const img = book.querySelector("img");
            if (img) img.style.filter = "brightness(1.15)";
        }
    });

    if (!insideAnyBook && activeBook) {
        resetEffects();
    }
}

// 📱 MOBİL İÇİN AKILLI DOKUNMA YÖNETİMİ
if (window.innerWidth <= 700) {
    books.forEach(book => {
        book.addEventListener('click', (e) => {
            // Eğer doğrudan enjekte ettiğimiz butona tıklandıysa Instagram'a gitmesine izin ver
            if (e.target.classList.contains('mobil-book-btn')) {
                return;
            }
            
            // Yoksa kapağa ilk tıklamada linki durdur ve alt paneli aç
            e.preventDefault(); 
            
            if (book.classList.contains('active-pop')) {
                // Eğer zaten açıksa ve tekrar kapağa dokunduysa kapat
                book.classList.remove('active-pop');
                activeBook = null;
            } else {
                // Başka açık panel varsa kapat, yenisini aç
                books.forEach(b => b.classList.remove('active-pop'));
                book.classList.add('active-pop');
                activeBook = book;
            }
        });
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
