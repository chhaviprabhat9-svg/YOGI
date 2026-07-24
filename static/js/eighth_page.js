// Starfield Background
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
}

function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.008 + 0.002
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) star.speed = -star.speed;

        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();

// Trigger Confetti Burst when the credits finish scrolling or after 3 seconds
window.addEventListener('load', () => {
    setTimeout(() => {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.8 },
                colors: ['#ffd700', '#00f2fe', '#8a2be2', '#ff4d6d']
            });
        }
    }, 2000);
});

// Function to restart credits animation
function restartCredits() {
    const wrapper = document.getElementById('credits-wrapper');
    wrapper.style.animation = 'none';
    wrapper.offsetHeight; /* trigger reflow */
    wrapper.style.animation = 'crawl 35s linear forwards';

    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}