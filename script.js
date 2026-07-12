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
// YAN PANEL TIKLAMA İLE IŞIĞIN YAN PANEL ÇERÇEVESİNDE DOLAŞMASI
// ==========================================================

document.querySelectorAll(".frame-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        const old=btn.querySelector(".frame-light");

        if(old) old.remove();

        const light=document.createElement("div");

        light.className="frame-light";

        btn.appendChild(light);

        const w=btn.offsetWidth;
        const h=btn.offsetHeight;

        const p=2;

        const top=w;
        const right=h;
        const bottom=w;
        const left=h;

        const total=top+right+bottom+left;

        let start=null;
            let lastX=0;
            let lastY=0;

        function animate(t){

            if(!start) start=t;

            const progress=Math.min((t-start)/900,1);

            const d=progress*total;

            let x,y;

            if(d<top){

                x=p+d;
                y=p;

            }else if(d<top+right){

                x=w-p;
                y=p+(d-top);

            }else if(d<top+right+bottom){

                x=w-p-(d-top-right);
                y=h-p;

            }else{

                x=p;
                y=h-p-(d-top-right-bottom);

            }

            light.style.left=x+"px";
            light.style.top=y+"px";
            light.style.opacity=1;

            const angle=Math.atan2(y-lastY,x-lastX);

            light.style.transform=
            `translate(-50%,-50%) rotate(${angle}rad)`;

            lastX=x;
            lastY=y;

            if(progress<1){

                requestAnimationFrame(animate);

            }else{

                light.remove();

            }

        }

        requestAnimationFrame(animate);

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
