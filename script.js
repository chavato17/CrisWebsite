const words = [
    "CRIS",
    "CJ",
    "AYUBAN",
    "PONG"
];

let index = 0;
const textElement = document.getElementById("changing-text");
const wrapperElement = document.getElementById("rotator-wrapper");

function calculateWordWidth(wordText) {
    const hiddenSpan = document.createElement("span");
    hiddenSpan.style.visibility = "hidden";
    hiddenSpan.style.position = "absolute";
    hiddenSpan.style.whiteSpace = "nowrap";
    hiddenSpan.style.fontFamily = '"Syne", sans-serif';
    hiddenSpan.style.fontWeight = "800";           
    hiddenSpan.style.fontSize = getComputedStyle(textElement).fontSize;        
    
    hiddenSpan.textContent = wordText;
    document.body.appendChild(hiddenSpan);
    const calculatedWidth = hiddenSpan.getBoundingClientRect().width;
    document.body.removeChild(hiddenSpan);
    
    return calculatedWidth;
}

function initTextRotator() {

    const initialWidth = calculateWordWidth(words[index]);
    wrapperElement.style.width = `${initialWidth}px`;

    setInterval(() => {
        textElement.classList.add("hidden");

        index = (index + 1) % words.length;
        const nextWord = words[index];
        const nextWidth = calculateWordWidth(nextWord);

        setTimeout(() => {
            wrapperElement.style.width = `${nextWidth}px`;
            textElement.textContent = nextWord;
            
            textElement.classList.remove("hidden");
        }, 300);

    }, 2200);
}

window.addEventListener("DOMContentLoaded", initTextRotator);



(function(){
    const viewport = document.querySelector('.slider-viewport');
    const container = document.getElementById('projectsContainer');
    const cards = container.querySelectorAll('.projects-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let scrollPos = 0; // current translateX offset in px

    function getStep(){
        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        return cards[0].getBoundingClientRect().width + gap;
    }

    function getMaxScroll(){
        return Math.max(0, container.scrollWidth - viewport.clientWidth);
    }

    function apply(){
        const maxScroll = getMaxScroll();
        scrollPos = Math.min(scrollPos, maxScroll); // re-clamp on resize too
        container.style.transform = `translateX(-${scrollPos}px)`;
        prevBtn.disabled = scrollPos <= 0;
        nextBtn.disabled = scrollPos >= maxScroll;
    }

    function next(){
        const maxScroll = getMaxScroll();
        scrollPos = Math.min(scrollPos + getStep(), maxScroll); // snaps to show last card fully
        apply();
    }

    function prev(){
        scrollPos = Math.max(scrollPos - getStep(), 0); // snaps to show first card fully
        apply();
    }

    prevBtn.addEventListener('click', next === next ? prev : prev); // (kept simple below)
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    });

    window.addEventListener('resize', apply);
    apply();
})();