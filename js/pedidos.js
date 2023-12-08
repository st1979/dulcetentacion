const { createApp } = Vue

  createApp({
    data() {
      return {
        //  url:"http://127.0.0.1:5000/pedidos",
        url:"https://stellacorrea.pythonanywhere.com/pedidos",
        pedidos:[],
        error:false,
        cargando:true
      }
    },
    // Se llama después de que la instancia haya 
    // terminado de procesar todas las opciones relacionadas con el estado.
    created() {
        this.fetchData(this.url)  // Invocando al método
    },
    methods: {
        fetchData(url) {
            // Acá se consume la Api  /pedidos
            fetch(url)
                .then(response => response.json())
                // .then(data => {
                //     this.pedidos = data;
                //     this.cargando=false
                // })
                //    aqui segun el valor que tenga el campo cobertura, se indica la imagen a mostrar en la celda de la tabla
                .then(data => {
                    this.pedidos = data.map(pedido => {
                      switch (pedido.cobertura) {
                        case 'chocolate':
                          pedido.cobertura = 'https://st1979.github.io/dulcetentacion/img/cobertura_chocolate1.jpg';
                          break;
                        case 'chocolate4':
                          pedido.cobertura = 'https://st1979.github.io/dulcetentacion/img/cobertura_chocolate4.jpg';
                          break;
                        case 'vainilla':
                          pedido.cobertura = 'https://st1979.github.io/dulcetentacion/img/cobertura_vainilla2.jpg';
                          break;
                        case 'vainilla1':
                          pedido.cobertura = 'https://st1979.github.io/dulcetentacion/img/cobertura_vainilla1.jpg';
                          break;
                        case 'fresa':
                          pedido.cobertura = 'https://st1979.github.io/dulcetentacion/img/cobertura_fresa1.jpg';
                          break;
                        case 'fresa2':
                          pedido.cobertura = 'https://st1979.github.io/dulcetentacion/img/cobertura_fresa2.jpg';
                          break;
                        default:
                          // Aquí puedes manejar un valor por defecto o un caso no previsto
                          break;
                      }
                      // Formatear fecha
                        if (pedido.fechaEvento) {
                            let fecha = new Date(pedido.fechaEvento);
                            let year = fecha.getFullYear();
                            let month = String(fecha.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
                            let day = String(fecha.getDate()).padStart(2, '0');
                            
                            pedido.fechaEvento = `${year}-${month}-${day}`;
                        }
                      console.log(pedido.fechaEvento)
                      return pedido;
                    });
                    this.cargando = false;
                  })
                  
                .catch(err => {
                    console.error(err);
                    this.error=true              
                });
        },
        // el id se necesita para buscar en la DB y eliminarlo
        eliminar(id) {
            const url = 'https://stellacorrea.pythonanywhere.com/borrar/' + id;
            // const url = 'http://127.0.0.1:5000/borrar/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert("Eliminado correctamente")
                    location.reload();
                })
        }


    },
    



  }).mount('#app')
  