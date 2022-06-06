// Obtener elementos de la pagina
var tablero = document.getElementById("cajaLetras");
var contenedorError = document.getElementById("contenedorError");
var nuevoJuego = document.getElementById("nuevoJuego");
nuevoJuego.addEventListener("click", juegoNuevo)
var letraIngresada = document.getElementById("letraIngresada");
letraIngresada.addEventListener("input", validarLetraInput);
//obtener Arreglo de palabras del almacenamiento local
palabras = JSON.parse(localStorage.getItem('myArray'));

function seleccionarPalabra() { //palabra aleatoria del array
    palabra = palabras[Math.floor(Math.random() * palabras.length)]
    return palabra;
}

function crearTablero() { //tablero de juego "Guiones para la palabra secreta"
    seleccionarPalabra();
    numLetras = palabra.length;
    for (i = 0; i < numLetras; i++) {
        var letra = document.createElement("label");
        tablero.appendChild(letra)
    }    
    return arrayPalabras = tablero.children; // Retorna un arrray donde se agrgaran las letras "Array de labels"
}
crearTablero();
window.onload = function () {//Funcion para escuchar evento onkeypress
    document.onkeypress = validarLetra;
}

// Funcion para validar letra presionada
var error = 0;
var intentos = 8;
var juegoGanado = false;

//Se crea un array para las letra erroneas
var letrasError = new Array();
function validarLetra(evObject) {    
    letraIngresada.value = "";// Borrar letra ingresada    
    var existe;//existencia de letra correcta    
    var errorExiste;// Existencia de letra erronea    
    var letraPresionada = String.fromCharCode(evObject.which);//datos de entrada
    letraPresionada = letraPresionada.charCodeAt(0);    
    letras = Array.from(palabra)//convertimos "palabra" en un array de letras    
    var arrayNuevo = new Array()// array para comparar resultados    
    if (intentos > 0 && !juegoGanado) {//comienza la validacion
        if ((letraPresionada > 64 && letraPresionada < 91) || (letraPresionada > 96 && letraPresionada < 123)) {
            letraPresionada = String.fromCharCode(letraPresionada).toUpperCase();
            for (i = 0; i < letras.length; i++) {
                if (letraPresionada == letras[i]) {
                    arrayPalabras[i].textContent = letraPresionada
                    existe = true;
                }
            }            
            if (!existe) {// si existe la letra presionada o no y se dibuja parte del dibujo
                for (j = 0; j < letrasError.length; j++) {
                    if (letraPresionada == letrasError[j]) {
                        errorExiste = true;
                    }
                }
                if (!errorExiste) {
                    error++;
                    letrasError.push(letraPresionada);
                    dibujar(error)
                    intentos--;
                    contenedorError.textContent = letrasError.join("")
                }
            }            
            for (i = 0; i < arrayPalabras.length; i++) {// Mensaje ganador
                arrayNuevo.push(arrayPalabras[i].textContent)
            }
            if (JSON.stringify(letras) === JSON.stringify(arrayNuevo) && intentos > 0) {
                swal("Felicidades!", "Has descubierto la palabra secreta!", "success");
                juegoGanado = true;
            }            
            if (intentos == 0) {//Mensaje perdedor
                swal("Has perdido!", "Respuesta: " + palabra, "error");
            }
        }
    }
}

/*--------Validacion del input text letra------*/
function validarLetraInput(evObject) {    
    var existe;//existencia de letra correcta    
    var errorExiste;// Existencia de letra erronea    
    var letraPresionada = letraIngresada.value;// preparacion de datos de entrada!
    letraPresionada = letraPresionada.charCodeAt(0);     
    letras = Array.from(palabra)//convertimos "palabra" en un array de letras    
    var arrayNuevo = new Array()// array para comparar resultados

    
    if (intentos > 0 && !juegoGanado) {//comienza la validacion
        if ((letraPresionada > 64 && letraPresionada < 91) || (letraPresionada > 96 && letraPresionada < 123)) {
            letraPresionada = String.fromCharCode(letraPresionada).toUpperCase();
            for (i = 0; i < letras.length; i++) {
                if (letraPresionada == letras[i]) {
                    arrayPalabras[i].textContent = letraPresionada
                    existe = true;
                }
            }            
            if (!existe) {//si existe la letra presionada o no y se dibuja parte del dibujo
                for (j = 0; j < letrasError.length; j++) {
                    if (letraPresionada == letrasError[j]) {
                        errorExiste = true;
                    }
                }
                if (!errorExiste) {
                    error++;
                    letrasError.push(letraPresionada);
                    dibujar(error)
                    intentos--;
                    contenedorError.textContent = letrasError.join("")
                }
            }            
            for (i = 0; i < arrayPalabras.length; i++) {// Mensaje ganador
                arrayNuevo.push(arrayPalabras[i].textContent)
            }
            if (JSON.stringify(letras) === JSON.stringify(arrayNuevo) && intentos > 0) {
                swal("Felicidades!", "Has descubierto la palabra secreta!", "success");
                juegoGanado = true;
            }            
            if (intentos == 0) {//Mensaje perdedor
                swal("Has perdido!", "Respuesta: " + palabra, "error");
            }
        }
    }    
    letraIngresada.value = "";// Borrar letra ingresada
}
function juegoNuevo() {
    location.reload()
}
/*//ocultar pie en juego
pantalla = document.getElementById("pie")
if (screen.width < 480) {
    pie.style.display = "none";
}*/