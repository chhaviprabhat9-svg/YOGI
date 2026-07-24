// Secret code: December 11th -> 1112
const SECRET_CODE = "1112"; 
let digits = [0, 0, 0, 0];

/**
 * Changes digit on dial wheels (+1 or -1)
 */
function changeDigit(wheelIndex, delta) {
    let arrayIdx = wheelIndex - 1;
    digits[arrayIdx] = (digits[arrayIdx] + delta + 10) % 10;
    document.getElementById(`digit-${wheelIndex}`).innerText = digits[arrayIdx];
}

/**
 * Checks cipher combination
 */
function checkPuzzle() {
    const currentCode = digits.join('');
    const errorMsg = document.getElementById('error-msg');

    if (currentCode === SECRET_CODE) {
        errorMsg.style.display = 'none';
        
        // Flip card 3D effect
        document.getElementById('card-flipper').classList.add('flipped');
        
        // Render scratch canvas layers after card flip animation finishes
        setTimeout(initScratchCards, 400);
    } else {
        errorMsg.style.display = 'block';
        
        // Trigger shake effect on failure
        const vault = document.querySelector('.puzzle-vault');
        vault.style.animation = 'shake 0.4s ease';
        setTimeout(() => {
            vault.style.animation = '';
        }, 400);
    }
}

/**
 * Initializes interactive scratch card canvases
 */
function initScratchCards() {
    const canvases = document.querySelectorAll('.scratch-canvas');
    
    canvases.forEach(canvas => {
        if (canvas.dataset.initialized) return;
        canvas.dataset.initialized = "true";

        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        
        // Adjust canvas dimensions to match container element
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;

        // Draw grey metallic scratch cover layer
        ctx.fillStyle = '#222738';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw outer glow outline
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

        // Draw label text over scratch layer
        ctx.fillStyle = '#00f2fe';
        ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✨ Scratch to Reveal ✨', canvas.width / 2, canvas.height / 2);

        let isScratching = false;

        function scratch(e) {
            if (!isScratching) return;
            
            const rect = canvas.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 18, 0, Math.PI * 2);
            ctx.fill();
        }

        // Mouse Events
        canvas.addEventListener('mousedown', (e) => { isScratching = true; scratch(e); });
        canvas.addEventListener('mousemove', scratch);
        window.addEventListener('mouseup', () => { isScratching = false; });

        // Touch Events (Mobile Support)
        canvas.addEventListener('touchstart', (e) => { isScratching = true; scratch(e); });
        canvas.addEventListener('touchmove', scratch);
        window.addEventListener('touchend', () => { isScratching = false; });
    });
}

// ==========================================================================
// ENVELOPE LETTERS CONTENT
// ==========================================================================
const lettersContent = {
    laugh: {
        title: "Open When You Want to Laugh 😂",
        emoji: "🤣",
        body: "Remember wo din jb tmko pta tha Shruti Singh , instagram pe hm hi hai, still tm chats carry on kiye the, Photos toh dikha do, Chhavi ke baare mai baat mtt kro, Aap toh ho hi sundar, Beauty queen, flirt kr rhe the tm Shruti singh se....woow yogi... YOGI ek aur baat...ek secret hm ab bhi ni btaye hai tmko aur wo hm abhi btayenge bhi ni...toh puchna mtt...I swear sirf ek secret rah gya..😂"
    },
    sad: {
        title: "Open When You Are Sad 🌧️",
        emoji: "🤍",
        body: "Hey... take a deep breath. Whatever is weighing heavy on your heart right now won't last forever. I wish I could wrap my arms around you right this second. You are so strong, but you don't have to carry it all alone."
    },
    shoulder: {
        title: "Open When You Miss a Shoulder 🫂",
        emoji: "🤗",
        body: "Close your eyes for three seconds. Imagine my hand in yours and my chin resting on your shoulder. I am always right here with you, even when distance gets in the way. I'm saving my biggest hug for you."
    },
    cry: {
        title: "Open When You Want to Cry 💔",
        emoji: "🌧️",
        body: "Jyada sochne ka jarurat nhi hai ye toh nhi hi bolenge, kyuki ik tm kitna sochte ho, aur socha kro ig ye weakness nhi hai but soch kr roone se better hai, mere saath milkr kuch jokes crack krlo, thoda hm bhi hash lenge...aur ye fair ni hai ki bure mood mai tm escape kro....lets cry together, kyuki hashte bhi toh saath hi hai...aur wo tears mere liye bacha lo, hm jb bartan dhulwaye tb nikaalna unko"
    },
    love: {
        title: "Open When You Need a Reminder ✨",
        emoji: "💖",
        body: "In case yaad na ho toh, You are my favourite human being in this universe, koi itna cute, pyara, innocent (hawasi),intelligent ek saath kaise ho skta hai, Trust me yogi, tmse jyada skilled, genuine, aur expressive insaan mereko kahi ni mila...isliye tm jyada precious bn jaate ho mere liye....mereko tm mai aaj tk kuch galat dikha hi ni, haa ladai, arguement hua hai but isse ig mereko tmhre presence ka value pta chala hai, kyuki jb jb tm thode der k liye gye ho, panic hm kiye the...and I'll love you long after the stars run cold."
    }
};

/**
 * Opens Modal popup with selected letter
 */
function openLetter(type) {
    const letter = lettersContent[type];
    if (!letter) return;

    document.getElementById('modal-emoji').innerText = letter.emoji;
    document.getElementById('modal-title').innerText = letter.title;
    document.getElementById('modal-body').innerText = letter.body;

    document.getElementById('letter-modal').classList.add('active');
}

/**
 * Closes Modal popup
 */
function closeLetter() {
    document.getElementById('letter-modal').classList.remove('active');
}

// Close Modal when clicking outside the box
window.addEventListener('click', (e) => {
    const modal = document.getElementById('letter-modal');
    if (e.target === modal) {
        closeLetter();
    }
});