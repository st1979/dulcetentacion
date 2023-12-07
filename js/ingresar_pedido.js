function guardar() {
    limpiarTodosLosErrores();
    let nombre_ingresado = document.getElementById("nombre").value
    let apellido_ingresado = document.getElementById("apellido").value
    let telefono_ingresado = document.getElementById("telefono").value
    let fechaEvento_ingresado = document.getElementById("fechaEvento").value
    let sabor_ingresado = document.getElementById("sabor").value
    let tamano_ingresado = document.getElementById("tamano").value
    let cobertura_ingresado = document.getElementById("cobertura").value
    // let decoracion_ingresado = document.getElementById("decoracion").value
   // Obtener los valores de los checkboxes de decoración seleccionados
    let decoracion_ingresado = Array.from(obtenerDecoracionSeleccionada());
    
    //let decoracion_ingresado = "[]";
    let mensaje_ingresado = document.getElementById("mensaje").value


    if (nombre_ingresado === "") {
        
        alert("Por favor, ingresa tu nombre.");
        mostrarError("error-nombre", "Por favor, ingresa tu nombre.");
        document.getElementById("nombre").style.border = "1px solid red"; // Cambia el borde del campo
        return;
    }else{
        limpiarError("error-nombre");
    }

    if (apellido_ingresado === "") {
        alert("Por favor, ingresa tu apellido.");
        mostrarError("error-apellido", "Por favor, ingresa tu apellido.");

        document.getElementById("apellido").style.border = "1px solid red";
        return;
    } else {
        limpiarError("error-apellido");
    }

    if (telefono_ingresado === "") {
        alert("Por favor, ingresa tu número de teléfono.");
        mostrarError("error-telefono", "Por favor, ingresa tu telefono.");

        document.getElementById("telefono").style.border = "1px solid red";
        return;
    }
    else {
        limpiarError("error-telefono");
    }
    
    if (isNaN(telefono_ingresado)) {
        // Mostrar un mensaje de error si el valor no es numérico
        alert("Por favor, teléfono debe ser numerico.");
        mostrarError("error-telefono",'Teléfono debe ser numérico');
        document.getElementById("telefono").style.border = "1px solid red";

        return; 
    }else {
        limpiarError("error-telefono");
    }

    if (fechaEvento_ingresado === "") {
        alert("Por favor, ingresa la fecha del evento.");
        mostrarError("error-fechaEvento", "Por favor, ingresa la fecha del Evento.");
        document.getElementById("fechaEvento").style.border = "1px solid red";
        return;
    }else {
        limpiarError("error-fechaEvento");
    }


    if (sabor_ingresado === "") {
        alert("Por favor, selecciona un sabor.");
        mostrarError("error-sabor", "Por favor, ingresa un sabor.");
        document.getElementById("sabor").style.border = "1px solid red";
        return;
    }else {
        limpiarError("error-fechaEvento");
    }
    

    if (tamano_ingresado === "") {
        alert("Por favor, selecciona un tamaño.");
        mostrarError("error-tamano", "Por favor, ingresa un tamaño.");
        document.getElementById("tamano").style.border = "1px solid red";
        return;
    }

    if (cobertura_ingresado === "") {
        alert("Por favor, selecciona una cobertura.");
        mostrarError("error-cobertura", "Por favor, selecciona una cobertura.");
        document.getElementById("cobertura").style.border = "1px solid red";
        return;
    }

    if (decoracion_ingresado.length === 0) {
        alert("Por favor, selecciona al menos una opción de decoración.");
        // Puedes mostrar un mensaje cerca de los checkboxes de decoración
        // por ejemplo, insertando un elemento HTML con un mensaje después de estos checkboxes
        let decoracionElement = document.querySelector('.decoracion-options');
        let errorMessage = document.createElement('p');
        errorMessage.style.color = "red";
        errorMessage.textContent = "Selecciona al menos una opción de decoración.";
        decoracionElement.appendChild(errorMessage);
        return;
    }



    
    console.log(nombre_ingresado+" "+apellido_ingresado+" "+telefono_ingresado+" "
                +fechaEvento_ingresado+" "+sabor_ingresado+" "+tamano_ingresado+" "
                +cobertura_ingresado+ " " +decoracion_ingresado+" "+mensaje_ingresado);

    let enviar_pedido = {
        nombre: nombre_ingresado,
        apellido: apellido_ingresado,
        telefono:telefono_ingresado,
        fechaEvento: fechaEvento_ingresado,
        sabor: sabor_ingresado,
        tamano: tamano_ingresado,
        cobertura: cobertura_ingresado,
        decoracion: decoracion_ingresado,
        mensaje: mensaje_ingresado
        
    }
    console.log(enviar_pedido);
    
    let url = "https://stellacorrea.pythonanywhere.com/registro"
    // let url = "http://localhost:5000/registro"
    var options = {
        body: JSON.stringify(enviar_pedido),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    // alert(JSON.stringify(enviar_pedido));
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert(`Gracias ${nombre_ingresado} , tu pedido fue realizado con éxito`)
            // Devuelve el href (URL) de la página actual
            window.location.href = "./pedidos.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}

// function obtenerDecoracionSeleccionada() {
//     let checkboxesDecoracion = document.querySelectorAll('input[name="decoracion[]"]:checked');
//     let valoresDecoracion = [];

//     checkboxesDecoracion.forEach(function (checkbox) {
//         valoresDecoracion.push(checkbox.value);
//     });

//     return valoresDecoracion;
// }

function obtenerDecoracionSeleccionada(){
     // Obtener los valores de los checkboxes de decoración seleccionados
     let checkboxesDecoracion = document.querySelectorAll('input[name="decoracion[]"]:checked');
     let valoresDecoracion = [];
 
     checkboxesDecoracion.forEach(function (checkbox) {
         valoresDecoracion.push(checkbox.value);
     });
 
     // Convertir los valores de decoración a un conjunto (SET)
     let decoracion_ingresado = new Set(valoresDecoracion);
     return decoracion_ingresado;
}

function mostrarError(idCampoError, mensaje) {
    let campoError = document.getElementById(idCampoError);
    campoError.textContent = mensaje;

    // Establecer estilo o clase para resaltar el mensaje de error
    campoError.style.color = "red";
    campoError.style.display = "block"; // Mostrar el mensaje
}

function limpiarError(idCampoError) {
    let campoError = document.getElementById(idCampoError);
    campoError.textContent = "";
    campoError.style.display = "none";

    // Restablecer el borde al estado predeterminado
    document.getElementById(idCampoError.replace("error-", "")).style.border = "1px solid #ccc";
}

function limpiarTodosLosErrores() {
    let errores = document.querySelectorAll('.error-message');
    errores.forEach(function(error) {
        error.textContent = "";
        error.style.display = "none";

        let campoId = error.id.replace("error-", "");
        document.getElementById(campoId).style.border = "1px solid #ccc";
    });
}
