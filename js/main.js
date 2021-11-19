
const listaCarrito= document.querySelector('#productos')
const vaciarCarrito= document.querySelector('#vaciar-carrito')
const finalizarCarrito= document.querySelector('#finalizar-compra')
const incorporarTable= document.querySelector('#lista-carrito tbody')

let carritoArray=[];

document.addEventListener('DOMContentLoaded', () => {
	const carritoStorage = JSON.parse(localStorage.getItem('carritoArray'));

	carritoArray = carritoStorage || [];
    actualizarHTML();
   

    $.ajax({
        url: 'js/productos.json',
        // EL PRIMER ELEMENTO SE UTILIZA PARA LLAMAR AL JSON
        success: function(productos, textStatus, xhr){
            mostrarProductos(productos)
        },
        
        error: function(xhr, textStatus, error){
            console.log(xhr)
            console.log(textStatus)
            console.log(error)
        }
    })
})

incorporarTable.addEventListener('click', eliminarProducto)
listaCarrito.addEventListener('click', agregarCarrito)
vaciarCarrito.addEventListener('click', eliminarTodo)
finalizarCarrito.addEventListener('click', finalizarCompra)


function agregarCarrito(e){
    // =====================================================================
    e.preventDefault();
    // MANERA 1

    if (e.target.classList.contains("btn-producto")) {
        
		const productCard = e.target.parentElement;

		const productoAgregado = {
			nombre: productCard.querySelector('h2').textContent,
			id: productCard.querySelector('button').dataset.id,
            precio: productCard.querySelector('.producto-precio').textContent,
			cantidad: 1
		}

        const existe = carritoArray.some(producto => producto.id === productoAgregado.id);

        if (existe) {
			const nuevoCarrito = carritoArray.map(producto => {
				if (producto.id === productoAgregado.id) {
					producto.cantidad++;
				}
				return producto;
			});
			carritoArray = [...nuevoCarrito];
		
		} else {
			
			carritoArray.push(productoAgregado);
			
		}

        actualizarHTML();
        actualizarStorage();
        Swal.fire('Agregaste el producto correctamente!', 'El producto sera agregado al carrito y nos comunicaremos a la brevedad.','success');
    }

    // =======================================================================


    // // MANERA 2
    // const producto= {
    //     titulo: e.target.dataset.nombre,
    //     id: e.target.dataset.id,
    //     precio: e.target.dataset.precio,
    //     cantidad: 1
    // }
   
    // // buscamos el indice
    // const exist = carritoArray.some((item) => item.id === producto.id);

    // if (e.target.classList.contains("btn-producto")){


    //     if (exist) {
    //         //creo carrito temporal con map, para cargar los productos repetidos
    //         const carritoTemp = carritoArray.map((item) => {
    //             if (item.id == producto.id) {
    //                 // actualiza la cantidad del producto que se repite
    //                 item.cantidad++;
    //             }
    //             // guarda en el nuevo array los productos que trae el carrito original
    //             return item;
    //         });
    //         // actualizo el carrito original usando el spread operator. Le asigno los VALORES del array temporal
    //         carritoArray = [...carritoTemp];
    //         console.log("cantidad actualizada");
            
    //     } else {
    //         console.log(
    //             "primera instancia del producto, cantidad: ",
    //             producto.cantidad
    //         );
    //         carritoArray.push(producto);
    //     }
    //     actualizarHTML();
    //     actualizarStorage();
    //     Swal.fire('Agregaste el producto correctamente!', 'El producto sera agregado al carrito y nos comunicaremos a la brevedad.','success');
        
    // }
    
// ================================================================
// MANERA 3

    // if (e.target.classList.contains("btn-producto")){
    //     // si no existe empujamos el nuevo elemento
    //     if (index === -1) {
    //         carritoArray.push(producto);
    //     } else {
    //         // en caso contrario aumentamos su cantidad
    //         carritoArray[index].cantidad++;
    //     }
    //         actualizarHTML();
    //         actualizarStorage();
    //         Swal.fire('Agregaste el producto correctamente!', 'El producto sera agregado al carrito y nos comunicaremos a la brevedad.','success');
    //     // contadorCarrito()
    //     }
}

function mostrarProductos(listadoProductos){
    listaCarrito.innerHTML='';

    listadoProductos.forEach(producto=>{
// =============================================================================
    const html=
        `
        <div class="col" id="productos">
                <img src="${producto.imagen}" class="card-img-top img-fluid producto-img">
                <h2 class="text-center producto-title">${producto.nombre}</h2>
                <p class="text-center mt-auto">${producto.descripcion}</p>
                <p class="text-center mt-auto producto-precio"> ${producto.precio}</p>
                <button class="btn-producto btn btn-outline-primary w-100" data-nombre="${producto.nombre}"
                data-id="${producto.id}"}>Agregar producto</button>
        </div>
            
            `
        listaCarrito.innerHTML+=html;
// =======================================================================
       /*  $('#productos').append(`
        <article class="col-sm-4 mb-3 card producto">
                <img src="${producto.imagen}" class="card-img-top">
                <h4 class="text-center">${producto.nombre}</h4>
                <p class="text-center">${producto.descripcion}</p>
                <button class="btn-producto btn btn-outline-primary w-100"  data-nombre="${producto.nombre}"
                id=${producto.id}}>Agregar producto</button>
            </article>
        `) */
    // })
}
    )}

function actualizarHTML(){
    incorporarTable.innerHTML='';

    carritoArray.forEach(producto=>{
    const{nombre, precio, cantidad, id} = producto;
      /*   const row= document.createElement('tr');
        row.innerHTML=`
        <td>
            ${producto.nombre}
        </td>

        <td>
            ${producto.precio}
        </td>

        <td class= "text-center">
            ${producto.cantidad}
        </td>

        <td>
        <a href="#" class="borrar-producto" data-id="${producto.id}"><i class="fas fa-trash"></i></a>

         </td>
        
         incorporarTable.appendChild(row)
        ` */
  

    
    // =============================================================================
    $('#lista-carrito tbody')
    .append(`
        <tr>
            <td>
                ${nombre}
            </td>

            <td>
                ${precio}
            </td>

            <td class= "text-center">
                ${cantidad}
            </td>

            <td>
            <a href="#" class="borrar-producto" data-id="${id}"><i class="fas fa-trash"></i></a>
            </td>
        </tr>`)

        console.log(producto)

        
    })
}

function actualizarStorage(){
    localStorage.setItem('carritoArray', JSON.stringify(carritoArray))
}

function eliminarProducto(e) {
	e.preventDefault();
	if (e.target.nodeName === "A" || e.target.nodeName === "I") {
		const id = e.target.closest('a').dataset.id;
		const carritoFiltrado = carritoArray.filter(producto => producto.id !== id);
		carritoArray = [...carritoFiltrado];


		actualizarHTML();
		actualizarStorage();
	}
}

function eliminarTodo(e){
    e.preventDefault();
    carritoArray=[]
    actualizarHTML()
    actualizarStorage()
}

function finalizarCompra(e){
    e.preventDefault();

   console.log(carritoArray)

   const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: 'Estas seguro que deseas finalizar la compra?',
    icon: 'warning',
    showCancelButton: true,
    cancelButtonText: 'No, mejor quiero pensarlo!',
    confirmButtonText: 'Si, por favor!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        eliminarTodo(e);
      swalWithBootstrapButtons.fire(
        'Su compra sera procesada!'
      )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'La compra no se ha procesado',
        'Volvera a la página.',
        'error'
      )
    }
  })
}


