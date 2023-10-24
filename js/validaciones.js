function validarFormulario() {

    var nombre = document.getElementById("nombre").value.trim();
    var apellido = document.getElementById("apellido").value.trim();
    var telefono = document.getElementById("telefono").value.trim();
    var email = document.getElementById("email").value.trim();
    var comentario = document.getElementById("comentario").value.trim();

    if(nombre==="" || apellido==="" || telefono==="" || email==="" || comentario===""){
      alert("Por favor, completar todos los campos vacíos del formulario.")
      return false
    }

    email.addEventListener("input", function (event) {
      if (email.validity.typeMismatch) {
        email.setCustomValidity(
          "¡Se esperaba una dirección de correo electrónico!",
        );
      } else {
        email.setCustomValidity("");
      }
    });

    var nombreTest = /^[a-zA-Z]+$/.test(nombre) 

    if(nombreTest === false){
      alert("Por favor,ingrese un nombre con letras del alfabeto.")
      return false
    }

    if(dni.length!==8){
      alert("Por favor,ingrese dni con ocho números.")
      return false
    }

    if(isNaN(dni)){
      alert("Por favor,ingrese dni sólo con números.")
      return false
    }

    alert("Se enviaron los datos correctamente.")
  }