document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. GENERATE DYNAMIC FAIRY LIGHTS
       ========================================================= */
    const lightsContainer = document.getElementById('fairy-lights');
    if (lightsContainer) {
        for (let i = 0; i < 30; i++) {
            let bulb = document.createElement('li');
            bulb.style.animationDuration = `${Math.random() * 1.5 + 0.5}s`;
            bulb.style.animationDelay = `${Math.random() * 2}s`;
            lightsContainer.appendChild(bulb);
        }
    }

    /* =========================================================
       2. AUDIO & VINYL TOGGLE (BOLLYWOOD / ROMANTIC MELODY)
       ========================================================= */
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const vinyl = document.getElementById('vinyl');
    let isPlaying = false;

    if (musicToggle && bgMusic) {
        bgMusic.volume = 0.6; // Gentle volume

        musicToggle.addEventListener('click', () => {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    vinyl.classList.add('spinning');
                    document.querySelector('.music-text').textContent = 'Pause Music';
                }).catch(err => {
                    console.log("Audio playback error:", err);
                    alert("Click anywhere on the page first, then press play again!");
                });
            } else {
                bgMusic.pause();
                isPlaying = false;
                vinyl.classList.remove('spinning');
                document.querySelector('.music-text').textContent = 'Play Our Song';
            }
        });
    }

    /* =========================================================
       3. FLIP ENVELOPES ON CLICK (RELIABLE EVENT)
       ========================================================= */
    const envelopes = document.querySelectorAll('.envelope-card');

    envelopes.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents paper click interference
            card.classList.toggle('open');
        });
    });

    /* =========================================================
       4. AMBIENT FLOATING FIRE EMBERS / DUST CANVAS
       ========================================================= */
    const canvas = document.getElementById('ambient-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        class Particle {
            constructor() { 
                this.reset(); 
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height + height;
                this.size = Math.random() * 3 + 1;
                this.speedY = -(Math.random() * 1.5 + 0.5);
                this.opacity = Math.random() * 0.8 + 0.2;
                this.color = Math.random() > 0.3 ? '#ffb142' : '#ff5252';
            }
            update() {
                this.y += this.speedY;
                this.opacity -= 0.002;
                if (this.y < 0 || this.opacity <= 0) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        const particles = Array.from({ length: 35 }, () => new Particle());
        
        function renderCanvas() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => { 
                p.update(); 
                p.draw(); 
            });
            requestAnimationFrame(renderCanvas);
        }
        renderCanvas();
    }
});
function flipEnvelope(card) {
    // Toggles the 'flipped' class when clicked
    card.classList.toggle('flipped');
}