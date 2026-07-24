document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. GENERATE DYNAMIC FAIRY LIGHTS
       ========================================================= */
    const lightsContainer = document.getElementById('fairy-lights');
    if (lightsContainer) {
        // Create 30 bulbs across the top
        for (let i = 0; i < 30; i++) {
            let bulb = document.createElement('li');
            
            // Randomize animation duration (flicker speed) and delay
            let animDuration = Math.random() * 1.5 + 0.5; // 0.5s to 2s
            let animDelay = Math.random() * 2; // 0s to 2s
            
            // Randomize colors slightly (warm yellow, soft amber, bright white)
            let colors = ['rgba(255, 223, 112, 1)', 'rgba(255, 250, 200, 1)', 'rgba(255, 180, 80, 1)'];
            let chosenColor = colors[Math.floor(Math.random() * colors.length)];
            
            bulb.style.animationDuration = `${animDuration}s`;
            bulb.style.animationDelay = `${animDelay}s`;
            bulb.style.boxShadow = `0px 5px 15px 4px ${chosenColor}`;
            
            // Add a slight tilt to the bulbs so they look like they are hanging naturally
            let rotate = (Math.random() - 0.5) * 30; 
            bulb.style.transform = `rotate(${rotate}deg)`;

            lightsContainer.appendChild(bulb);
        }
    }

    /* =========================================================
       2. INTERACTIVE INK / COFFEE STAINS ON CLICK
       ========================================================= */
    const paper = document.getElementById('paper');
    if (paper) {
        paper.addEventListener('click', (e) => {
            // Prevent stains when clicking the button or polaroid
            if (e.target.closest('a') || e.target.closest('.polaroid-frame')) return;

            // Get exact coordinates relative to the paper container
            const rect = paper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create stain element
            const stain = document.createElement('div');
            stain.classList.add('ink-stain');
            stain.style.left = `${x}px`;
            stain.style.top = `${y}px`;

            // Randomize size and rotation for realism
            const scale = Math.random() * 0.8 + 0.5;
            const rotation = Math.random() * 360;
            stain.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;

            // Append to paper
            paper.appendChild(stain);
        });
    }

    /* =========================================================
       3. AMBIENT EMBERS/ASH CANVAS ANIMATION
       ========================================================= */
    const canvas = document.getElementById('ambient-canvas');
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
            this.y = Math.random() * height + height; // Start below screen
            this.size = Math.random() * 3 + 1;
            this.speedY = -(Math.random() * 1.5 + 0.5); // Float UP like fire embers
            this.speedX = (Math.random() - 0.5) * 1.5;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.color = Math.random() > 0.3 ? '#ffb142' : '#ff5252'; // Fire colors
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5;
            this.opacity -= 0.002; // Fade out as they go up
            if (this.y < 0 || this.opacity <= 0) {
                this.reset();
                this.y = height + 10; 
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
        }
    }

    const particles = Array.from({ length: 40 }, () => new Particle());

    function renderCanvas() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(renderCanvas);
    }
    renderCanvas();

    /* =========================================================
       4. 3D TILT EFFECT ON POLAROID
       ========================================================= */
    const polaroid = document.getElementById('polaroid');
    if (polaroid) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 20;
            const yPos = (clientY / window.innerHeight - 0.5) * 20;
            polaroid.style.transform = `rotate(-3deg) rotateX(${-yPos}deg) rotateY(${xPos}deg)`;
        });
    }

    /* =========================================================
       5. SMOOTH PAGE OUT TRANSITION
       ========================================================= */
    const btn = document.getElementById('next-page-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = btn.getAttribute('href');
            document.querySelector('.torn-paper-wrapper').style.transition = 'all 0.8s ease';
            document.querySelector('.torn-paper-wrapper').style.opacity = '0';
            document.querySelector('.torn-paper-wrapper').style.transform = 'scale(0.9) translateY(-30px)';
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    }
});