/* ==========================================================
   ÇOK TEFEKKÜR EDERİM - Premium Engine
========================================================== */

const dock = document.querySelector(".dock");
const books = [...document.querySelectorAll(".book")];

const MAX_SCALE = 1.70;
const NEAR_SCALE = 1.35;
const FAR_SCALE = 1.15;

// Apple Dock Hareketi ve 3D Tilt Entegrasyonu
dock.addEventListener("mousemove", (e) => {
    books.forEach(book => {
        const r = book.getBoundingClientRect();
        const center = r.left + r.width / 2;
        const distance = Math.abs(e.clientX - center);

        let scale = 1;
        let lift = 0;

        if (distance < 70) {
            scale = MAX_SCALE;
            lift = 45;
        } else if (distance < 140) {
            scale = NEAR_SCALE;
            lift = 25;
        } else if (distance < 230) {
            scale = FAR_SCALE;
            lift = 12;
        } else {
            scale = 1;
            lift = 0;
        }

        const mouseX = e.clientX - r.left;
        const mouseY = e.clientY - r.top;

        const rx = -(mouseY - r.height / 2) / 12;
        const ry = (mouseX - r.width / 2) / 10;

        book.style.transform = `
            translateY(-${lift}px)
            scale(${scale})
            rotateX(${rx}deg)
            rotateY(${ry}deg)
        `;
    });
});

dock.addEventListener("mouseleave", () => {
    books.forEach(book => {
        book.style.transform = "";
    });
});

// Kitap Kapak Parlamaları
books.forEach(book => {
    const img = book.querySelector("img");

    book.addEventListener("mousemove", (e) => {
        const rect = book.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        img.style.filter = `
            brightness(1.15)
            drop-shadow(0 20px 40px rgba(212,175,55,.35))
        `;

        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        img.style.background = `
            radial-gradient(circle at ${glowX}% ${glowY}%,
            rgba(255,230,150,.25),
            transparent 60%)
        `;
    });

    book.addEventListener("mouseleave", () => {
        img.style.filter = "drop-shadow(0 15px 35px rgba(0,0,0,0.5))";
        img.style.background = "transparent";
    });
});

/* ==========================================================
   DİNAMİK ALTIN TOZLARI MOTORU (RÜZGARLI & ÇOĞALTILMIŞ)
========================================================== */
function createGoldDust() {
    const container = document.getElementById("goldDust");
    if(!container) return;
    
    // Toz miktarını daha yoğun ama göz yormayacak şekilde 50'ye çıkardık
    const dustCount = 50; 
    
    for (let i = 0; i < dustCount; i++) {
        const dust = document.createElement("div");
        dust.classList.add("dust");
        
        // Rastgele boyutlar (2px - 5px arası)
        const size = Math.random() * 3 + 2; 
        dust.style.width = `${size}px`;
        dust.style.height = `${size}px`;
        
        // Ekranın yatayında rastgele başlangıç noktası
        dust.style.left = `${Math.random() * 100}vw`;
        
        // Hepsi aynı anda çıkmasın diye gecikme süreleri
        const delay = Math.random() * 14;
        dust.style.animationDelay = `${delay}s`;
        
        // Havada kalma ve savrulma hızları (farklı rüzgar etkileri hissi için)
        const duration = Math.random() * 6 + 10; // 10s - 16s arası
        dust.style.animationDuration = `${duration}s`;
        
        container.appendChild(dust);
    }
}

// Sayfa yüklendiğinde altın tozlarını başlat
window.addEventListener("DOMContentLoaded", createGoldDust);
