var attemps = 1;
var previousSelection = null;
var currentSelection = null;
var waitTime = false;
var imagesDone = [];

const imagesName = [
     "./images/red.png",
     "./images/orange.png",
     "./images/yellow.png",
     "./images/green.png",
     "./images/blue.png",
     "./images/violet.png",
     "./images/red.png",
     "./images/orange.png",
     "./images/yellow.png",
     "./images/green.png",
     "./images/blue.png",
     "./images/violet.png"
];

const results = {
     victory: [
          {
               image: './images/conejito.jpg',
               text: 'ganaste! chi cheñol!'
          },
          {
               image: './images/conejito2.jpg',
               text: 'ganaste 2! chi cheñol!'
          },
          {
               image: './images/conejito3.jpg',
               text: 'ganaste 3! chi cheñol!'
          }
     ],
     fail: [
          {
               image: './images/cuy.jpg',
               text: 'oh cheñol!'
          },
          {
               image: './images/cuy2.jpg',
               text: ' cheñol!'
          },
          {
               image: './images/cuy3.jpg',
               text: 'heñol!'
          }
     ]
}

function loadImages(){
     let randomImages = revolveArray(imagesName);
     for (let i = 0; i < 12; i++) {
          let currentId = "img" + i.toString();
          document.getElementById(currentId).src = randomImages[i];
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

function restart(){
     attemps = 5;
     previousSelection = null;
     currentSelection = null;
     waitTime = false;
     imagesDone = [];
     loadImages();
     document.getElementById("intentos").innerText = attemps;
     for(let i=0; i<12; i++){
          let image = document.getElementById("img" + i.toString());
          image.classList.replace('no-hidden', 'hidden');
     }
     document.getElementById("finalResult").classList.replace('show', 'very-hidden');
     document.getElementById("finalImage").classList.replace('show', 'very-hidden');
     document.getElementById("finalText").classList.replace('show', 'very-hidden');
     document.getElementById("restartButton").classList.replace('show', 'very-hidden');
}

async function runResult(victory){
     waitTime = true;
     await new Promise(r => setTimeout(r, 1000)); //sleep one second
     let imageElement = document.getElementById("finalImage");
     let textElement = document.getElementById("finalText");
     let property = (victory) ? "victory" : "fail";
     let randomNumber = Math.floor(Math.random() * results[property].length);
     let textResult = (victory) ? "¡GANASTE!" : "PERDISTE";

     document.getElementById("finalResult").classList.replace('very-hidden', 'show');     

     imageElement.classList.replace('very-hidden', 'show');
     imageElement.src = results[property][randomNumber].image;
     textElement.classList.replace('very-hidden', 'show');

     textElement.innerHTML = textResult + "<br/>" + results[property][randomNumber].text;
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
                    if(imagesDone.length === 6){
                         runResult(true);
                    }
               } else {
                    //Si falló
                    attemps--;
                    document.getElementById("intentos").innerHTML = attemps;
                    if(attemps === 0){
                         runResult(false);
                    }else{
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