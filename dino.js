const dino = document.getElementById('dino');
const gameContainer = document.querySelector('.game-container');
const scoreDisplay = document.getElementById('score'); // Elemento para mostrar la puntuación
let score = 0; // Inicializar puntuación
let speed = 5; // Velocidad inicial del cactus
let gameOver = false; // Estado del juego
let isJumping = false; // Estado de salto

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !gameOver && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true; // Marcar que el dino está saltando
    dino.classList.add('jump');

    setTimeout(function() {
        dino.classList.remove('jump');
    }, 300); // Duración del salto

    // Establecer un tiempo de espera de 600 ms antes de permitir otro salto
    setTimeout(function() {
        isJumping = false; // Permitir otro salto después de que el tiempo de espera haya pasado
    }, 500); // Tiempo de espera de 600 ms
}

function createCactus() {
    const cactus = document.createElement('div');
    cactus.classList.add('cactus');
    cactus.style.right = '25px'; // Posición inicial del primer cactus
    gameContainer.appendChild(cactus);

    let cactusAnimation = setInterval(function() {
        if (gameOver) {
            clearInterval(cactusAnimation);
            return; // Detener la animación si el juego ha terminado
        }

        let cactusRight = parseInt(window.getComputedStyle(cactus).getPropertyValue('right'));

        if (cactusRight > window.innerWidth) {
            clearInterval(cactusAnimation);
            cactus.remove(); // Eliminar cactus cuando sale de la pantalla
            updateScore(); // Actualizar puntuación cuando se evita el cactus
        } else {
            cactus.style.right = cactusRight + speed + 'px'; // Mover cactus a la izquierda
        }

        checkCollision(cactus, cactusAnimation);
    }, 20);
}

function checkCollision(cactus, cactusAnimation) {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
    let cactusLeft = window.innerWidth - parseInt(window.getComputedStyle(cactus).getPropertyValue('right')); // Calcular la posición izquierda del cactus

    // Ajustar valores de colisión
    if (cactusLeft < 80 && cactusLeft > 50 && dinoTop <= 30) {
        gameOver = true; // Cambiar estado del juego
        alert('¡Game Over! Tu puntuación: ' + score);
        clearInterval(cactusAnimation); // Detener animación del cactus
        cactus.remove(); // Eliminar cactus en caso de colisión
    }
}

// Actualizar función de puntuación
function updateScore() {
    score += 10; // Incrementar puntuación
    scoreDisplay.innerText = 'score: ' + score; // Actualizar visualización de puntuación
}

// Aumentar velocidad con el tiempo
function increaseSpeed() {
    if (score > 0 && score % 10 === 0) { // Aumentar velocidad cada 10 puntos
        speed += 0.15; // Aumentar velocidad
    }
}

// Crear cactus cada 2 segundos
setInterval(function() {
    if (!gameOver) {
        createCactus();
        increaseSpeed(); // Aumentar velocidad después de crear un cactus
    }
}, 2000);

// Crear el primer cactus después de un retraso
setTimeout(createCactus, 1000); // Esperar 1 segundo antes de crear el primer cactus

// Evento para cambiar la apariencia del dino
document.getElementById('changeDinoButton').addEventListener('click', function() {
    if (dino.classList.contains('dino')) {
        dino.classList.remove('dino');
        dino.classList.add('dino2');
    } else {
        dino.classList.remove('dino2');
        dino.classList.add('dino');
    }
});


