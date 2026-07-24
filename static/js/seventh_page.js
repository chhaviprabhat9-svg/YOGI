// Starfield background generation
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
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speed: Math.random() * 0.01 + 0.005
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

// Candle Interactions
function toggleCandle(candle) {
    candle.classList.toggle('lit');
    checkCandlesState();
}

function lightAllCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach(c => c.classList.add('lit'));
    checkCandlesState();
}

let blownOut = false;

function checkCandlesState() {
    const candles = document.querySelectorAll('.candle');
    const litCandles = document.querySelectorAll('.candle.lit');

    // If all were lit, and now all are unlit/blown out
    if (litCandles.length === 0 && blownOut) {
        triggerCelebration();
    } else if (litCandles.length === candles.length) {
        document.getElementById('instruction-text').innerText = "All candles are lit! Now blow into your mic or click them to blow them out ✨";
        blownOut = true;
    }
}

// Microphone Blow Detection
async function initMic() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        
        microphone.connect(analyser);
        analyser.fftSize = 256;
        
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        document.getElementById('mic-btn').innerText = "🎙️ Listening for blow...";

        function detectBlow() {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            let average = sum / bufferLength;

            // Threshold for blow noise detection
            if (average > 45) {
                extinguishAll();
            } else {
                requestAnimationFrame(detectBlow);
            }
        }

        detectBlow();
    } catch (err) {
        alert("Microphone access declined or unsupported. You can click the candles directly to blow them out!");
    }
}

function extinguishAll() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach(c => c.classList.remove('lit'));
    triggerCelebration();
}

// Celebration Confetti & Fireworks Trigger
function triggerCelebration() {
    // Canvas Confetti Burst
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#00f2fe', '#7b2cbf', '#ffffff']
        });
    }

    // Reveal Wishes Section
    const wishesSec = document.getElementById('wishes-section');
    wishesSec.classList.remove('hidden');
    wishesSec.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('instruction-text').innerText = "Your wishes have been released into the cosmos! ✨";
}