let palabraSeleccionada = "";
let palabraOculta = "";
let letrasAdivinadas = [];
let intentos = 7;
let temas;

document.addEventListener("DOMContentLoaded", function () {
    const themeSelector = document.getElementById("theme-selector");
    const letterInput = document.getElementById("letter-input");
    const guessButton = document.getElementById("guess-button");
    const resultElement = document.getElementById("result");
    const playerNameInput = document.getElementById("player-name");

    async function cargarTemas() {
        try {
            const response = await fetch('./js/temas.json');
            temas = await response.json();
        } catch (error) {
            console.error('Error al cargar los temas:', error);
        }
    }

    function elegirTematica() {
        const temaElegido = themeSelector.value;
        return temas[temaElegido];
    }

    function seleccionarPalabra(tematicaSeleccionada) {
        const eleccionAleatoria = Math.floor(Math.random() * tematicaSeleccionada.length);
        return tematicaSeleccionada[eleccionAleatoria].palabra;
    }

    function ocultarPalabra(palabra) {
        return palabra.replace(/./g, "*");
    }

    function mostrarPalabraEnDOM() {
        const hiddenWordElement = document.getElementById("hidden-word");
        hiddenWordElement.textContent = "Palabra oculta: " + palabraOculta;
    }

    function mostrarLetrasAdivinadasEnDOM() {
        const guessedLettersElement = document.getElementById("guessed-letters");
        guessedLettersElement.textContent = "Letras adivinadas: " + letrasAdivinadas.join(", ");
    }

    function mostrarIntentosEnDOM() {
        const attemptsElement = document.getElementById("attempts");
        attemptsElement.textContent = "Intentos restantes: " + intentos;
    }

    function actualizarPalabraOculta(palabra, palabraOculta, letra) {
        let nuevaPalabraOculta = "";
        for (let i = 0; i < palabra.length; i++) {
            if (palabra[i] === letra) {
                nuevaPalabraOculta += letra;
            } else {
                nuevaPalabraOculta += palabraOculta[i];
            }
        }
        return nuevaPalabraOculta;
    }

    function reiniciarJuego() {
        palabraSeleccionada = "";
        palabraOculta = "";
        letrasAdivinadas = [];
        intentos = 7;
        resultElement.textContent = "";
        playerNameInput.value = "";
        mostrarPalabraEnDOM();
        mostrarLetrasAdivinadasEnDOM();
        mostrarIntentosEnDOM();
        mostrarPuntajes();
        mostrarPalabraEraEnDOM(); 
    }

    async function jugarAhorcado() {
        if (intentos === 0) {
            mostrarResultadoEnDOM("¡BUUUUUUU! Se te acabó la vida, ¡BYE!");
            mostrarPalabraEraEnDOM(); 
            return;
        }

        const letter = letterInput.value.toLowerCase().trim();
        if (letter === "" || letrasAdivinadas.includes(letter)) {
            return;
        }

        intentos--;
        letrasAdivinadas.push(letter);
        letterInput.value = '';

        if (palabraSeleccionada.includes(letter)) {
            palabraOculta = actualizarPalabraOculta(palabraSeleccionada, palabraOculta, letter);
        }

        mostrarPalabraEnDOM();
        mostrarLetrasAdivinadasEnDOM();
        mostrarIntentosEnDOM();

        if (palabraOculta === palabraSeleccionada) {
            mostrarResultadoEnDOM("¡VAMOOOOOO! Le pegaste a la palabra, ¡GANADOR!");
            mostrarPalabraEraEnDOM(); 
            guardarPuntaje(playerNameInput.value, intentos); 
            mostrarPuntajes(); 
        } else if (intentos === 0) {
            mostrarResultadoEnDOM("¡BUUUUUUU! Se te acabó la vida, ¡BYE!");
            mostrarPalabraEraEnDOM(); 
        }
    }

    guessButton.addEventListener("click", jugarAhorcado);

    function mostrarResultadoEnDOM(resultado) {
        const playerName = playerNameInput.value;
        let resultMessage = resultado;
    
        if (intentos === 0) {
            resultMessage += resultado;
            guardarPuntaje(playerName, intentos);
            mostrarPuntajes();
            mostrarPalabraEraEnDOM();
        }
    
        resultElement.innerHTML = resultMessage;
        mostrarNombreYPuntaje(playerName, intentos);
    }

    function mostrarNombreYPuntaje(nombre, puntaje) {
        const playerNameElement = document.createElement("p");
        playerNameElement.textContent = nombre + ", tu puntuación es " + puntaje;
        resultElement.appendChild(playerNameElement);
    }

    function guardarPuntaje(nombre, puntaje) {
        const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
        const nuevoPuntaje = { nombre, puntaje };
        const index = puntajes.findIndex(p => p.nombre === nombre);
        if (index !== -1) {
            puntajes[index] = nuevoPuntaje;
        } else {
            puntajes.push(nuevoPuntaje);
        }
        puntajes.sort((a, b) => b.puntaje - a.puntaje);
        if (puntajes.length > 5) {
            puntajes.pop();
        }
        localStorage.setItem("puntajes", JSON.stringify(puntajes));
    }

    function mostrarPuntajes() {
        const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
        const puntajesElement = document.getElementById("high-scores");
        puntajesElement.innerHTML = "";
        if (puntajes.length > 0) {
            puntajesElement.innerHTML = "<h3>Puntajes más altos:</h3>";
            for (const puntaje of puntajes) {
                const puntajeItem = document.createElement("p");
                puntajeItem.textContent = puntaje.nombre + ": " + puntaje.puntaje;
                puntajesElement.appendChild(puntajeItem);
            }
        }
    }

    function mostrarPalabraEraEnDOM() {
        const palabraEraElement = document.getElementById("palabra-era");
        palabraEraElement.textContent = "La palabra era: " + palabraSeleccionada;
    }

    cargarTemas().then(() => {
        themeSelector.addEventListener("change", function () {
            reiniciarJuego();
            const temaSeleccionado = elegirTematica();
            palabraSeleccionada = seleccionarPalabra(temaSeleccionado);
            palabraOculta = ocultarPalabra(palabraSeleccionada);
            mostrarPalabraEnDOM();
            mostrarLetrasAdivinadasEnDOM();
            mostrarIntentosEnDOM();
        });

        mostrarPuntajes();
        jugarAhorcado();
    });
});
