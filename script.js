/* ==========================================================
   ÇOK TEFEKKÜR EDERİM
   Mac Dock Animation v1
========================================================== */

const dock = document.querySelector(".dock");
const books = [...document.querySelectorAll(".book")];

const MAX_SCALE = 1.65;
const MIN_SCALE = 1;
const EFFECT_DISTANCE = 260;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

dock.addEventListener("mousemove", (e) => {

    const mouseX = e.clientX;

    books.forEach(book => {

        const rect = book.getBoundingClientRect();

        const center = rect.left + rect.width / 2;

        const distance = Math.abs(mouseX - center);

        let influence = 1 - Math.min(distance / EFFECT_DISTANCE, 1);

        influence = influence * influence;

        const scale = lerp(MIN_SCALE, MAX_SCALE, influence);

        const lift = influence * 28;

        book.style.transform =
            `translateY(-${lift}px) scale(${scale})`;

        const shadow = 20 + influence * 35;

        book.style.filter =
            `drop-shadow(0 ${shadow}px ${shadow}px rgba(0,0,0,.45))`;

    });

});

dock.addEventListener("mouseleave", () => {

    books.forEach(book => {

        book.style.transform = "scale(1)";

        book.style.filter =
            "drop-shadow(0 15px 20px rgba(0,0,0,.35))";

    });

});

/* ==========================================================
   BÖLÜM 2
   3D Tilt + Gold Light + Perspective
========================================================== */

books.forEach(book => {

    const img = book.querySelector("img");

    book.addEventListener("mousemove", (e) => {

        const rect = book.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = (x - centerX) / 8;
        const rotateX = -(y - centerY) / 10;

        book.style.transform += `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

        img.style.filter = `
            brightness(1.12)
            drop-shadow(0 18px 35px rgba(212,175,55,.45))
        `;

        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        img.style.background = `
            radial-gradient(circle at ${glowX}% ${glowY}%,
            rgba(255,230,150,.28),
            transparent 55%)
        `;

    });

    book.addEventListener("mouseleave", () => {

        img.style.filter =
            "drop-shadow(0 15px 25px rgba(0,0,0,.35))";

        img.style.background = "transparent";

    });

});

/* ============================================
   APPLE DOCK ENGINE
============================================ */

const dock = document.querySelector(".dock");
const books = [...document.querySelectorAll(".book")];

const MAX_SCALE = 1.75;
const NEAR_SCALE = 1.35;
const FAR_SCALE = 1.15;

const RADIUS = 320;

dock.addEventListener("mousemove",(e)=>{

    books.forEach(book=>{

        const r = book.getBoundingClientRect();

        const center = r.left + r.width/2;

        const distance = Math.abs(e.clientX-center);

        let scale=1;
        let lift=0;

        if(distance<70){

            scale=MAX_SCALE;
            lift=42;

        }

        else if(distance<140){

            scale=NEAR_SCALE;
            lift=25;

        }

        else if(distance<230){

            scale=FAR_SCALE;
            lift=12;

        }

        else{

            scale=1;
            lift=0;

        }

        //--------------------------------

        const mouseX=e.clientX-r.left;
        const mouseY=e.clientY-r.top;

        const rx=-(mouseY-r.height/2)/12;
        const ry=(mouseX-r.width/2)/10;

        //--------------------------------

        book.style.transform=
        `
        translateY(-${lift}px)
        scale(${scale})
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        `;

    });

});

dock.addEventListener("mouseleave",()=>{

    books.forEach(book=>{

        book.style.transform="";

    });

});