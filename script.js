// Selecciona los botones de encriptar y desencriptar, y los elementos que se van a manipular.
var encriptarButton = document.querySelector(".botonEncriptar");
var desencriptarButton = document.querySelector(".botonDesencriptar");
var muneco = document.querySelector(".contieneMuneco");
var contenedor = document.querySelector(".contenedorParrafo");
var resultado = document.querySelector(".textoResultado");
var cajaTexto = document.querySelector(".cajaTexto");

// Validación de carácteres en la entrada
cajaTexto.addEventListener("input", function(event){
    var valor = cajaTexto.value;
    var regex = /[^a-z\s]/g; // Busca cualquier carácter que no sea una letra minúscula (a-z) o un espacio (\s)

    if (regex.test(valor)){
        cajaTexto.value = valor.replace(regex, '');
        alert('carácter no permitido');
    }
});

// Asigna la función procesarTexto al evento click de los botones de encriptar y desencriptar.
encriptarButton.onclick = () => procesarTexto('encriptar');
desencriptarButton.onclick = () => procesarTexto('desencriptar');

// Función que procesa el texto según la acción (encriptar o desencriptar).
function procesarTexto (accion){
    ocultarMuneco();
    var cajaDeTexto = recuperarTexto();// Recupera el texto ingresado en la caja de la izquierda.
    if (accion === 'encriptar'){
        resultado.textContent = transformarTexto(cajaDeTexto, true);
    } else{
        resultado.textContent = transformarTexto(cajaDeTexto, false);
    }
}

// Recupera el texto ingresado en la caja de la izquierda.
function recuperarTexto (){
    var cajaDeTexto = document.querySelector(".cajaTexto");
    return cajaDeTexto.value;
}


// Oculta el muñeco y el contenedor de mensaje cuando se encripta/desencripta.
function ocultarMuneco(){
    muneco.classList.add("ocultar");
    contenedor.classList.add("ocultar");
}

// Transforma el texto, encriptándolo o desencriptándolo según el valor de 'encriptar'.
function transformarTexto(mensaje, encriptar = true){
    // Mapa que define cómo se encriptan las vocales.
    const Encriptacion = {
        "a" : "ai",
        "e" : "enter",
        "i" : "imes",
        "o" : "ober",
        "u" : "ufat"
    };

    if (encriptar){
         // Reemplaza cada vocal según el mapa de encriptación.
        return mensaje.replace(/[aeiou]/g, match => Encriptacion[match]);
    }else{
        let texto = mensaje;
         // Reemplaza cada cadena encriptada por su vocal original.
        for (let [key, value] of Object.entries(Encriptacion)){
            texto = texto.replaceAll(value, key);
        }
        return texto;
    }
}

// Selecciona el botón de copiar y le asigna una función para copiar el texto.
const copiarButton = document.querySelector(".botonCopiar");
    copiarButton.addEventListener("click", () => {
        var contenido = resultado.textContent;
        navigator.clipboard.writeText(contenido);// Copia el texto al portapapeles.
    });