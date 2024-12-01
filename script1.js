let timer;
let timeLeft = 10;
const memes = [
  { image: "Dog_meme.jpeg", quote: "POV: You’re a dev and everything is aligned... except your life." },
  { image: "frog_meme.jpeg", quote: "When you try to center something... but life centers you." },
  { image: "sponge_meme.jpeg", quote: "POV: You just lost the centering challenge." },
];

const draggable = document.getElementById("draggable");
const canvas = document.getElementById("canvas");
const timerDisplay = document.getElementById("timer");
const startGameButton = document.getElementById("startGame");
const memePopup = document.getElementById("memePopup");
const memeImage = document.getElementById("memeImage");
const memeQuote = document.getElementById("memeQuote"); // Add this in your HTML
const retryButton = document.getElementById("retryButton");

function startGame() {
  timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  draggable.style.top = "10px";
  draggable.style.left = "10px";

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      showMeme();
    }
  }, 1000);

 
  enableDrag();
}

function enableDrag() {
  let offsetX, offsetY;

  draggable.addEventListener("mousedown", (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  });

  function onDrag(e) {
    const rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

   
    x = Math.max(0, Math.min(x, canvas.clientWidth - draggable.offsetWidth));
    y = Math.max(0, Math.min(y, canvas.clientHeight - draggable.offsetHeight));

    draggable.style.left = `${x}px`;
    draggable.style.top = `${y}px`;
  }

  function stopDrag() {
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);

  
    if (isCentered()) {
      clearInterval(timer);
      alert("Congrats! You centered it in time! 🎉");
    }
  }
}

function isCentered() {
  const canvasRect = canvas.getBoundingClientRect();
  const draggableRect = draggable.getBoundingClientRect();

  const centerX = canvasRect.width / 2 - draggableRect.width / 2;
  const centerY = canvasRect.height / 2 - draggableRect.height / 2;

  const offsetX = Math.abs(draggableRect.left - canvasRect.left - centerX);
  const offsetY = Math.abs(draggableRect.top - canvasRect.top - centerY);

  return offsetX < 10 && offsetY < 10; 
}

function showMeme() {
  
  const randomMeme = memes[Math.floor(Math.random() * memes.length)];

  
  memeImage.src = randomMeme.image;
  memeQuote.textContent = randomMeme.quote;

  
  memePopup.classList.remove("hidden");
}

retryButton.addEventListener("click", () => {
  memePopup.classList.add("hidden");
  startGame();
});

startGameButton.addEventListener("click", startGame);



    
  

