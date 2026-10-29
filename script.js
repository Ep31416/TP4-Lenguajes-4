// Variable para almacenar el Blob en la memoria
let miBlob;

const btnCrear = document.getElementById('btnCrear');
const btnDescargar = document.getElementById('btnDescargar');
const btnSlice = document.getElementById('btnSlice');
const resultado = document.getElementById('resultado');

// 1. Crear el Blob
btnCrear.addEventListener('click', () => {
    // Definimos el texto que va a tener el archivo por dentro
    const contenido = "Hola, este es un archivo generado con Blobs para el TP de Lenguaje IV.";
    
    // Creamos el Blob indicando que es un texto plano
    miBlob = new Blob([contenido], { type: 'text/plain' });
    
    resultado.textContent = "Blob creado exitosamente en memoria.";
});

// 2. Descargar el Blob
btnDescargar.addEventListener('click', () => {
    if (!miBlob) {
        alert("Primero tenés que crear el Blob con el primer botón.");
        return;
    }
    
    // Creamos una URL temporal que apunta a nuestro Blob en memoria
    const url = URL.createObjectURL(miBlob);
    
    // Creamos una etiqueta <a> invisible para forzar la descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archivo_blob.txt';
    a.click();
    
    // Liberamos la memoria borrando la URL temporal
    URL.revokeObjectURL(url);
    resultado.textContent = "El archivo se descargó en tu computadora.";
});

// 3. Usar Slice
btnSlice.addEventListener('click', () => {
    if (!miBlob) {
        alert("Primero tenés que crear el Blob con el primer botón.");
        return;
    }
    
    // Cortamos el Blob: nos quedamos solo con los bytes desde el 0 hasta el 14
    const blobCortado = miBlob.slice(0, 14);
    
    // Usamos FileReader para leer ese pedacito cortado y mostrarlo
    const lector = new FileReader();
    lector.onload = function(evento) {
        resultado.textContent = `Resultado del Slice (primeros 14 caracteres): "${evento.target.result}"`;
    };
    lector.readAsText(blobCortado);
});