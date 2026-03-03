const guestList = {
    "jane doe": "INV-1024",
    "john smith": "INV-5567",
    "grandma": "INV-0001",
    "kim": "INV-2024",
    "alex": "HOST-001",
    "sam": "HOST-002",
    "miller": "INV-3344",

};

function checkGuest() {
    const nameInput = document.getElementById('guest-name').value.trim().toLowerCase();
    const errorMsg = document.getElementById('error-message');
    const landing = document.getElementById('landing-page');
    const invitation = document.getElementById('invitation-page');
    
    // Success Audio
    const successSound = document.getElementById('success-sound');
    // Rejection Audio
    const rejectionSound = document.getElementById('rejection-sound');

    if (guestList[nameInput]) {
        // Correct Guest - Play success sound, stop tears, reveal invitation
        document.getElementById('entry-number').innerText = guestList[nameInput];
        stopTheTears();
        
        successSound.play().catch(e => console.log("Success audio blocked:", e)); 
        
        landing.classList.add('hidden');
        invitation.classList.remove('hidden');
        
        setTimeout(() => {
            invitation.classList.add('reveal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        
    } else {
        // Name not on list - Play rejection sound and start tears
        rejectionSound.play().catch(e => console.log("Rejection audio blocked:", e));

        errorMsg.innerText = "You are not invited to the wedding. It was for close family and friends and you ain't. Byee!! 😭";
        startTheTears();
    }
}

let rainInterval;
function startTheTears() {
    if (rainInterval) return;
    const container = document.getElementById('tear-container');
    rainInterval = setInterval(() => {
        const tear = document.createElement('div');
        tear.classList.add('tear');
        tear.innerText = '😭';
        tear.style.left = Math.random() * 100 + "vw";
        tear.style.animationDuration = (Math.random() * 2 + 1) + "s";
        container.appendChild(tear);
        setTimeout(() => tear.remove(), 3000);
    }, 150);
}

function stopTheTears() {
    clearInterval(rainInterval);
    rainInterval = null;
    document.getElementById('tear-container').innerHTML = '';
}

function copyCode() {
    const code = document.getElementById('entry-number').innerText;
    navigator.clipboard.writeText(code);
    alert("Code copied! See you at the hideout... I mean, wedding.");
}