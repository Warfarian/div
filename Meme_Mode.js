const buttons = document.querySelectorAll('.btn');
const quote = document.getElementById('quote');
const explanation = document.getElementById('explanation');
const centeredBox = document.getElementById('centered-box');
const meme = document.getElementById('meme');
const heading = document.getElementById('spooky-heading');
const flexboxCode = document.getElementById('flexbox-code');
const gridCode = document.getElementById('grid-code');
const absoluteCode = document.getElementById('absolute-code');
const textualCode = document.createElement('div'); // New div to hold the textual code
textualCode.classList.add('textual-code');
centeredBox.appendChild(textualCode); // Append it below the meme

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        // Hide all buttons
        buttons.forEach(btn => {
            btn.classList.add('hidden');
        });

        // Hide the heading
        heading.style.opacity = 0;

        // Show the quote and explanation for the hovered button
        centeredBox.style.opacity = 1;

        // Clear previous code representation
        textualCode.innerHTML = '';
        textualCode.style.opacity = 0; // Hide previous code block immediately

        // Display meme and explanation for each button
        if (button.id === 'flexbox-btn') {
            meme.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJzjj50EsEV-9WYHxamJOWc8p0Zm8Lfu9KlA&s";
            quote.innerHTML = "Life’s too short to not be centered. Thank you, Flexbox.";
            explanation.innerHTML = "Flexbox is like the queen of centering! With its magical powers, it ensures your elements align perfectly in the center of their container.It's easy and quick—just use `display: flex;` and `justify-content: center;` to achieve perfect alignment."; 
        

            // After 2 seconds, show the Flexbox code representation smoothly
            setTimeout(() => {
                textualCode.innerHTML = `
                <h3>Flexbox Code Representation:</h3>
                <pre>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
                </pre>`;
                textualCode.style.opacity = 1; // Smooth fade-in
            }, 2000);
        } else if (button.id === 'grid-btn') {
            meme.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2lvns_8IPUhF8x7Z7be6SMHqW_pmAHBQjtA&s";
            quote.innerHTML = "Why settle for chaos when you can have grid-based perfection";
            explanation.innerHTML = "Grid is for the perfectionists! It's precise, organized, and offers great control over your layout. With `display: grid;`, you can create a structured grid system and center your elements in rows and columns.";
            // After 2 seconds, show the Grid code representation smoothly
            setTimeout(() => {
                textualCode.innerHTML = `
                <h3>Grid Code Representation:</h3>
                <pre>
.container {
  display: grid;
  place-items: center;
  height: 100vh;
}
                </pre>`;
                textualCode.style.opacity = 1; // Smooth fade-in
            }, 2000);
        } else if (button.id === 'absolute-btn') {
            meme.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2EKsdk-SnbXqaFftcG0Z6wIIwqGRROD-_eQ&s";
            quote.innerHTML = "In a world of flex and grid, absolute stands firm and owns the corner.";
            explanation.innerHTML = "Absolute positioning may feel like chaos, but it’s effective! Using `position: absolute;` you can place an element wherever you want in relation to its nearest positioned ancestor. Just be ready for the drama of it!";

            // After 2 seconds, show the Absolute code representation smoothly
            setTimeout(() => {
                textualCode.innerHTML = `
                <h3>Absolute Positioning Code Representation:</h3>
                <pre>
.container {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
                </pre>`;
                textualCode.style.opacity = 1; // Smooth fade-in
            }, 2000);
        }

        // No time limit for meme and quote display
    });

    button.addEventListener('mouseleave', () => {
        // Reset all buttons back to default visibility
        buttons.forEach(btn => {
            btn.classList.remove('hidden');
        });
        centeredBox.style.opacity = 0;

        // Show the heading again when mouse leaves button
        heading.style.opacity = 1;

        // Hide code representation after mouse leaves
        textualCode.style.opacity = 0; // Smooth fade-out
    });
});

document.querySelector('.back-btn').onclick = function() {
    window.location.href = 'index.html';
}

