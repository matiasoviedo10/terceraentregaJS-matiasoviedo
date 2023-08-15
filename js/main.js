    // Tema de Colores
    const palabrasColores = [
        { palabra: "rojo", descripcion: "Un color cálido y brillante." },
        { palabra: "azul", descripcion: "Un color que representa el cielo y el mar." },
        { palabra: "verde", descripcion: "Un color asociado con la naturaleza y la esperanza." },
        { palabra: "amarillo", descripcion: "Un color brillante y alegre." },
        { palabra: "naranja", descripcion: "Un color vibrante y lleno de energía." },
        { palabra: "morado", descripcion: "Un color misterioso y elegante." },
        { palabra: "rosa", descripcion: "Un color suave y romántico." },
        { palabra: "gris", descripcion: "Un color neutro y sofisticado." },
        { palabra: "blanco", descripcion: "Un color puro y limpio." },
        { palabra: "negro", descripcion: "Un color elegante y misterioso." },
    ];

    // Temas de frutas
    const palabrasFrutas = [
        { palabra: "manzana", descripcion: "Una fruta roja y jugosa." },
        { palabra: "pláta   no", descripcion: "Una fruta amarilla y dulce." },
        { palabra: "naranja", descripcion: "Una fruta cítrica y refrescante." },
        { palabra: "uva", descripcion: "Una fruta pequeña y jugosa que puede ser verde o morada." },
        { palabra: "sandía", descripcion: "Una fruta grande y refrescante, con pulpa roja y semillas negras." },
        { palabra: "fresa", descripcion: "Una fruta pequeña y roja, con sabor dulce y ácido." },
        { palabra: "mango", descripcion: "Una fruta tropical de color amarillo y sabor dulce." },
        { palabra: "piña", descripcion: "Una fruta tropical y jugosa, con sabor dulce y ácido." },
        { palabra: "kiwi", descripcion: "Una fruta pequeña y verde, con sabor refrescante." },
        { palabra: "pera", descripcion: "Una fruta jugosa y de forma alargada." },
    ];
    
    // Tema de Animales
    const palabrasAnimales = [
        { palabra: "perro", descripcion: "Un amigo fiel del hombre." },
        { palabra: "gato", descripcion: "Un felino independiente y cariñoso." },
        { palabra: "elefante", descripcion: "Un animal de gran tamaño con trompa." },
        { palabra: "león", descripcion: "El rey de la selva." },
        { palabra: "jirafa", descripcion: "Un animal con cuello largo." },
        { palabra: "tigre", descripcion: "Un felino rayado y feroz." },
        { palabra: "oso", descripcion: "Un animal grande y peludo." },
        { palabra: "mono", descripcion: "Un primate juguetón." },
        { palabra: "delfín", descripcion: "Un mamífero marino inteligente." },
        { palabra: "pingüino", descripcion: "Un ave que vive en el hielo." },
    ];
    
    // Tema de Cosas en una Ciudad
    const palabrasCiudad = [
        { palabra: "parque", descripcion: "Un lugar verde y relajante para el esparcimiento." },
        { palabra: "biblioteca", descripcion: "Un lugar para leer y obtener información." },
        { palabra: "hospital", descripcion: "Un lugar para recibir atención médica." },
        { palabra: "escuela", descripcion: "Un lugar para estudiar y aprender." },
        { palabra: "supermercado", descripcion: "Un lugar para comprar alimentos y otros productos." },
        { palabra: "teatro", descripcion: "Un lugar para disfrutar de obras y espectáculos." },
        { palabra: "cafetería", descripcion: "Un lugar para tomar café y merendar." },
        { palabra: "estación", descripcion: "Un lugar donde llegan y salen trenes o autobuses." },
        { palabra: "iglesia", descripcion: "Un lugar de culto y oración." },
        { palabra: "museo", descripcion: "Un lugar para apreciar arte y objetos históricos." },
    ];
    // Tema de Países
    const palabrasPaises = [
        { palabra: "estadosunidos", descripcion: "Un país grande y diverso en América del Norte." },
        { palabra: "japon", descripcion: "Un país insular en el este de Asia, conocido por su cultura única." },
        { palabra: "italia", descripcion: "Un país europeo famoso por su gastronomía y arte." },
        { palabra: "brasil", descripcion: "Un país sudamericano conocido por su cultura y fútbol." },
        { palabra: "australia", descripcion: "Un país y continente rodeado de océanos, conocido por su fauna única." },
        { palabra: "india", descripcion: "Un país en el sur de Asia, famoso por su rica historia y cultura." },
        { palabra: "egipto", descripcion: "Un país africano conocido por sus antiguas pirámides y tesoros arqueológicos." },
        { palabra: "rusia", descripcion: "Un país transcontinental que se extiende desde Europa del Este hasta Asia del Norte." },
        { palabra: "canada", descripcion: "Un país norteamericano conocido por su belleza natural y vastos paisajes." },
        { palabra: "argentina", descripcion: "Un país sudamericano famoso por su tango y cultura gauchesca." },
    ];
    

// Variables globales
let palabraSeleccionada = "";
let palabraOculta = "";
let letrasAdivinadas = [];
let intentos = 7;

document.addEventListener("DOMContentLoaded", function () {
    const themeSelector = document.getElementById("theme-selector");
    themeSelector.addEventListener("change", function () {
        const temaSeleccionado = elegirTematica();
        palabraSeleccionada = seleccionarPalabra(temaSeleccionado);
        palabraOculta = ocultarPalabra(palabraSeleccionada);
        mostrarPalabraEnDOM();
        mostrarLetrasAdivinadasEnDOM();
        mostrarIntentosEnDOM();
    });

    const letterInput = document.getElementById("letter-input");
    const guessButton = document.getElementById("guess-button");
    guessButton.addEventListener("click", jugarAhorcado);

    // Función para elegir la temática basada en la selección del usuario
    function elegirTematica() {
        const temaElegido = themeSelector.value;

        switch (temaElegido) {
            case "colores":
                return palabrasColores;
            case "frutas":
                return palabrasFrutas;
            case "animales":
                return palabrasAnimales;
            case "ciudad":
                return palabrasCiudad;
            case "paises":
                return palabrasPaises;
            default:
                alert("Opción inválida. Seleccionando temática por defecto (Colores).");
                return palabrasColores;
        }
    }

    // Función para mostrar la palabra oculta en el DOM
    function mostrarPalabraEnDOM() {
        const hiddenWordElement = document.getElementById("hidden-word");
        hiddenWordElement.textContent = "Palabra oculta: " + palabraOculta;
    }

    // Función para mostrar las letras adivinadas en el DOM
    function mostrarLetrasAdivinadasEnDOM() {
        const guessedLettersElement = document.getElementById("guessed-letters");
        guessedLettersElement.textContent = "Letras adivinadas: " + letrasAdivinadas.join(", ");
    }

    // Función para mostrar el número de intentos en el DOM
    function mostrarIntentosEnDOM() {
        const attemptsElement = document.getElementById("attempts");
        attemptsElement.textContent = "Intentos restantes: " + intentos;
    }

    // Función para mostrar el resultado en el DOM
    function mostrarResultadoEnDOM(resultado) {
        const resultElement = document.getElementById("result");
        resultElement.textContent = resultado + " La palabra era: " + palabraSeleccionada;
    }

    // Función para seleccionar una palabra aleatoria de la temática
    function seleccionarPalabra(tematicaSeleccionada) {
        const eleccionAleatoria = Math.floor(Math.random() * tematicaSeleccionada.length);
        return tematicaSeleccionada[eleccionAleatoria].palabra;
    }

    // Función para ocultar la palabra seleccionada
    function ocultarPalabra(palabra) {
        return palabra.replace(/./g, "*");
    }

    // Función para actualizar la palabra oculta con las letras adivinadas
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

// Función para jugar
function jugarAhorcado() {
    if (intentos === 0) {
        mostrarResultadoEnDOM("¡BUUUUUUU! Se te acabó la vida, ¡BYE!", palabraSeleccionada);
        return; // Terminar la función si no hay intentos disponibles
    }

    const letter = letterInput.value.toLowerCase().trim();
    if (letter === "" || letrasAdivinadas.includes(letter)) {
        return;
    }

    // Restar un intento
    intentos--;

    // Aquí se agrega la letra ingresada a la lista de letras adivinadas
    letrasAdivinadas.push(letter);

    // Ocultar la letra ingresada para poder ingresar otra letra
    letterInput.value = '';

    if (palabraSeleccionada.includes(letter)) {
        palabraOculta = actualizarPalabraOculta(palabraSeleccionada, palabraOculta, letter);
    }

    mostrarPalabraEnDOM();
    mostrarLetrasAdivinadasEnDOM();
    mostrarIntentosEnDOM();

    // Verificar si ganó o perdió
    if (palabraOculta === palabraSeleccionada) {
        mostrarResultadoEnDOM(
            "¡VAMOOOOOO! Le pegaste a la palabra, ¡GANADOR!", palabraSeleccionada);
    } else if (intentos === 0) {
        mostrarResultadoEnDOM("¡BUUUUUUU! Se te acabó la vida, ¡BYE!", palabraSeleccionada);
    }
}

    // Iniciar el juego al cargar la página
    jugarAhorcado();
});