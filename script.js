// ==========================================================
// SEÇİCİLER VE AYARLAR
// ==========================================================
const books = document.querySelectorAll('.book');
const MAX_SCALE = 1.25;
let activeBook = null; // Şu an aktif olan kitabı hafızada tutar

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
});

// ==========================================================
// FARE HAREKET VE KİLİTLEME MOTORU
// ==========================================================
function handleMove(clientX, clientY) {
    if (window.innerWidth <= 700) {
        resetEffects();
        return;
    }

    books.forEach(book => {
        const r = book.getBoundingClientRect();
        const intro = book.querySelector('.book-intro');
        let isMouseOverIntro = false;

        // Açıklama penceresinin koordinatlarını kontrol et
        if (intro) {
            const introRect = intro.getBoundingClientRect();
            isMouseOverIntro = (
                clientX >= introRect.left && 
                clientX <= introRect.right && 
                clientY >= introRect.top && 
                clientY <= introRect.bottom &&
                book.classList.contains('active-pop') // Sadece açık olan pencereyi yakala
            );
        }

        // Fare kapağın VEYA açıklama penceresinin üzerindeyse
        const isMouseOverBook = (
            clientX >= r.left && 
            clientX <= r.right && 
            clientY >= r.top && 
            clientY <= r.bottom
        );

        if (isMouseOverBook || isMouseOverIntro) {
            activeBook = book;
            book.classList.add('active-pop');

            let scale = MAX_SCALE;
            let lift = 25;
            let rx = 0;
            let ry = 0;

            // Fare eğer sadece kapağın üzerindeyse 3D esnemeyi yap
            if (isMouseOverBook) {
                const mouseX = clientX - r.left;
                const mouseY = clientY - r.top;
                rx = -(mouseY - r.height / 2) / 12;
                ry = (mouseX - r.width / 2) / 10;
            } else {
                // Fare yazı alanına (pencereye) geçtiğinde 3D esnemeyi sabit tut (titremeyi önler)
                rx = 0;
                ry = 0;
            }

            book.style.transform = `
                translateY(-${lift}px)
                scale(${scale})
                rotateX(${rx}deg)
                rotateY(${ry}deg)
            `;
            
            const img = book.querySelector("img");
            if (img) img.style.filter = "brightness(1.15)";
        } else {
            // Fare iki alandan da çıktıysa bu kitabın efektlerini temizle
            if (book === activeBook) {
                book.classList.remove('active-pop');
                book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
                const img = book.querySelector("img");
                if (img) img.style.filter = "brightness(1)";
                activeBook = null;
            }
        }
    });
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

window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
window.addEventListener('mouseleave', resetEffects);
