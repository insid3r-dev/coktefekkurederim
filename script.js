// ==========================================================
// SEÇİCİLER VE AYARLAR
// ==========================================================
const books = document.querySelectorAll('.book');
const MAX_SCALE = 1.25;

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
// GİRİŞ ANİMASYONU MOTORU
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

    // MOBİL BUTON ENJEKSİYONU
    books.forEach(book => {
        const intro = book.querySelector('.book-intro');
        if (!intro) return;
        
        const instagramUrl = book.getAttribute('href') || 'https://www.instagram.com/coktefekkurederim/';
        const img = book.querySelector("img");
        const lang = img ? img.alt : "Türkçe";

        let buttonText = "Ücretsiz İndir →";

        switch(lang){
            case "Türkçe": buttonText = "Ücretsiz İndir →"; break;
            case "English": buttonText = "Download Free →"; break;
            case "Español": buttonText = "Descargar Gratis →"; break;
            case "Русский": buttonText = "Скачать бесплатно →"; break;
            case "Deutsch": buttonText = "Kostenlos herunterladen →"; break;
            case "Português": buttonText = "Baixar Grátis →"; break;
        }
        
        if (!intro.querySelector('.mobil-book-btn')) {
            const btn = document.createElement('a');
            btn.href = instagramUrl;
            btn.target = "_blank";
            btn.className = "mobil-book-btn";
            btn.innerText = buttonText;
            
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
});

// ==========================================================
// FARE HAREKETLERİ VE AÇIKLAMA KUTUSU MOTORU
// ==========================================================
if (window.innerWidth > 700) {
    books.forEach(book => {
        book.addEventListener('mousemove', (e) => {
            // Diğer tüm kitaplardaki aktiflik sınıfını temizle, sadece buna ekle
            books.forEach(b => { if (b !== book) b.classList.remove('active-pop'); });
            book.classList.add('active-pop');

            // 3D Büyüme ve Eğilme Efekti Hesabı
            const rect = book.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            
            const angleX = (yc - y) / 10;
            const angleY = (x - xc) / 10;
            
            book.style.transform = `scale(${MAX_SCALE}) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            
            const img = book.querySelector('img');
            if (img) img.style.filter = "brightness(1.1)";
        });

        book.addEventListener('mouseleave', () => {
            // Fare ayrıldığında sınıfı kaldır ve eski haline döndür
            book.classList.remove('active-pop');
            book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
            const img = book.querySelector('img');
            if (img) img.style.filter = "brightness(1)";
        });
    });
} else {
    // Mobil cihazlar için tıklama kontrolü
    books.forEach(book => {
        book.addEventListener('click', (e) => {
            if (!book.classList.contains('active-pop')) {
                e.preventDefault();
                books.forEach(b => b.classList.remove('active-pop'));
                book.classList.add('active-pop');
            }
        });
    });
}

// Ekranda boş bir yere dokunulduğunda paneli kapatma koruması
document.addEventListener('click', (e) => {
    if (!e.target.closest('.book')) {
        books.forEach(b => b.classList.remove('active-pop'));
    }
});
