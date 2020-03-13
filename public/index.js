var attemps = 4;
var previousSelection = null;
var currentSelection = null;
var waitTime = false;
var imagesDone = [];

const results = {
     victory: [
          {
               image: './images/razas/angora-aleman.jpg',
               text: 'Tu Premio: Angora Aleman'
          },
          {
               image: './images/razas/arlequin.jpg',
               text: 'Tu Premio: Arlequin'
          },
          {
               image: './images/razas/angora.jpg',
               text: 'Tu Premio: Angora'
          },
          {
               image: './images/razas/belier-holandes.jpg',
               text: 'Tu Premio: Belier Holandes'
          },
          {
               image: './images/razas/blanco-de-hotot.jpg',
               text: 'Tu Premio: Blanco de Hotot'
          },
          {
               image: './images/razas/cabeza-de-leon.jpg',
               text: 'Tu Premio: Cabeza de Leon'
          },
          {
               image: './images/razas/mini-rex.jpg',
               text: 'Tu Premio: Mini Rex'
          },
          {
               image: './images/razas/tan.jpg',
               text: 'Tu Premio: Tan'
          }
     ],
     fail: [
          {
               image: './images/animales/ardilla.jpg',
               text: 'Premio Consuelo: Ardilla'
          },
          {
               image: './images/animales/buho.jpg',
               text: ' Premio Consuelo: Buho'
          },
          {
               image: './images/animales/carpincho.jpg',
               text: 'Premio Consuelo: Carpincho'
          },
          {
               image: './images/animales/cuy.jpg',
               text: 'Premio Consuelo: Cuy'
          },
          {
               image: './images/animales/gallina.jpg',
               text: 'Premio Consuelo: Pollo'
          },
          {
               image: './images/animales/kiwi.png',
               text: 'Premio Consuelo: Kiwi'
          },
          {
               image: './images/animales/oveja.jpg',
               text: 'Premio Consuelo: Oveja'
          },
          {
               image: './images/animales/paloma.jpg',
               text: 'Premio Consuelo: Paloma'
          },
          {
               image: './images/animales/raton.jpeg',
               text: 'Premio Consuelo: Raton'
          }
     ]
}

const rabbitImages = [
     './images/conejos/c1.jpg',
     './images/conejos/c2.jpg',
     './images/conejos/c3.jpg',
     './images/conejos/c4.jpg',
     './images/conejos/c5.jpg',
     './images/conejos/c6.png',
     './images/conejos/c7.jpg',
     './images/conejos/c8.jpg',
     './images/conejos/c9.jpg',
     './images/conejos/c10.jpg',
     './images/conejos/c11.jpg',
     './images/conejos/c12.jpg',
     './images/conejos/c13.jpg',
     './images/conejos/c14.jpg',
     './images/conejos/c15.jpg'
];

function loadImages() {
     let randomImages = revolveArray(rabbitImages);
     let sixImages = randomImages.slice(0,6);
     let twelveImages = sixImages.concat(sixImages);
     twelveImages = revolveArray(twelveImages);
     for (let i = 0; i < 12; i++) {
          let currentId = "img" + i.toString();
          document.getElementById(currentId).src = twelveImages[i];
     }
}

window.onload = () => {
     loadImages();
}

function hideImage() {
     previousSelection.classList.replace('no-hidden', 'hidden');
     currentSelection.classList.replace('no-hidden', 'hidden');
     previousSelection = null;
     currentSelection = null;
     waitTime = false;
}

function restart() {
     attemps = 4;
     previousSelection = null;
     currentSelection = null;
     waitTime = false;
     imagesDone = [];
     loadImages();
     document.getElementById("intentos").innerText = attemps;
     for (let i = 0; i < 12; i++) {
          let image = document.getElementById("img" + i.toString());
          image.classList.replace('no-hidden', 'hidden');
     }
     document.getElementById("finalResult").classList.replace('show', 'very-hidden');
     document.getElementById("finalImage").classList.replace('show', 'very-hidden');
     document.getElementById("finalImage").src = "";
     document.getElementById("finalText").classList.replace('show', 'very-hidden');
     document.getElementById("restartButton").classList.replace('show', 'very-hidden');
}

async function runResult(victory) {
     waitTime = true;
     let property = (victory) ? "victory" : "fail";
     let imageElement = document.getElementById("finalImage");
     let textElement = document.getElementById("finalText");
     let randomNumber = Math.floor(Math.random() * results[property].length);
     let textResult = (victory) ? "¡GANASTE!" : "PERDISTE";
     imageElement.src = results[property][randomNumber].image;
     textElement.innerHTML = textResult + "<br/>" + results[property][randomNumber].text;
     //Sleep one second
     await new Promise(r => setTimeout(r, 1000)); 
     //Show all hidden elements
     document.getElementById("finalResult").classList.replace('very-hidden', 'show');
     imageElement.classList.replace('very-hidden', 'show');
     textElement.classList.replace('very-hidden', 'show');
     document.getElementById("restartButton").classList.replace('very-hidden', 'show');
}

document.getElementById('restartButton').addEventListener('click', restart);

document.querySelectorAll('.image').forEach(item => {
     item.addEventListener('click', event => {
          //Si está en tiempo de espera o la imagen seleccionada ya fue acertada no hace nada
          if (waitTime || imagesDone.includes(event.target.src) || event.target === previousSelection) {
               return 0;
          }
          event.target.classList.remove('hidden');
          event.target.classList.add('no-hidden');
          //Si es el primer intento
          if (previousSelection === null) {
               previousSelection = event.target;
          } else {
               //Si acertó
               if (previousSelection.src === event.target.src) {
                    previousSelection = null;
                    imagesDone.push(event.target.src);
                    if (imagesDone.length === 6) {
                         runResult(true);
                    }
               } else {
                    //Si falló
                    attemps--;
                    document.getElementById("intentos").innerHTML = attemps;
                    if (attemps === 0) {
                         runResult(false);
                    } else {
                         currentSelection = event.target;
                         waitTime = true;
                         setTimeout(hideImage, 1000);
                    }
               }
          }
     })
});

/*
     Devuelve un array con una serie de numeros consecutivos que van desde start (inclusive) hasta end (sin incluir)
     ordenados de manera aleatoria. Puede tomar numeros negativos. end debe ser mayor que start. start por defecto es 0.
*/
function randomNumberSerie(end, start = 0) {
     if (end <= start) {
          throw Error("Invalid Parameters: End must be bigger than start");
     }
     let randomNumbers = [];
     while (randomNumbers.length < Math.abs(end - start)) {
          let newNumber = Math.floor(Math.random() * (end - start)) + start;
          if (!randomNumbers.includes(newNumber)) {
               randomNumbers.push(newNumber);
          }
     }
     return randomNumbers;
}

/*
     Devuelve un nuevo array con los elementos del array recibido mezclados al azar
*/
function revolveArray(array) {
     let randomIndexes = randomNumberSerie(array.length);
     let randomArray = [];
     for (let randomIndex of randomIndexes) {
          randomArray.push(array[randomIndex]);
     }
     return randomArray;
}