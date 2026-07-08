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
                if (img) img.style.transform = "translateZ(30px)";
            }
        }, index * 150);
    });
});

// ==========================================================
// MASAÜSTÜ VE MOBİL ETKİLEŞİM MOTORU
// ==========================================================
if (window.innerWidth <= 700) {
    books.forEach(book => {
        book.addEventListener('click', (e) => {
            const intro = book.querySelector('.book-intro');
            const lang = book.getAttribute('data-lang') || "Türkçe";
            
            // Dil bazlı buton metinleri
            let buttonText = "Ücretsiz İndir →";
            if(lang === "English") buttonText = "Download Free →";
            else if(lang === "Español") buttonText = "Descargar Gratis →";
            else if(lang === "Русский") buttonText = "Скачать Бесплатно →";
            else if(lang === "Deutsch") buttonText = "Kostenlos Herunterladen →";
            else if(lang === "Porteguês") buttonText = "Baixar Grátis →";

            // HTML tarafında verdiğimiz yerel PDF linkini doğrudan çekiyoruz
            const pdfUrl = book.getAttribute('href');

            // Eğer buton daha önce oluşturulmadıysa oluştur ve ekle
            if (intro && !intro.querySelector('.mobil-book-btn')) {
                const btn = document.createElement('a');
                btn.href = pdfUrl; // turkce.pdf, german.pdf vb. hedefi tam olarak açar
                btn.target = "_blank";
                btn.className = "mobil-book-btn";
                btn.innerText = buttonText;
                intro.appendChild(btn);
            }

            // Eğer alt panel açıkken kullanıcı "Ücretsiz İndir" butonuna basarsa linke gitmesine izin ver
            if (e.target.classList.contains('mobil-book-btn')) {
                return;
            }
            
            // Kapağa ilk dokunuşta varsayılan link zıplamasını engelle ve sadece paneli aç
            e.preventDefault(); 
            
            if (book.classList.contains('active-pop')) {
                book.classList.remove('active-pop');
                activeBook = null;
            } else {
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
    // Masaüstü 3D Eğilme (Tilt) ve Fare Takip Mekanizması
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', resetEffects);
}

function handleMove(e) {
    if (window.innerWidth <= 700) return;
    
    books.forEach(book => {
        const rect = book.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
        
        if (isInside) {
            activeBook = book;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((centerY - y) / centerY) * 25;
            const rotateY = ((x - centerX) / centerX) * 25;
            
            book.style.transform = `translateY(-15px) scale(${MAX_SCALE}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            book.style.zIndex = "10";
            
            const intro = book.querySelector('.book-intro');
            if (intro) {
                intro.style.opacity = "1";
                intro.style.pointerEvents = "auto";
                intro.style.transform = "translateY(0) scale(1)";
            }
        } else if (activeBook === book) {
            book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
            book.style.zIndex = "1";
            
            const intro = book.querySelector('.book-intro');
            if (intro) {
                intro.style.opacity = "0";
                intro.style.pointerEvents = "none";
                intro.style.transform = "translateY(10px) scale(0.95)";
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
            book.style.zIndex = "1";
            
            const intro = book.querySelector('.book-intro');
            if (intro) {
                intro.style.opacity = "0";
                intro.style.pointerEvents = "none";
                intro.style.transform = "translateY(10px) scale(0.95)";
            }
        }
    });
    activeBook = null;
}
