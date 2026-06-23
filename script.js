document.addEventListener('DOMContentLoaded', () => {

    // ===== MENU BURGER =====
    const burgerBtn = document.getElementById('burger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('hidden');
        burgerIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    }

    if (burgerBtn) {
        burgerBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) toggleMenu();
        });
    });

    // ===== AUDIO-DESCRIPTION =====
    let audioDescActive = false;
    const audioBtn = document.getElementById('audio-desc-btn');
    const audioBtnMobile = document.getElementById('audio-desc-btn-mobile');

    function speak(text) {
        if (!audioDescActive) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
    }

    function toggleAudioDescription() {
        audioDescActive = !audioDescActive;
        const stateText = audioDescActive ? "Audio : ACTIVE" : "Audio";

        if (audioBtn) {
            audioBtn.innerHTML = audioDescActive
                ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072"/></svg> Audio : ON`
                : `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072"/></svg> Audio`;

            if (audioDescActive) {
                audioBtn.classList.add('bg-medical-600', 'text-white', 'border-medical-500');
            } else {
                audioBtn.classList.remove('bg-medical-600', 'text-white', 'border-medical-500');
            }
            audioBtn.setAttribute('aria-pressed', audioDescActive);
        }

        if (audioBtnMobile) {
            audioBtnMobile.textContent = stateText;
            if (audioDescActive) {
                audioBtnMobile.classList.add('bg-medical-600', 'text-white');
            } else {
                audioBtnMobile.classList.remove('bg-medical-600', 'text-white');
            }
        }

        if (audioDescActive) {
            speak("L'audio description est activée. Survolez ou sélectionnez les éléments pour les écouter.");
        } else {
            window.speechSynthesis.cancel();
        }
    }

    if (audioBtn) audioBtn.addEventListener('click', toggleAudioDescription);
    if (audioBtnMobile) audioBtnMobile.addEventListener('click', toggleAudioDescription);

    document.querySelectorAll('[data-read]').forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (audioDescActive) speak(element.getAttribute('data-read'));
        });
        element.addEventListener('focusin', () => {
            if (audioDescActive) speak(element.getAttribute('data-read'));
        });
    });

    // ===== GRAND TEXTE =====
    let largeTextActive = false;
    const largeTextBtn = document.getElementById('large-text-btn');
    const largeTextBtnMobile = document.getElementById('large-text-btn-mobile');

    function toggleLargeText() {
        largeTextActive = !largeTextActive;
        document.body.classList.toggle('large-text', largeTextActive);

        const label = largeTextActive ? 'Texte normal' : 'Grand texte';

        if (largeTextBtn) {
            largeTextBtn.textContent = label;
            largeTextBtn.setAttribute('aria-pressed', largeTextActive);
            largeTextBtn.classList.toggle('active', largeTextActive);
            if (largeTextActive) {
                largeTextBtn.classList.add('bg-medical-600', 'text-white', 'border-medical-500');
            } else {
                largeTextBtn.classList.remove('bg-medical-600', 'text-white', 'border-medical-500');
            }
        }

        if (largeTextBtnMobile) {
            largeTextBtnMobile.textContent = label;
            largeTextBtnMobile.classList.toggle('active', largeTextActive);
            if (largeTextActive) {
                largeTextBtnMobile.classList.add('bg-medical-600', 'text-white');
            } else {
                largeTextBtnMobile.classList.remove('bg-medical-600', 'text-white');
            }
        }
    }

    if (largeTextBtn) largeTextBtn.addEventListener('click', toggleLargeText);
    if (largeTextBtnMobile) largeTextBtnMobile.addEventListener('click', toggleLargeText);
});
