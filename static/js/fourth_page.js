/* BIOMETRIC FINGERPRINT SCANNER FUNCTION */
function authenticateAgent() {
    const statusText = document.getElementById('fp-status');
    const box = document.getElementById('biometric-box');

    statusText.innerText = '⚡ SCANNING FINGERPRINT...';
    statusText.style.color = '#d4af37';

    setTimeout(() => {
        statusText.innerText = '✅ ACCESS GRANTED: AGENT VIJAY';
        statusText.style.color = '#008000';
        box.style.borderColor = '#008000';
        box.style.background = 'rgba(0, 255, 102, 0.1)';

        // Un-redact text under sticky notes
        document.querySelectorAll('.redacted').forEach(el => {
            el.style.background = 'transparent';
            el.style.color = 'inherit';
        });
    }, 1200);
}

document.addEventListener('DOMContentLoaded', () => {

    /* 1. FLOATING BALLOONS GENERATOR */
    const balloonContainer = document.getElementById('balloon-container');
    const colors = ['#8b0000', '#d4af37', '#c58373', '#5c4033', '#e2d2be'];
    if (balloonContainer) {
        for (let i = 0; i < 15; i++) {
            let balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.animationDuration = `${Math.random() * 8 + 8}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloonContainer.appendChild(balloon);
        }
    }

    /* 2. SCRATCH CARD ENGINE (CLASSIFIED SEAL OVERLAY) */
    const scratchCanvases = document.querySelectorAll('.scratch-canvas');

    scratchCanvases.forEach((canvas, index) => {
        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;

        // Draw Dark Agent Wax Seal Coating
        ctx.fillStyle = index === 4 ? '#1a1412' : '#2e2320';
        ctx.fillRect(0, 0, width, height);

        // Gold Tactical Border Frame
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 2;
        ctx.strokeRect(6, 6, width - 12, height - 12);

        // Scratch Seal Text
        ctx.fillStyle = '#d4af37';
        ctx.font = 'bold 10px Courier Prime';
        ctx.textAlign = 'center';
        ctx.fillText('🕵️ AGENT VIJAY ONLY', width / 2, height / 2 - 8);
        
        ctx.fillStyle = '#e2d2be';
        ctx.font = '8px Courier Prime';
        ctx.fillText('✦ SCRATCH TO DECRYPT ✦', width / 2, height / 2 + 10);

        let isScratching = false;

        function scratch(e) {
            if (!isScratching) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 22, 0, Math.PI * 2, false);
            ctx.fill();

            // Auto reveal redacted text behind the card when scratch starts
            const secretSpan = canvas.parentElement.querySelector('.redacted');
            if(secretSpan) {
                secretSpan.style.background = 'transparent';
                secretSpan.style.color = 'inherit';
            }
        }

        canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => { isScratching = false; });

        canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
        canvas.addEventListener('touchmove', scratch);
        window.addEventListener('touchend', () => { isScratching = false; });
    });

    /* 3. SPARKLER CANVAS */
    const sparklerCanvas = document.getElementById('sparkler-canvas');
    if (sparklerCanvas) {
        const ctx = sparklerCanvas.getContext('2d');
        let width = sparklerCanvas.width = window.innerWidth;
        let height = sparklerCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = sparklerCanvas.width = window.innerWidth;
            height = sparklerCanvas.height = window.innerHeight;
        });

        class Sparkle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = Math.random() * 1 + 0.5;
                this.opacity = Math.random();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity -= 0.01;
                if (this.opacity <= 0) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = '#d4af37';
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        const sparkles = Array.from({ length: 40 }, () => new Sparkle());
        function animateSparkles() {
            ctx.clearRect(0, 0, width, height);
            sparkles.forEach(s => { s.update(); s.draw(); });
            requestAnimationFrame(animateSparkles);
        }
        animateSparkles();
    }
});