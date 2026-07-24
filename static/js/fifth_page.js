/* 1. ROTATING 3D-EFFECT GALAXY BACKGROUND */
document.addEventListener('DOMContentLoaded', () => {

    const galaxyCanvas = document.getElementById('galaxy-canvas');
    if (galaxyCanvas) {
        const ctx = galaxyCanvas.getContext('2d');
        let width = galaxyCanvas.width = window.innerWidth;
        let height = galaxyCanvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = galaxyCanvas.width = window.innerWidth;
            height = galaxyCanvas.height = window.innerHeight;
        });

        // Spiral Galaxy Particles
        const starCount = 350;
        const stars = [];
        let galaxyRotation = 0;

        for (let i = 0; i < starCount; i++) {
            const distance = Math.random() * (Math.min(width, height) * 0.75);
            const angle = Math.random() * Math.PI * 2;
            stars.push({
                distance: distance,
                angle: angle,
                speed: (1 / (distance + 50)) * 0.8,
                size: Math.random() * 2 + 0.5,
                color: ['#ffffff', '#e0aaff', '#9d4edd', '#fde047', '#f43f5e'][Math.floor(Math.random() * 5)],
                alpha: Math.random() * 0.8 + 0.2
            });
        }

        function animateGalaxy() {
            ctx.fillStyle = 'rgba(3, 0, 8, 0.2)'; // Smooth trail motion blur
            ctx.fillRect(0, 0, width, height);

            const centerX = width / 2;
            const centerY = height / 2;

            stars.forEach(star => {
                star.angle += star.speed;
                
                // Spiral Arm Offset
                const currentAngle = star.angle + (star.distance * 0.002);
                const x = centerX + Math.cos(currentAngle) * star.distance;
                const y = centerY + Math.sin(currentAngle) * star.distance * 0.6; // Slight perspective tilt

                ctx.beginPath();
                ctx.arc(x, y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.globalAlpha = star.alpha;
                ctx.shadowBlur = star.size * 4;
                ctx.shadowColor = star.color;
                ctx.fill();
            });

            requestAnimationFrame(animateGalaxy);
        }
        animateGalaxy();
    }
});

/* 2. REVEAL POEM, FLOATING STARDUST, & COMET TRIGGER */
function revealGalaxyPoem() {
    document.getElementById('start-poem-btn').style.display = 'none';

    const paragraphs = [
        document.getElementById('para-1'),
        document.getElementById('para-2'),
        document.getElementById('para-3'),
        document.getElementById('para-4')
    ];

    paragraphs.forEach((para, index) => {
        setTimeout(() => {
            para.classList.add('revealed');

            // Trigger Comet on the final line arrival
            if (index === paragraphs.length - 1) {
                setTimeout(launchComet, 500);
            }
        }, index * 2400); // Reveals each paragraph every 2.4 seconds
    });

    startFloatingStardust();
}

/* 3. TINY STARDUST PARTICLES ORBITING TEXT */
function startFloatingStardust() {
    const particleCanvas = document.getElementById('particle-canvas');
    if (!particleCanvas) return;

    const ctx = particleCanvas.getContext('2d');
    let width = particleCanvas.width = window.innerWidth;
    let height = particleCanvas.height = window.innerHeight;

    class StardustParticle {
        constructor() { this.reset(); }
        reset() {
            this.x = width / 2 + (Math.random() - 0.5) * 550;
            this.y = height / 2 + (Math.random() - 0.5) * 350;
            this.size = Math.random() * 2 + 0.8;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = -Math.random() * 0.5 - 0.1;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.pulse = Math.random() * 0.05 + 0.01;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.003;
            if (this.opacity <= 0) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = '#fde047';
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#fde047';
            ctx.fill();
        }
    }

    window.dustParticlesList = Array.from({ length: 45 }, () => new StardustParticle());
}

/* 4. MULTI-SPARK SHOOTING COMET ANIMATION */
function launchComet() {
    const particleCanvas = document.getElementById('particle-canvas');
    if (!particleCanvas) return;

    const ctx = particleCanvas.getContext('2d');
    let width = particleCanvas.width = window.innerWidth;
    let height = particleCanvas.height = window.innerHeight;

    let comet = {
        x: -150,
        y: height * 0.18,
        length: 300,
        speedX: 22,
        speedY: 9,
        opacity: 1
    };

    let cometSparks = [];

    function drawCometFrame() {
        ctx.clearRect(0, 0, width, height);

        // 1. Draw Text Dust Particles
        if (window.dustParticlesList) {
            window.dustParticlesList.forEach(p => { p.update(); p.draw(); });
        }

        // 2. Draw Comet
        if (comet.opacity > 0) {
            let tailX = comet.x - comet.length;
            let tailY = comet.y - (comet.length * (comet.speedY / comet.speedX));

            // Tail Gradient
            let gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.2, 'rgba(253, 224, 71, 0.9)');
            gradient.addColorStop(0.5, 'rgba(224, 170, 255, 0.6)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.moveTo(comet.x, comet.y);
            ctx.lineTo(tailX, tailY);
            ctx.lineWidth = 6;
            ctx.strokeStyle = gradient;
            ctx.shadowBlur = 25;
            ctx.shadowColor = '#fde047';
            ctx.stroke();

            // Comet Head Core
            ctx.beginPath();
            ctx.arc(comet.x, comet.y, 7, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 30;
            ctx.shadowColor = '#ffffff';
            ctx.fill();

            // Emit Tail Sparks
            if (Math.random() < 0.6) {
                cometSparks.push({
                    x: comet.x + (Math.random() - 0.5) * 10,
                    y: comet.y + (Math.random() - 0.5) * 10,
                    vx: -comet.speedX * 0.2 + (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 3,
                    size: Math.random() * 3 + 1,
                    alpha: 1
                });
            }

            comet.x += comet.speedX;
            comet.y += comet.speedY;

            if (comet.x > width + 300) {
                comet.opacity = 0;
            }
        }

        // Render Sparks
        cometSparks.forEach((spark, index) => {
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.alpha -= 0.02;

            if (spark.alpha > 0) {
                ctx.beginPath();
                ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
                ctx.fillStyle = '#e0aaff';
                ctx.globalAlpha = spark.alpha;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#e0aaff';
                ctx.fill();
            } else {
                cometSparks.splice(index, 1);
            }
        });

        requestAnimationFrame(drawCometFrame);
    }

    drawCometFrame();
}