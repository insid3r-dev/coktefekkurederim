// ==========================================================
// SEÇİCİLER VE AYARLAR
// ==========================================================
const books = document.querySelectorAll('.book');
const MAX_SCALE = 1.25;
let activeBook = null; // Şu an aktif olan (açık) kitabı hafızada tutar

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
// GELİŞMİŞ FARE HAREKET VE ARKA PLAN KORUMA MOTORU
// ==========================================================
function handleMove(e) {
    if (window.innerWidth <= 700) {
        resetEffects();
        return;
    }

    const clientX = e.clientX;
    const clientY = e.clientY;

    // 🛡️ KRİTİK KORUMA: Eğer fare şu an bir açıklama kutusunun veya içindeki yazının üzerindeyse,
    // arkadaki kapakların tetiklenmesini tamamen engelle ve mevcut pencereyi açık tut.
    if (e.target.closest('.book-intro')) {
        return; 
    }

    let insideAnyBook = false;

    books.forEach(book => {
        const r = book.getBoundingClientRect();

        // Farenin sadece kapak görselinin üzerinde olup olmadığını kontrol et
        const isMouseOverBook = (
            clientX >= r.left && 
            clientX <= r.right && 
            clientY >= r.top && 
            clientY <= r.bottom
        );

        if (isMouseOverBook) {
            insideAnyBook = true;
            
            // Eğer yeni bir kapağa geçildiyse eskisini pürüzsüzce kapat
            if (activeBook && activeBook !== book) {
                activeBook.classList.remove('active-pop');
                activeBook.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
                const oldImg = activeBook.querySelector("img");
                if (oldImg) oldImg.style.filter = "brightness(1)";
            }

            activeBook = book;
            book.classList.add('active-pop');

            // 3D Esneme Hesaplamaları
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

    // Eğer fare hiçbir kapağın üzerinde değilse ve bir pencerenin içinde de değilse her şeyi sıfırla
    if (!insideAnyBook && activeBook) {
        resetEffects();
    }
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

// Fare hareketlerini ve sayfadan ayrılma durumunu dinle
window.addEventListener('mousemove', handleMove);
window.addEventListener('mouseleave', resetEffects);
