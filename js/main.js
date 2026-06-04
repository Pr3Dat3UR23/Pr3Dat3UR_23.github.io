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
