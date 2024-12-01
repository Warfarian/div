const buttons = document.querySelectorAll('.btn');
const quote = document.getElementById('quote');
const explanation = document.getElementById('explanation');
const centeredBox = document.getElementById('centered-box');
const meme = document.getElementById('meme');
const heading = document.getElementById('spooky-heading');
const container = document.getElementById('container');
const textualCode = document.createElement('div');
textualCode.classList.add('textual-code');
centeredBox.appendChild(textualCode);

// Create only the back arrow button
const backArrowBtn = document.createElement('button');
backArrowBtn.classList.add('back-btn', 'options-btn', 'hidden');
backArrowBtn.innerHTML = '&#8592;';
document.body.appendChild(backArrowBtn);

// Handle back arrow click
backArrowBtn.addEventListener('click', () => {
    // Hide content
    centeredBox.classList.remove('visible');
    backArrowBtn.classList.add('hidden');
    
    // Show options
    setTimeout(() => {
        container.classList.remove('hidden');
        heading.style.opacity = '1';
    }, 300);
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        // Hide options
        container.classList.add('hidden');
        heading.style.opacity = '0';
        
        // Show content and back arrow
        centeredBox.classList.add('visible');
        backArrowBtn.classList.remove('hidden');

        // Clear previous content
        textualCode.innerHTML = '';
        textualCode.style.opacity = '0';

        if (button.id === 'flexbox-btn') {
            showContent('flexbox');
        } else if (button.id === 'grid-btn') {
            showContent('grid');
        } else if (button.id === 'absolute-btn') {
            showContent('absolute');
        }
    });
});

function showContent(type) {
    const content = {
        flexbox: {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzjj50EsEV-9WYHxamJOWc8p0Zm8Lfu9KlA&s",
            quote: "Life's too short to not be centered. Thank you, Flexbox.",
            explanation: "Flexbox is like the queen of centering! With its magical powers, it ensures your elements align perfectly in the center of their container.",
            code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`
        },  
        grid: {
            image: "images/flex.gif",
            quote: "Why settle for chaos when you can have grid-based perfection",
            explanation: "Grid is for the perfectionists! It's precise, organized, and offers great control over your layout.",
            code: `.container {
  display: grid;
  place-items: center;
  height: 100vh;
}`
        },
        absolute: {
            image: "images/absolutePos.jpg",
            quote: "In a world of flex and grid, absolute stands firm and owns the corner.",
            explanation: "Absolute positioning may feel like chaos, but it's effective! Just be ready for the drama of it!",
            code: `.container {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`
        }
    };

    meme.src = content[type].image;
    quote.innerHTML = content[type].quote;
    explanation.innerHTML = content[type].explanation;

    setTimeout(() => {
        textualCode.innerHTML = `
            <h3>${type.charAt(0).toUpperCase() + type.slice(1)} Code Representation:</h3>
            <pre>${content[type].code}</pre>`;
        textualCode.style.opacity = 1;
    }, 1000);
}

document.querySelector('.back-btn').onclick = function() {
    window.location.href = 'index.html';
}

