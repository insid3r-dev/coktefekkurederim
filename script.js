// ==========================================================
// SEÇİCİLER VE AYARLAR
// ==========================================================
const books = document.querySelectorAll('.book');
const MAX_SCALE = 1.25;

// MÜZİK MOTORU AYARLARI
const musicBtn = document.querySelector('.music-btn');
// Eğer HTML içinde bir <audio id="bg-music"> elementiniz varsa onu seçer, yoksa arka planda oluşturur
let bgMusic = document.getElementById('bg-music');

if (!bgMusic) {
    bgMusic = new Audio('muzik.mp3'); // Müzik dosyanızın adı/yolu
    bgMusic.id = 'bg-music';
    bgMusic.loop = true; // Müziğin sürekli başa sarıp çalması için
    document.body.appendChild(bgMusic);
}

// Müzik Butonuna Tıklama Olayı
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicBtn.innerHTML = '🎵 Müziği Durdur';
                musicBtn.classList.add('playing');
            }).catch(err => {
                console.log("Müzik çalınamadı, tarayıcı izni gerekiyor:", err);
            });
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
            
            // Bilgisayarda sihirli ışık ve iniş transform ayarı
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
                // Mobilde direkt temiz duruşa sabitlenir
                book.style.transform = "none";
            }
        }, 100 * (index + 1)); // Her kitap bir öncekinden 100ms sonra iner
    });
});


// ==========================================================
// ANA HAREKET MOTORU (Masaüstü Tekli Büyüme ve Mobil Sabitleme)
// ==========================================================
function handleMove(clientX, clientY) {
    // MOBİL KORUMASI: Telefon ekranlarında hiçbir büyüme veya titreme yaptırma
    if (window.innerWidth <= 700) {
        resetEffects();
        return;
    }

    books.forEach(book => {
        const r = book.getBoundingClientRect();
        
        // Farenin tam olarak bu kapağın sınırları içinde olup olmadığının kontrolü
        const isMouseOver = (
            clientX >= r.left && 
            clientX <= r.right && 
            clientY >= r.top && 
            clientY <= r.bottom
        );

        let scale = 1;
        let lift = 0;
        let rx = 0;
        let ry = 0;

        // Sadece farenin üzerinde olduğu tek bir kapak asilce öne çıkar
        if (isMouseOver) {
            scale = MAX_SCALE;
            lift = 30;
            
            const mouseX = clientX - r.left;
            const mouseY = clientY - r.top;
            rx = -(mouseY - r.height / 2) / 12;
            ry = (mouseX - r.width / 2) / 10;
        }

        // Değerleri pürüzsüzce uygula
        book.style.transform = `
            translateY(-${lift}px)
            scale(${scale})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
        `;
        
        const img = book.querySelector("img");
        if (img) {
            img.style.filter = isMouseOver ? "brightness(1.15)" : "brightness(1)";
        }
    });
}

function resetEffects() {
    books.forEach(book => {
        if (window.innerWidth <= 700) {
            book.style.transform = "none";
        } else {
            book.style.transform = "translateY(0) scale(1) rotateX(0) rotateY(0)";
        }
        const img = book.querySelector("img");
        if (img) img.style.filter = "brightness(1)";
    });
}

// Fare Dinleyicileri
window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
window.addEventListener('mouseleave', resetEffects);

// Dokunmatik Ekran Dinleyicileri
window.addEventListener('touchmove', (e) => {
    if(e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
});
window.addEventListener('touchend', resetEffects);
