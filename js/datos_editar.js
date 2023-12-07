// Procedimiento para traer los datos del registro a editar
// Ej: "id=9&nombre=bulbasaur"
let cadena = location.search; // Cadena con los símbolos & y =

// Crear un objeto URLSearchParams con la cadena
// El objeto URLSearchParams en JavaScript es una
// interfaz que proporciona métodos y propiedades para
// trabajar con las cadenas de consulta (query strings) en URLs.
// Facilitando la obtención de parámetros y valores individuales
let datos = new URLSearchParams(cadena);

// Crear un objeto para almacenar los nombres de las variables y sus valores
let resultado = {};

// Iterar sobre los parámetros y guardar los nombres y valores en el objeto resultado
// for (const [nombre, valor] of datos) {
//     resultado[nombre] = valor;
//     resultado[precio] = valor;
//     resultado[stock] = valor
//     resultado[imagen] = valor
// }

for (const clave of datos.keys()) {
    resultado[clave] = datos.get(clave);
}
// Imprimir el resultado
// console.log(resultado); // Esto mostrará un objeto con las variables y sus valores


// Procedimiento para mostrar los datos a editar en el formulario de edición
document.getElementById("id").value = resultado["id"]
document.getElementById("nombre").value = resultado["nombre"]
document.getElementById("apellido").value = resultado["apellido"]
document.getElementById("telefono").value = resultado["telefono"]
document.getElementById("fechaEvento").value = resultado["fechaEvento"]
document.getElementById("sabor").value = resultado["sabor"]
document.getElementById("tamano").value = resultado["tamano"]
document.getElementById("cobertura").value = resultado["cobertura"]
// document.getElementById("decoracion").value = resultado["decoracion"]
document.getElementById("mensaje").value = resultado["mensaje"]


// Suponiendo que resultado["decoracion"] contiene los valores del campo decoracion de la base de datos (ej. "Flores comestibles,Frutas Frescas")
// Separar los valores por comas para obtener un array
let valoresDecoracion = resultado["decoracion"].split(',');

// Obtener todos los checkboxes del formulario por su nombre (name)
let checkboxesDecoracion = document.querySelectorAll('input[name="decoracion[]"]');

// Iterar sobre los checkboxes y marcar aquellos cuyos valores estén presentes en la variable valoresDecoracion
checkboxesDecoracion.forEach(checkbox => {
    if (valoresDecoracion.includes(checkbox.value)) {
        checkbox.checked = true;
    }
});
