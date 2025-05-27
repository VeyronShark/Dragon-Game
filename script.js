const dino = document.querySelector('.dino');
const obstacle = document.querySelector('.obstacle');
const gameOverText = document.querySelector(".game-over");
const scoreText = document.querySelector(".score-container");
let score = 0;

let isJumping = false;

document.addEventListener('keydown', (e) => {
  console.log(`Key pressed: ${e.key}`);
  if (e.key === 'ArrowUp' && !isJumping) {
    isJumping = true;

    gsap.to(".dino", {
      yPercent: -300,
      duration: 0.5,
      ease: "Power1.easeOut",
      onComplete: () => {
        gsap.to(".dino", {
          yPercent: 0,
          duration: 0.5,
          ease: "Power1.easeIn",
          onComplete: () => {
            isJumping = false;
          }
        });
      }
    })
  }

  if (e.key === 'ArrowRight'){
    dino.style.left = parseInt(window.getComputedStyle(dino).getPropertyValue('left')) + 50 + "px";
  }
  if (e.key === 'ArrowLeft'){
    dino.style.left = parseInt(window.getComputedStyle(dino).getPropertyValue('left')) - 50 + "px";
  }
});


const spawnObstacle = setInterval(() => {

  gsap.to(".obstacle.animating", {
    x: "-120vw",
    duration: 1.5,
    ease: "none",
    onComplete: () => {
      gsap.to(".obstacle", {
        x: "0vw",
        duration: 0
      });
    }
  })
}, 1500);

const playGame = setInterval(() => {
  const dinoRect = dino.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    dinoRect.right >= obstacleRect.left &&
    dinoRect.bottom > obstacleRect.top &&
    dinoRect.left <= obstacleRect.right
  ) {
    gameOver();
  }
  else {
    score += 1;
    scoreText.innerText = `Your Score: ${score}`;
  }
}, 100);

function gameOver() {
  obstacle.classList.remove("animating");
  gameOverText.style.visibility = "visible";
  clearInterval(playGame);
}