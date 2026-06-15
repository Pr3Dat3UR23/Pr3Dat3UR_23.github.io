// Animation de défilement fluide
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Effet de parallaxe sur le header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const scrolled = window.pageYOffset;
  header.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Gestion du formulaire de contact
function handleSubmit(event) {
  event.preventDefault();
  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simuler l'envoi du formulaire
  alert(`Message envoyé par ${nom} (${email}):\n${message}`);
  document.querySelector(".contact-form").reset();
}

// Carousel projets
let currentSlide = 0;
const totalSlides = 4;

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const dots = document.querySelectorAll('.dot');
    if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

// Navigation clavier pour le carousel
document.addEventListener('keydown', (e) => {
    if (document.querySelector('.carousel-track')) {
        if (e.key === 'ArrowLeft') moveCarousel(-1);
        if (e.key === 'ArrowRight') moveCarousel(1);
    }
});

// Swipe tactile
let touchStartX = 0;
document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) moveCarousel(diff > 0 ? 1 : -1);
});

// Statistiques GitHub
async function fetchGitHubStats() {
  try {
    const response = await fetch("https://api.github.com/users/Pr3Dat3UR23");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const stats = document.querySelectorAll(".github-stats .stat-item");
    if (stats.length > 0) {
      stats[0].querySelector(".stat-number").textContent =
        data.public_repos || "N/A";
      stats[0].querySelector(".stat-label").textContent = "Projets GitHub";
    }
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
  }
}
fetchGitHubStats();

// ================================================================
// HERO — Starfield canvas
// ================================================================
(function initHeroStarfield() {
    const canvas = document.getElementById('hero-starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 180;
    const colorMap = { '#ffffff': [255,255,255], '#a0d0ff': [160,208,255], '#ffe8b0': [255,232,176] };
    const stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random(), y: Math.random(),
        r: Math.random() * 1.4 + 0.15,
        speed: Math.random() * 0.00012 + 0.00003,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.035 + 0.008,
        color: Math.random() < 0.15 ? '#a0d0ff' : Math.random() < 0.1 ? '#ffe8b0' : '#ffffff',
    }));

    (function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const W = canvas.width, H = canvas.height;
        stars.forEach(s => {
            s.twinkle += s.twinkleSpeed;
            const alpha = 0.35 + 0.65 * Math.abs(Math.sin(s.twinkle));
            const [r, g, b] = colorMap[s.color] || [255,255,255];
            ctx.beginPath();
            ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fill();
            s.y += s.speed;
            if (s.y > 1) s.y = 0;
        });
        requestAnimationFrame(draw);
    })();
})();

// ================================================================
// PASSIONS — Starfield canvas
// ================================================================
(function initStarfield() {
    const canvas = document.getElementById('starfield-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const STAR_COUNT = 220;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 1.6 + 0.2,
        speed: Math.random() * 0.00015 + 0.00005,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.04 + 0.01,
        color: Math.random() < 0.15 ? '#a0d0ff' : Math.random() < 0.1 ? '#ffe8b0' : '#ffffff',
    }));

    const shootingStars = [];
    function spawnShootingStar() {
        if (Math.random() < 0.3) {
            shootingStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                len: Math.random() * 120 + 60,
                speed: Math.random() * 6 + 4,
                angle: Math.PI / 5,
                life: 1,
            });
        }
        setTimeout(spawnShootingStar, Math.random() * 4000 + 2000);
    }
    spawnShootingStar();

    let raf;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const W = canvas.width, H = canvas.height;

        const colorMap = { '#ffffff': [255,255,255], '#a0d0ff': [160,208,255], '#ffe8b0': [255,232,176] };
        stars.forEach(s => {
            s.twinkle += s.twinkleSpeed;
            const alpha = 0.4 + 0.6 * Math.abs(Math.sin(s.twinkle));
            const [r, g, b] = colorMap[s.color] || [255,255,255];
            ctx.beginPath();
            ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.fill();
            s.y += s.speed;
            if (s.y > 1) s.y = 0;
        });

        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            const ex = ss.x + Math.cos(ss.angle) * ss.len;
            const ey = ss.y + Math.sin(ss.angle) * ss.len;
            const grad = ctx.createLinearGradient(ss.x, ss.y, ex, ey);
            grad.addColorStop(0, `rgba(255,255,255,0)`);
            grad.addColorStop(1, `rgba(200,230,255,${ss.life * 0.8})`);
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ex, ey);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.life -= 0.015;
            if (ss.life <= 0) shootingStars.splice(i, 1);
        }

        raf = requestAnimationFrame(draw);
    }
    draw();
})();

// ================================================================
// Pluie de 0/1 — fonction partagée
// ================================================================
function spawnBinaryRain(originX, originY) {
    const count = 4 + Math.floor(Math.random() * 3); // 4 à 6

    for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'binary-particle';
        span.textContent = Math.random() < 0.5 ? '0' : '1';

        const dx    = (Math.random() - 0.5) * 80;
        const fall  = window.innerHeight - originY + 60;
        const dur   = (2.2 + Math.random() * 0.9).toFixed(2) + 's';
        const delay = (Math.random() * 0.14).toFixed(2) + 's';

        span.style.left  = originX + 'px';
        span.style.top   = originY + 'px';
        span.style.setProperty('--dx',   dx   + 'px');
        span.style.setProperty('--fall', fall + 'px');
        span.style.setProperty('--dur',  dur);
        span.style.animationDelay = delay;

        document.body.appendChild(span);
        span.addEventListener('animationend', () => span.remove());
    }
}

// ================================================================
// PHOTO — Canvas de dessin
// ================================================================
(function initDrawCanvas() {
    const wrapper  = document.querySelector('.profile-wrapper');
    const canvas   = document.getElementById('draw-canvas');
    const toggle   = document.getElementById('draw-toggle');
    const clearBtn = document.getElementById('draw-clear');
    const swatches = document.querySelectorAll('.color-swatch');
    if (!canvas || !toggle) return;

    const eraserBtn = document.getElementById('draw-eraser');
    const ctx = canvas.getContext('2d');
    let drawing   = false;
    let drawMode  = false;
    let eraserMode = false;
    let color     = '#00d4ff';

    function syncSize() {
        const r = wrapper.getBoundingClientRect();
        canvas.width  = r.width;
        canvas.height = r.height;
    }
    syncSize();
    window.addEventListener('resize', () => { syncSize(); });

    function getPos(e) {
        const r   = canvas.getBoundingClientRect();
        const src = e.touches ? e.touches[0] : e;
        return {
            x: (src.clientX - r.left) * (canvas.width  / r.width),
            y: (src.clientY - r.top)  * (canvas.height / r.height),
        };
    }

    function startDraw(e) {
        if (!drawMode) return;
        e.preventDefault();
        drawing = true;
        const p = getPos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
    }

    function moveDraw(e) {
        if (!drawing) return;
        e.preventDefault();
        const p = getPos(e);
        ctx.lineTo(p.x, p.y);
        ctx.globalCompositeOperation = eraserMode ? 'destination-out' : 'source-over';
        ctx.strokeStyle = eraserMode ? 'rgba(0,0,0,1)' : color;
        ctx.lineWidth   = eraserMode ? 18 : 3;
        ctx.lineCap     = 'round';
        ctx.lineJoin    = 'round';
        ctx.stroke();
    }

    function stopDraw() { drawing = false; }

    canvas.addEventListener('mousedown',  startDraw);
    canvas.addEventListener('mousemove',  moveDraw);
    canvas.addEventListener('mouseup',    stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove',  moveDraw,  { passive: false });
    canvas.addEventListener('touchend',   stopDraw);

    function setTool(pen) {
        eraserMode = !pen;
        drawMode   = true;
        canvas.classList.add('draw-active');
        canvas.style.cursor = pen ? 'crosshair' : 'cell';
        toggle.classList.toggle('active', pen);
        eraserBtn.classList.toggle('active', !pen);
    }

    toggle.addEventListener('click', () => {
        if (!drawMode || eraserMode) { setTool(true); }
        else { drawMode = false; canvas.classList.remove('draw-active'); toggle.classList.remove('active'); }
    });

    eraserBtn.addEventListener('click', () => {
        if (!drawMode || !eraserMode) { setTool(false); }
        else { drawMode = false; canvas.classList.remove('draw-active'); eraserBtn.classList.remove('active'); }
    });

    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    swatches.forEach(sw => {
        sw.addEventListener('click', () => {
            color = sw.dataset.color;
            swatches.forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            setTool(true);
        });
    });
})();

// LOGO — clic sur "PORTFOLIO"
(function initLogoRain() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    logo.addEventListener('click', function () {
        const rect = logo.getBoundingClientRect();
        spawnBinaryRain(rect.left + rect.width / 2, rect.bottom + 2);
        window.unlockAchievement?.('binary_rain', '💾', 'Rain Man', 'Tu as fait pleuvoir du binaire.');
    });
})();

// HERO H1 — clic sur "Wylan CAUMETTE"
(function initHeroRain() {
    const h1 = document.querySelector('.hero h1');
    if (!h1) return;
    h1.addEventListener('click', function (e) {
        spawnBinaryRain(e.clientX, e.clientY);
        window.unlockAchievement?.('binary_rain', '💾', 'Rain Man', 'Tu as fait pleuvoir du binaire.');
    });
})();

// ================================================================
// WHEATLEY + SPACE CORE — zone spatiale (Portal 2)
// ================================================================
(function initSpaceZone() {
    const zone = document.querySelector('.passions-space-zone');
    if (!zone) return;

    // ── Wheatley ─────────────────────────────────────────────────
    const W_W = 70, W_H = 79;
    const DRIFT_SPEED = 16;
    const PANIC_SPEED = 75;
    const PANIC_DUR   = 3000;

    function makeSphère(id, labelTxt, eyeGradId, bodyGradId,
                        eyeStop1, eyeStop2, eyeStop3, auraColor,
                        irisId, pupilId, w, h) {
        const el = document.createElement('div');
        el.id = id;
        el.innerHTML = `
            <svg viewBox="0 0 80 90" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="${eyeGradId}" cx="35%" cy="28%" r="65%">
                        <stop offset="0%"   stop-color="${eyeStop1}"/>
                        <stop offset="50%"  stop-color="${eyeStop2}"/>
                        <stop offset="100%" stop-color="${eyeStop3}"/>
                    </radialGradient>
                    <radialGradient id="${bodyGradId}" cx="33%" cy="28%" r="72%">
                        <stop offset="0%"   stop-color="#626268"/>
                        <stop offset="100%" stop-color="#26262c"/>
                    </radialGradient>
                </defs>
                <circle cx="40" cy="54" r="32" fill="none" stroke="${auraColor}" stroke-width="8"/>
                <circle cx="40" cy="54" r="28" fill="url(#${bodyGradId})" stroke="#505058" stroke-width="1.5"/>
                <path d="M15 40 Q40 32 65 40" stroke="#363640" stroke-width="1.2" fill="none" opacity="0.9"/>
                <path d="M13 67 Q40 74 67 67" stroke="#363640" stroke-width="1.2" fill="none" opacity="0.9"/>
                <path d="M14 54 L66 54"       stroke="#363640" stroke-width="0.8" fill="none" opacity="0.5"/>
                <circle cx="20" cy="42" r="2" fill="#606068"/>
                <circle cx="60" cy="42" r="2" fill="#606068"/>
                <circle cx="20" cy="66" r="2" fill="#606068"/>
                <circle cx="60" cy="66" r="2" fill="#606068"/>
                <circle cx="40" cy="54" r="17" fill="#0e0e14" stroke="#1e1e28" stroke-width="1.5"/>
                <circle cx="40" cy="54" r="15" fill="#001230"/>
                <circle id="${irisId}"  cx="40" cy="54" r="12" fill="url(#${eyeGradId})"/>
                <circle id="${pupilId}" cx="40" cy="54" r="4.5" fill="#00040a"/>
                <circle cx="35" cy="49" r="3"   fill="white" opacity="0.32"/>
                <circle cx="46" cy="59" r="1.5" fill="white" opacity="0.15"/>
                <rect x="28" y="9"  width="24" height="5"  rx="2.5" fill="#484850" stroke="#585860" stroke-width="1"/>
                <rect x="35" y="12" width="10" height="14" rx="2.5" fill="#383840" stroke="#484850" stroke-width="1"/>
                <circle cx="30" cy="11.5" r="1.8" fill="#686870"/>
                <circle cx="50" cy="11.5" r="1.8" fill="#686870"/>
            </svg>
            <div class="${id}-label">${labelTxt}</div>
        `;
        return el;
    }

    // Wheatley — œil bleu
    const wEl = makeSphère('wheatley', 'Wheatley',
        'wEye', 'wBody',
        '#90dfff', '#0096e0', '#003870',
        'rgba(0,150,255,0.14)',
        'w-iris', 'w-pupil',
        W_W, W_H
    );
    zone.appendChild(wEl);
    const wIris  = wEl.querySelector('#w-iris');
    const wPupil = wEl.querySelector('#w-pupil');

    let xPx       = zone.offsetWidth  * 0.28;
    let yPx       = zone.offsetHeight * 0.38;
    let dirX      =  1;
    let dirY      = -1;
    let wPanic    = false;
    let wPanicT   = 0;

    function wBounds() {
        return { xMin: 15, xMax: zone.offsetWidth - W_W - 15,
                 yMin: 15, yMax: zone.offsetHeight - W_H - 15 };
    }

    const W_QUOTES = [
        'Je dérive...', 'Ah, bonjour !', '...Hein ?',
        'Qui est là ?', "C'est bon, je gère.", '...Hmm.'
    ];

    wEl.addEventListener('click', (e) => {
        e.stopPropagation();
        wPanic = true; wPanicT = 0;
        dirX *= -1; dirY *= -1;
        wEl.classList.add('wheatley--panic');
        showBubble(wEl, 'wheatley-bubble',
            W_QUOTES[Math.floor(Math.random() * W_QUOTES.length)]);
        window.unlockAchievement?.('wheatley_click', '🔵', 'Test résolu', 'Tu as perturbé Wheatley. Bien joué.');
    });

    // ── Space Core ───────────────────────────────────────────────
    const SC_W = 52, SC_H = 58;
    const ORBIT_R    = 78;          // rayon en px
    const ORBIT_NORM = 4500;        // ms par orbite (normal)
    const ORBIT_FAST = 900;         // ms par orbite (panique)
    const SC_PANIC_DUR = 2200;

    const scEl = makeSphère('spacecore', 'Space Core',
        'scEye', 'scBody',
        '#ffe066', '#ffaa00', '#7a4800',
        'rgba(255,170,0,0.14)',
        'sc-iris', 'sc-pupil',
        SC_W, SC_H
    );
    zone.appendChild(scEl);
    const scIris  = scEl.querySelector('#sc-iris');
    const scPupil = scEl.querySelector('#sc-pupil');

    let orbitAngle = 0;
    let scPanic    = false;
    let scPanicT   = 0;

    const SC_QUOTES = [
        'SPACEEEEEEEEEEE', "L'ESPAAAAAACE !",
        'SPACE SPACE SPACE !', 'REGARDEZ ! L\'ESPACE !',
        'JE SUIS DANS L\'ESPACE !', "C'EST DE L'ESPACE !"
    ];

    scEl.addEventListener('click', (e) => {
        e.stopPropagation();
        scPanic = true; scPanicT = 0;
        showBubble(scEl, 'spacecore-bubble',
            SC_QUOTES[Math.floor(Math.random() * SC_QUOTES.length)]);
        window.unlockAchievement?.('spacecore_click', '🚀', "SPACEEEEEEE !", 'Le Space Core est ravi de ta visite.');
    });

    // ── Bulle partagée ───────────────────────────────────────────
    function showBubble(parent, cls, txt) {
        const old = parent.querySelector('.' + cls);
        if (old) old.remove();
        const b = document.createElement('div');
        b.className = cls;
        b.textContent = txt;
        parent.appendChild(b);
        setTimeout(() => {
            b.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            b.style.opacity    = '0';
            b.style.transform  = 'translateX(-50%) translateY(-14px) scale(0.7)';
            setTimeout(() => b.remove(), 500);
        }, 1000);
    }

    // ── Tick partagé ─────────────────────────────────────────────
    let lastTs = null;

    function tick(ts) {
        if (!lastTs) lastTs = ts;
        const dt = Math.min(ts - lastTs, 50);
        lastTs = ts;

        // — Wheatley dérive —
        if (wPanic) {
            wPanicT += dt;
            if (wPanicT >= PANIC_DUR) { wPanic = false; wEl.classList.remove('wheatley--panic'); }
        }
        const wSpd = wPanic ? PANIC_SPEED : DRIFT_SPEED;
        const b = wBounds();
        xPx += dirX * wSpd * (dt / 1000);
        yPx += dirY * wSpd * (dt / 1000);
        if (xPx <= b.xMin) { xPx = b.xMin; dirX =  1; }
        if (xPx >= b.xMax) { xPx = b.xMax; dirX = -1; }
        if (yPx <= b.yMin) { yPx = b.yMin; dirY =  1; }
        if (yPx >= b.yMax) { yPx = b.yMax; dirY = -1; }
        wEl.style.left = xPx + 'px';
        wEl.style.top  = yPx + 'px';
        if (wIris)  { wIris.setAttribute('cx',  40 + dirX * 2.5); wIris.setAttribute('cy',  54 + dirY * 1.8); }
        if (wPupil) { wPupil.setAttribute('cx', 40 + dirX * 4);   wPupil.setAttribute('cy', 54 + dirY * 3);   }

        // — Space Core orbite —
        if (scPanic) {
            scPanicT += dt;
            if (scPanicT >= SC_PANIC_DUR) { scPanic = false; }
        }
        const period = scPanic ? ORBIT_FAST : ORBIT_NORM;
        orbitAngle  += (2 * Math.PI / period) * dt;

        const wcx  = xPx + W_W / 2;
        const wcy  = yPx + W_H / 2;
        const scL  = wcx + ORBIT_R * Math.cos(orbitAngle) - SC_W / 2;
        const scT  = wcy + ORBIT_R * Math.sin(orbitAngle) - SC_H / 2;
        scEl.style.left = scL + 'px';
        scEl.style.top  = scT + 'px';

        // Pupille regarde vers l'extérieur (l'espace !)
        const lx = Math.cos(orbitAngle), ly = Math.sin(orbitAngle);
        if (scIris)  { scIris.setAttribute('cx',  40 + lx * 2.5); scIris.setAttribute('cy',  54 + ly * 1.8); }
        if (scPupil) { scPupil.setAttribute('cx', 40 + lx * 4);   scPupil.setAttribute('cy', 54 + ly * 3);   }

        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
})();

// ================================================================
// POPOL — écureuil mascotte de la forêt
// ================================================================
(function initPopol() {
    const forest = document.querySelector('.passions-forest-zone');
    if (!forest) return;

    const SQUIRREL_W = 62;
    const SPEED      = 44; // px/s

    const el = document.createElement('div');
    el.id = 'popol';
    el.innerHTML = `
        <div class="popol-label">Popol</div>
        <svg viewBox="0 0 70 88" width="${SQUIRREL_W}" height="77" xmlns="http://www.w3.org/2000/svg">
            <!-- Queue (gauche, remonte) -->
            <path d="M20,78 Q-2,62 6,30 Q12,10 28,24 Q13,38 16,58 Q17,69 20,78Z" fill="#6b3d15">
                <animateTransform attributeName="transform" type="rotate"
                    values="0 18 76;11 18 76;0 18 76;-5 18 76;0 18 76"
                    dur="1.9s" repeatCount="indefinite"/>
            </path>
            <path d="M19,76 Q1,60 9,32 Q15,14 26,26 Q14,40 17,59 Q18,68 19,76Z" fill="#8b5522" opacity="0.5">
                <animateTransform attributeName="transform" type="rotate"
                    values="0 18 76;11 18 76;0 18 76;-5 18 76;0 18 76"
                    dur="1.9s" repeatCount="indefinite"/>
            </path>
            <!-- Corps -->
            <ellipse cx="40" cy="68" rx="20" ry="18" fill="#a86030"/>
            <!-- Ventre -->
            <ellipse cx="40" cy="70" rx="12" ry="12" fill="#d49060"/>
            <!-- Tête -->
            <circle cx="57" cy="50" r="17" fill="#a86030"/>
            <!-- Oreille gauche -->
            <ellipse cx="49" cy="35" rx="6" ry="8.5" fill="#a86030" transform="rotate(-18,49,35)"/>
            <ellipse cx="49" cy="35" rx="3.8" ry="5.8" fill="#e89090" transform="rotate(-18,49,35)"/>
            <!-- Oreille droite -->
            <ellipse cx="66" cy="34" rx="6" ry="8.5" fill="#a86030" transform="rotate(18,66,34)"/>
            <ellipse cx="66" cy="34" rx="3.8" ry="5.8" fill="#e89090" transform="rotate(18,66,34)"/>
            <!-- Grand œil kawaii -->
            <circle cx="64" cy="47" r="5.5" fill="#1a0800"/>
            <circle cx="66" cy="45" r="2"   fill="white"/>
            <circle cx="63" cy="49" r="1"   fill="#3a2000" opacity="0.4"/>
            <!-- Nez -->
            <ellipse cx="72" cy="55" rx="2.8" ry="2" fill="#cc7060"/>
            <!-- Joue rosée -->
            <ellipse cx="69" cy="51" rx="5" ry="3" fill="#e07060" opacity="0.25"/>
            <!-- Sourire -->
            <path d="M70,58 Q73,61 76,58" stroke="#884040" stroke-width="1.2" fill="none" stroke-linecap="round"/>
            <!-- Pattes avant -->
            <rect x="45" y="82" width="7" height="9" rx="3.5" fill="#884820"/>
            <rect x="54" y="82" width="7" height="9" rx="3.5" fill="#884820"/>
            <!-- Pattes arrière -->
            <rect x="29" y="81" width="7" height="9" rx="3.5" fill="#774018"/>
            <rect x="38" y="81" width="7" height="9" rx="3.5" fill="#774018"/>
        </svg>
    `;
    forest.appendChild(el);

    const SPEED_X      = 42;
    const SPEED_Y      = 24;
    const SPEED_SCARED = 130;
    const SCARED_DUR   = 2600;

    let xPx        = forest.offsetWidth * 0.72;
    let yPx        = 0;
    let dirX       = -1;
    let dirY       =  1;
    let mode       = 'walk';
    let timer      = 0;
    let dur        = newWalkDur();
    let lastTs     = null;
    let scared     = false;
    let scaredTime = 0;

    function newWalkDur() { return 2500 + Math.random() * 4000; }
    function newIdleDur() { return 1000 + Math.random() * 2500; }

    function bounds() {
        const fw = forest.offsetWidth;
        const fh = forest.offsetHeight;
        return {
            xMin: 18,
            xMax: fw - SQUIRREL_W - 18,
            yMin: 70,                   // sous le titre
            yMax: fh - 155,            // au-dessus du sol
        };
    }

    // Initialise Y une fois la zone rendue
    function initY() {
        const b = bounds();
        yPx = b.yMin + (b.yMax - b.yMin) * 0.6;
    }

    function switchMode(m) {
        mode  = m;
        timer = 0;
        dur   = m === 'walk' ? newWalkDur() : newIdleDur();
        if (m === 'walk') {
            if (Math.random() < 0.45) dirX *= -1;
            if (Math.random() < 0.40) dirY *= -1;
        }
        el.classList.toggle('popol--walking', m === 'walk');
        el.classList.toggle('popol--idle',    m === 'idle');
    }

    switchMode('walk');
    initY();

    function tick(ts) {
        if (!lastTs) { lastTs = ts; initY(); }
        const dt = Math.min(ts - lastTs, 50);
        lastTs = ts;

        const b = bounds();

        // Gestion de la peur
        if (scared) {
            scaredTime += dt;
            if (scaredTime >= SCARED_DUR) {
                scared = false;
                el.classList.remove('popol--scared');
            }
        }

        const sx = scared ? SPEED_SCARED      : SPEED_X;
        const sy = scared ? SPEED_SCARED * 0.55 : SPEED_Y;

        if (mode === 'walk') {
            xPx += dirX * sx * (dt / 1000);
            yPx += dirY * sy * (dt / 1000);

            if (xPx <= b.xMin) { xPx = b.xMin; dirX =  1; }
            if (xPx >= b.xMax) { xPx = b.xMax; dirX = -1; }
            if (yPx <= b.yMin) { yPx = b.yMin; dirY =  1; }
            if (yPx >= b.yMax) { yPx = b.yMax; dirY = -1; }
        }

        // Pas de changement de mode pendant la fuite
        if (!scared) {
            timer += dt;
            if (timer >= dur) {
                switchMode(mode === 'walk' ? 'idle' : 'walk');
            }
        }

        el.style.left = xPx + 'px';
        el.style.top  = yPx + 'px';
        el.classList.toggle('popol--flip', dirX < 0);

        requestAnimationFrame(tick);
    }

    // Réaction au clic
    const MSGS = ['!!', 'Aïe !', '!?', 'Hé !', 'Ow !'];
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        window.unlockAchievement?.('popol_click', '🐿️', 'Mauvais humain !', "Tu as effrayé Popol. Honte à toi.");

        scared     = true;
        scaredTime = 0;
        dirX      *= -1;
        if (Math.random() < 0.55) dirY *= -1;

        // Forcer mode marche
        mode  = 'walk';
        timer = 0;
        dur   = newWalkDur();
        el.classList.remove('popol--idle');
        el.classList.add('popol--walking', 'popol--scared');

        // Bulle de réaction
        const old = el.querySelector('.popol-bubble');
        if (old) old.remove();
        const bubble = document.createElement('div');
        bubble.className = 'popol-bubble';
        bubble.textContent = MSGS[Math.floor(Math.random() * MSGS.length)];
        el.appendChild(bubble);

        setTimeout(() => {
            bubble.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            bubble.style.opacity    = '0';
            bubble.style.transform  = 'translateX(-50%) translateY(-14px) scale(0.7)';
            setTimeout(() => bubble.remove(), 500);
        }, 750);
    });

    requestAnimationFrame(tick);
})();

// ================================================================
// PASSIONS — Fireflies
// ================================================================
(function initFireflies() {
    const container = document.getElementById('fireflies-container');
    if (!container) return;

    for (let i = 0; i < 28; i++) {
        const ff = document.createElement('div');
        ff.className = 'firefly';
        const startX = Math.random() * 100;
        const startY = 20 + Math.random() * 75;
        const duration = 6 + Math.random() * 10;
        const delay = Math.random() * -12;
        const spread = () => (Math.random() - 0.5) * 120;

        ff.style.cssText = `
            left:${startX}%;
            top:${startY}%;
            --dx1:${spread()}px; --dy1:${spread()}px;
            --dx2:${spread()}px; --dy2:${spread()}px;
            --dx3:${spread()}px; --dy3:${spread()}px;
            --dx4:${spread()}px; --dy4:${spread()}px;
            animation-duration:${duration}s;
            animation-delay:${delay}s;
            width:${2 + Math.random() * 3}px;
            height:${2 + Math.random() * 3}px;
        `;
        container.appendChild(ff);
    }
})();

// ── Achievements + Dé compétence aléatoire ───────────────────────
(function initSkillsExtras() {

    /* ── Registre central (ordre d'affichage dans le panneau) ── */
    const REGISTRY = [
        { id: 'first_look',      icon: '👀', title: 'Espion confirmé',           desc: 'Tu as jeté un œil aux compétences.',              hint: 'Ça commence par regarder...' },
        { id: 'ach_reseau',      icon: '🌐', title: 'Admin réseau',              desc: 'Maîtrise des systèmes & réseaux détectée.',        hint: 'Quelque chose avec des fils...' },
        { id: 'ach_web',         icon: '💻', title: 'Développeur Web',           desc: 'Compétences front & back scannées.',               hint: 'Pixels et balises...' },
        { id: 'ach_script',      icon: '🐍', title: 'Serpent apprivoisé',        desc: 'Python & Bash confirmés.',                         hint: 'Un animal qui code...' },
        { id: 'ach_docker',      icon: '🐳', title: 'Capitaine Baleine',         desc: 'Conteneurs Docker à bord.',                        hint: 'Pense à la mer...' },
        { id: 'ach_db',          icon: '🗄️', title: 'Gardien des données',       desc: 'Bases de données analysées.',                      hint: 'Données, données, données...' },
        { id: 'ach_lang',        icon: '🌍', title: 'Polyglotte',                desc: 'Plusieurs langues maîtrisées.',                    hint: 'Bonjour, hello...' },
        { id: 'all_cards',       icon: '🏆', title: 'Touche-à-tout !',           desc: 'Toutes les compétences explorées.',                hint: 'Tout explorer, c\'est la clé.' },
        { id: 'doc_hunter',      icon: '📚', title: 'Chasseur de doc',           desc: 'Tu consultes la documentation. Respect.',          hint: 'La curiosité est une vertu.' },
        { id: 'dice_first',      icon: '🎲', title: 'Joueur dans l\'âme',        desc: 'Premier lancer de dé.',                            hint: 'Le hasard a du bon.' },
        { id: 'dice_addict',     icon: '🌀', title: 'Indécis mais enthousiaste', desc: '5 lancers de dé — tu cherches quoi exactement ?', hint: '5 fois, c\'est beaucoup.' },
        { id: 'binary_rain',     icon: '💾', title: 'Rain Man',                  desc: 'Tu as fait pleuvoir du binaire.',                  hint: '01001100 01001111 01001100' },
        { id: 'popol_click',     icon: '🐿️', title: 'Mauvais humain !',          desc: 'Tu as effrayé Popol. Honte à toi.',               hint: 'Il y a un animal quelque part...' },
        { id: 'wheatley_click',  icon: '🔵', title: 'Test résolu',               desc: 'Tu as perturbé Wheatley. Bien joué.',              hint: 'Portal 2 dit bonjour.' },
        { id: 'spacecore_click', icon: '🚀', title: 'SPACEEEEEEE !',             desc: 'Le Space Core est ravi de ta visite.',             hint: '...dans l\'espace ?' },
        { id: 'xp_10',           icon: '⭐', title: 'Niveau 10 atteint',         desc: 'Tu commences à grinder sérieusement.',             hint: 'Grinder, grinder, grinder.' },
        { id: 'cv_download',     icon: '📄', title: 'Recruteur détecté',         desc: 'Tu as téléchargé le CV. Bonne lecture !',          hint: 'Tu cherches quelqu\'un ?' },
        { id: 'all_effects',     icon: '🌈', title: 'Maître du hasard',           desc: 'Tous les effets du dé découverts.',                hint: 'Le dé a encore des surprises...' },
    ];

    /* ── État ── */
    const unlocked = new Set();
    const queue    = [];
    let   busy     = false;

    /* ── Toast ── */
    function nextToast() {
        if (!queue.length) { busy = false; return; }
        busy = true;
        const { icon, title, desc } = queue.shift();
        const el = document.createElement('div');
        el.className = 'achievement-toast';
        el.innerHTML =
            `<span class="ach-icon">${icon}</span>` +
            `<div class="ach-text">` +
                `<span class="ach-label">Achievement unlocked</span>` +
                `<span class="ach-title">${title}</span>` +
                `<span class="ach-desc">${desc}</span>` +
            `</div>`;
        document.body.appendChild(el);
        setTimeout(() => { el.remove(); setTimeout(nextToast, 150); }, 4050);
    }

    function unlock(id, icon, title, desc) {
        if (unlocked.has(id)) return;
        unlocked.add(id);
        renderPanel();
        setTimeout(() => { queue.push({ icon, title, desc }); if (!busy) nextToast(); }, 350);
    }
    window.unlockAchievement = unlock;

    /* ── Panneau progression ── */
    const toggle = document.createElement('button');
    toggle.id        = 'ach-toggle';
    toggle.className = 'ach-toggle';
    toggle.title     = 'Succès';
    toggle.innerHTML = '🏆<span class="ach-badge" id="ach-badge">0</span>';
    document.body.appendChild(toggle);

    const panel = document.createElement('div');
    panel.id        = 'ach-panel';
    panel.className = 'ach-panel';
    panel.innerHTML =
        `<div class="ach-panel-header">` +
            `<span class="ach-panel-title">Succès</span>` +
            `<span class="ach-panel-count" id="ach-count">0 / ${REGISTRY.length}</span>` +
            `<button class="ach-panel-close" id="ach-panel-close" aria-label="Fermer">✕</button>` +
        `</div>` +
        `<div class="ach-panel-list" id="ach-panel-list"></div>`;
    document.body.appendChild(panel);

    toggle.addEventListener('click', () => panel.classList.toggle('open'));
    document.getElementById('ach-panel-close').addEventListener('click', () => panel.classList.remove('open'));
    document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && e.target !== toggle) panel.classList.remove('open');
    });

    function renderPanel() {
        const count  = unlocked.size;
        const list   = document.getElementById('ach-panel-list');
        const badge  = document.getElementById('ach-badge');
        const cntEl  = document.getElementById('ach-count');
        badge.textContent = count;
        cntEl.textContent = `${count} / ${REGISTRY.length}`;

        list.innerHTML = REGISTRY.map(a => {
            const done = unlocked.has(a.id);
            return done
                ? `<div class="ach-item ach-item--unlocked">` +
                      `<span class="ach-item-icon">${a.icon}</span>` +
                      `<div class="ach-item-text">` +
                          `<span class="ach-item-title">${a.title}</span>` +
                          `<span class="ach-item-desc">${a.desc}</span>` +
                      `</div>` +
                      `<span class="ach-item-check">✓</span>` +
                  `</div>`
                : `<div class="ach-item ach-item--locked">` +
                      `<span class="ach-item-icon">${a.icon}</span>` +
                      `<div class="ach-item-text">` +
                          `<span class="ach-item-title">???</span>` +
                          `<span class="ach-item-hint">${a.hint}</span>` +
                      `</div>` +
                  `</div>`;
        }).join('');
    }
    renderPanel();

    /* ── Triggers : scroll section ── */
    const section = document.getElementById('competences');
    if (section) {
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                unlock('first_look', '👀', 'Espion confirmé', 'Tu as jeté un œil aux compétences.');
                obs.disconnect();
            }
        }, { threshold: 0.35 });
        obs.observe(section);
    }

    /* ── Triggers : hover chaque card ── */
    const CARD_ACH = [
        ['ach_reseau',  '🌐', 'Admin réseau',        'Maîtrise des systèmes & réseaux détectée.'],
        ['ach_web',     '💻', 'Développeur Web',     'Compétences front & back scannées.'],
        ['ach_script',  '🐍', 'Serpent apprivoisé',  'Python & Bash confirmés.'],
        ['ach_docker',  '🐳', 'Capitaine Baleine',   'Conteneurs Docker à bord.'],
        ['ach_db',      '🗄️', 'Gardien des données', 'Bases de données analysées.'],
        ['ach_lang',    '🌍', 'Polyglotte',           'Plusieurs langues maîtrisées.'],
    ];
    const seenCards = new Set();
    document.querySelectorAll('.skill-card').forEach((card, i) => {
        card.addEventListener('mouseenter', () => {
            const [id, icon, title, desc] = CARD_ACH[i];
            unlock(id, icon, title, desc);
            seenCards.add(i);
            if (seenCards.size === CARD_ACH.length)
                setTimeout(() => unlock('all_cards', '🏆', 'Touche-à-tout !', 'Toutes les compétences explorées.'), 700);
        });
    });

    /* ── Triggers : clic sur un badge doc ── */
    document.querySelectorAll('.skill-tag[href]').forEach(tag => {
        tag.addEventListener('click', () =>
            unlock('doc_hunter', '📚', 'Chasseur de doc', 'Tu consultes la documentation. Respect.')
        );
    });

    /* ── Dé compétence aléatoire ── */
    const FACES   = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const diceBtn = document.getElementById('dice-btn');
    if (!diceBtn) return;

    let diceRolls = 0;

    /* ── Effets aléatoires ── */
    function showFxLabel(text, color) {
        const el = document.createElement('div');
        el.className = 'dice-effect-label';
        if (color) el.style.color = color;
        el.textContent = text;
        document.body.appendChild(el);
        el.addEventListener('animationend', () => el.remove(), { once: true });
    }

    const DICE_EFFECTS = [
        {
            id: 'fx_double_xp',
            fn() {
                const fill = document.getElementById('mc-bar-fill');
                window.xpMultiplier = 2;
                fill?.classList.add('double-xp');
                showFxLabel('⚡ Double XP — 10 secondes !', '#ffdd00');
                setTimeout(() => {
                    window.xpMultiplier = 1;
                    fill?.classList.remove('double-xp');
                }, 10000);
            }
        },
        {
            id: 'fx_jackpot',
            fn() {
                const el = document.createElement('div');
                el.className = 'achievement-toast dice-jackpot';
                el.innerHTML = '<span class="ach-icon">🎰</span><div class="ach-text">' +
                    '<span class="ach-label">JACKPOT</span>' +
                    '<span class="ach-title">7 &nbsp;7 &nbsp;7</span>' +
                    '<span class="ach-desc">+20 XP bonus !</span></div>';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 4050);
                window.grantXP?.(20);
            }
        },
        {
            id: 'fx_binary',
            fn() {
                for (let i = 0; i < 3; i++)
                    setTimeout(() => spawnBinaryRain(window.innerWidth * (0.2 + Math.random() * 0.6), 70), i * 200);
                showFxLabel('💾 Pluie binaire !');
            }
        },
        {
            id: 'fx_glow',
            fn() {
                document.querySelectorAll('.skill-tag').forEach(tag => {
                    tag.classList.remove('dice-highlight');
                    void tag.offsetWidth;
                    tag.classList.add('dice-highlight');
                    tag.addEventListener('animationend', () => tag.classList.remove('dice-highlight'), { once: true });
                });
                showFxLabel('✨ Toutes les compétences brillent !');
            }
        },
        {
            id: 'fx_flash',
            fn() {
                const ov = document.createElement('div');
                ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,212,255,0.13);pointer-events:none;z-index:99998;animation:diceFlash 0.75s ease forwards';
                document.body.appendChild(ov);
                ov.addEventListener('animationend', () => ov.remove(), { once: true });
                showFxLabel('📸 Flash !');
            }
        },
        {
            id: 'fx_shake',
            fn() {
                document.body.style.animation = 'diceShake 0.52s ease';
                setTimeout(() => { document.body.style.animation = ''; }, 540);
                showFxLabel('🌊 Tremblement !');
            }
        },
    ];

    const seenEffects = new Set();

    diceBtn.addEventListener('click', () => {
        const tags = [...document.querySelectorAll('.skill-tag')];
        if (!tags.length || diceBtn.classList.contains('rolling')) return;

        diceBtn.classList.add('rolling');
        const timer = setInterval(() => {
            diceBtn.textContent = FACES[Math.floor(Math.random() * 6)];
        }, 75);

        setTimeout(() => {
            clearInterval(timer);
            diceBtn.textContent = FACES[Math.floor(Math.random() * 6)];
            diceBtn.classList.remove('rolling');

            // Highlight tag aléatoire
            const tag = tags[Math.floor(Math.random() * tags.length)];
            tag.classList.remove('dice-highlight');
            void tag.offsetWidth;
            tag.classList.add('dice-highlight');
            tag.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            tag.addEventListener('animationend', () => tag.classList.remove('dice-highlight'), { once: true });

            // Effet aléatoire
            const effect = DICE_EFFECTS[Math.floor(Math.random() * DICE_EFFECTS.length)];
            effect.fn();
            seenEffects.add(effect.id);
            if (seenEffects.size === DICE_EFFECTS.length)
                unlock('all_effects', '🌈', 'Maître du hasard', 'Tous les effets du dé découverts.');

            // Achievements liés au nombre de lancers
            diceRolls++;
            unlock('dice_first',  '🎲', 'Joueur dans l\'âme',        'Premier lancer de dé.');
            if (diceRolls >= 5)
                unlock('dice_addict', '🌀', 'Indécis mais enthousiaste', '5 lancers de dé — tu cherches quoi exactement ?');
        }, 680);
    });

})();

// ── Minecraft XP Clicker ──────────────────────────────────────────
(function initXPClicker() {
    const btn   = document.getElementById('mc-btn');
    const reset = document.getElementById('mc-reset');
    if (!btn) return;

    const elLevel   = document.getElementById('mc-level');
    const elFill    = document.getElementById('mc-bar-fill');
    const elNums    = document.getElementById('mc-xp-nums');
    const elParts   = document.getElementById('mc-particles');
    const elBanner  = document.getElementById('mc-levelup');

    // Minecraft XP per level: how much XP is needed to go from level n to n+1
    function xpPerLevel(n) {
        if (n < 16) return 2 * n + 7;
        if (n < 31) return Math.max(1, 5 * n - 38);
        return Math.max(1, 9 * n - 158);
    }

    // Persist state
    const STORE = 'mc-xp-v1';
    function load() {
        try { return JSON.parse(localStorage.getItem(STORE)) || {}; } catch { return {}; }
    }
    function save() {
        localStorage.setItem(STORE, JSON.stringify({ level, xp: xpCur }));
    }

    const saved = load();
    let level  = saved.level || 0;
    let xpCur  = saved.xp   || 0;

    function render() {
        const needed = xpPerLevel(level);
        elLevel.textContent = level;
        elFill.style.width  = Math.min(100, (xpCur / needed) * 100) + '%';
        elNums.textContent  = xpCur + ' / ' + needed + ' XP';
        save();
    }

    // Hook externe : grant XP depuis n'importe où
    window.grantXP = function(amount) {
        xpCur += amount;
        spawnParticle(amount);
        let didLevel = false;
        while (xpCur >= xpPerLevel(level)) { xpCur -= xpPerLevel(level); level++; didLevel = true; }
        if (didLevel) {
            triggerLevelUp();
            if (level >= 10)
                window.unlockAchievement?.('xp_10', '⭐', 'Niveau 10 atteint', 'Tu commences à grinder sérieusement.');
        }
        render();
    };

    // Double XP temporaire
    window.xpMultiplier = 1;

    function spawnParticle(amount) {
        const p = document.createElement('span');
        p.className = 'mc-particle';
        p.textContent = '+' + amount + ' XP';
        // random horizontal position across the button zone
        p.style.left   = (15 + Math.random() * 70) + '%';
        p.style.bottom = '0';
        elParts.appendChild(p);
        p.addEventListener('animationend', () => p.remove(), { once: true });
    }

    function triggerLevelUp() {
        // Animate level number
        elLevel.classList.remove('pop');
        void elLevel.offsetWidth;
        elLevel.classList.add('pop');
        elLevel.addEventListener('animationend', () => elLevel.classList.remove('pop'), { once: true });

        // Show banner
        elBanner.classList.remove('show');
        void elBanner.offsetWidth;
        elBanner.classList.add('show');
        elBanner.addEventListener('animationend', () => elBanner.classList.remove('show'), { once: true });
    }

    btn.addEventListener('click', () => {
        const gain = (Math.floor(Math.random() * 4) + 2) * (window.xpMultiplier || 1);
        xpCur += gain;
        spawnParticle(gain);

        let didLevel = false;
        while (xpCur >= xpPerLevel(level)) {
            xpCur -= xpPerLevel(level);
            level++;
            didLevel = true;
        }
        if (didLevel) {
            triggerLevelUp();
            if (level >= 10)
                window.unlockAchievement?.('xp_10', '⭐', 'Niveau 10 atteint', 'Tu commences à grinder sérieusement.');
        }
        render();
    });

    reset.addEventListener('click', () => {
        if (!confirm('Réinitialiser ta progression XP ?')) return;
        level = 0; xpCur = 0;
        render();
    });

    render();
})();
