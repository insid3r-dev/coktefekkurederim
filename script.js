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

/* ==========================================================
   TEMA SEÇİCİ BUTONU
========================================================== */

const btn=document.getElementById("palette-btn");
const menu=document.getElementById("theme-menu");

btn.onclick=()=>{

    menu.classList.toggle("show");

}

document.querySelectorAll(".theme-color").forEach(color=>{

    color.onclick=()=>{

        const theme=color.dataset.theme;

        document.body.dataset.theme=theme;

        localStorage.setItem("theme",theme);

    }

});

const saved=localStorage.getItem("theme");

if(saved){

    document.body.dataset.theme=saved;

}

/* ==========================================================
========================================================== */
/* ==========================================================
  YAN PANELLLLL
========================================================== */

/* ==========================================================
  YAN PANEL BUTONU ÜZERİNDE DÖNEN IŞIK 
========================================================== */



document.querySelectorAll(".frame-btn").forEach(btn=>{

    let t = 0;
    let raf = null;

    function loop(){

        const w = btn.offsetWidth;
        const h = btn.offsetHeight;

        const r = 18;
        const offset = 2;

        const p = t % 1;

        let x, y;

        if(p < 0.25){

            const k = p / 0.25;

            x = r + k * (w - r * 2);
            y = -offset;

        }else if(p < 0.5){

            const k = (p - 0.25) / 0.25;

            x = w + offset;
            y = r + k * (h - r * 2);

        }else if(p < 0.75){

            const k = (p - 0.5) / 0.25;

            x = w - r - k * (w - r * 2);
            y = h + offset;

        }else{

            const k = (p - 0.75) / 0.25;

            x = -offset;
            y = h - r - k * (h - r * 2);

        }

        btn.style.setProperty("--lx", x + "px");
        btn.style.setProperty("--ly", y + "px");

        btn.style.setProperty(
            "--rot",
            (Math.atan2(
                Math.sin(t * Math.PI * 2),
                Math.cos(t * Math.PI * 2)
            ) * 180 / Math.PI) + "deg"
        );

        t += 0.0035;

        raf = requestAnimationFrame(loop);

    }

    btn.addEventListener("mouseenter",()=>{

        cancelAnimationFrame(raf);
        loop();

    });

    btn.addEventListener("mouseleave",()=>{

        cancelAnimationFrame(raf);

    });

});

/* ===============Butona  basınca diğer page-home ögelerini sakla======================= */
function showPage(id){

    document.querySelectorAll("section").forEach(page=>{

        page.hidden=true;

    });

    document.getElementById(id).hidden=false;

}

/* ===============yan panel butonları======================= */
const buttons=document.querySelectorAll(".frame-btn");

buttons[0].onclick=()=>showPage("home-page");

buttons[1].onclick=()=>showPage("about-page");

buttons[2].onclick=()=>showPage("books-page");

buttons[3].onclick=()=>showPage("contact-page");






/* ==========================================================
   PREMIUM ALTIN TOZU MOTORU v2.0
========================================================== */

const dustContainer = document.querySelector(".gold-dust-container");

const DUST_COUNT =
    window.innerWidth < 700 ? 45 : 80;

for (let i = 0; i < DUST_COUNT; i++) {

    const dust = document.createElement("div");
    dust.className = "dust";

    // Boyut
    const size = Math.random() * 4 + 2;
    dust.style.width = size + "px";
    dust.style.height = size + "px";

    // Başlangıç konumu
    dust.style.left = Math.random() * 100 + "%";

    // Her parçacığın farklı animasyon süresi
    dust.style.setProperty(
        "--speed",
        (10 + Math.random() * 10) + "s"
    );

    // Farklı parıltı süresi
    dust.style.setProperty(
        "--sparkle",
        (1.8 + Math.random() * 3) + "s"
    );

    // Farklı başlangıç zamanı
    dust.style.animationDelay =
        -(Math.random() * 20) + "s";

    // Hafif farklı opaklık
    dust.style.opacity =
        0.25 + Math.random() * 0.75;

    dustContainer.appendChild(dust);
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
                
               
                intro.prepend(btn);
            }
        });
    }
);
// ==========================================================

// ==========================================================



// ==========================================================
// YAN PANEL TIKLAMA İŞLEMLERİ
// ==========================================================

document.querySelectorAll(".frame-btn").forEach(btn=>{

btn.addEventListener("click",e=>{

btn.classList.remove("clicked");

void btn.offsetWidth;

btn.classList.add("clicked");

const r=btn.getBoundingClientRect();

for(let i=0;i<26;i++){

const p=document.createElement("div");

p.className="spark";

p.style.left=(r.left+r.width/2)+"px";
p.style.top=(r.top+r.height/2)+"px";

const a=Math.random()*Math.PI*2;
const d=40+Math.random()*50;

p.style.setProperty("--x",Math.cos(a)*d+"px");
p.style.setProperty("--y",Math.sin(a)*d+"px");

document.body.appendChild(p);

setTimeout(()=>p.remove(),900);

}

});

});

// ==========================================================






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
                activeBook.style.transform = "translateY(0) scale(1)";
                const oldImg = activeBook.querySelector("img");
                if (oldImg) oldImg.style.filter = "brightness(1)";
            }

            activeBook = book;
            book.classList.add('active-pop');



            book.style.transform = `
                translateY(-25px)
                scale(${MAX_SCALE})

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
