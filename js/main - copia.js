

const listaCarrito= document.querySelector('#productos')
const enviarConsulta=  document.querySelector('#submit')
const incorporarTable= document.querySelector('#lista-carrito tbody')
const listaConsultas= document.querySelector('#listaConsultas')
// const template= document.getElementById("template");
// const fragment= document.createDocumentFragment();




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



// listaCarrito.addEventListener('click', agregarCarrito);
// enviarConsulta.addEventListener('submit', enviarFormulario)
incorporarTable.addEventListener('click', eliminarProducto)

$('#productos').on('click', agregarCarrito)



function agregarCarrito(e){
    // =====================================================================

    // MANERA 1
    if (e.target.classList.contains("btn-producto")) {
        console.log('entraste')
       
		const productCard = e.target.parentElement.parentElement;

		const productoAgregado = {
			nombre: productCard.querySelector('h2').textContent,
			id: productCard.querySelector('button').dataset.id,
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

/* 
    // MANERA 2
    console.log(e.target.dataset.nombre)

    const producto= {
        titulo: e.target.dataset.nombre,
        id: e.target.dataset.nombre,
        cantidad: 1
    }

    // buscamos el indice
    const index = carritoArray.findIndex((item) => item.id === producto.id);

    // si no existe empujamos el nuevo elemento
    if (index === -1) {
        carritoArray.push(producto);
        $(e.target).parent().slideUp("slow").slideDown('3000');
        $(e.target).append(`<p id='alerta'>Agregaste correctamente el producto </p>`)
        $('#alerta').css('color', 'red')

    } else {
        // en caso contrario aumentamos su cantidad
        carritoArray[index].cantidad++;
       
    }
    // contadorCarrito() */
}



function mostrarProductos(listadoProductos){
    listaCarrito.innerHTML='';

    listadoProductos.forEach(producto=>{
// =============================================================================
    const html=
        `
        <div class="col">
                <img src="${producto.imagen}" class="card-img-top img-fluid producto-img">
                <h2 class="text-center producto-title">${producto.nombre}</h2>
                <p class="text-center mt-auto">${producto.descripcion}</p>
                <p class="text-center mt-auto producto-precio"> ${producto.precio}</p>
                <button class="btn-producto btn btn-outline-primary w-100"  data-nombre="${producto.nombre}"
                data-id=${producto.id}}>Agregar producto</button>
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

/* const contadorCarrito=()=>{
    
    // let hijos = $(e.target).parent().children();
    
    carrito.textContent=""

        carritoArray.forEach((item)=>{
        const clone = template.content.firstElementChild.cloneNode(true);
        clone.querySelector('.lead').textContent=item.titulo;
        

        clone.querySelector('.badge').textContent=item.cantidad

        fragment.appendChild(clone);

    }) 

    carrito.appendChild(fragment)
} */

function actualizarHTML(){
    incorporarTable.innerHTML='';

    carritoArray.forEach(producto=>{
        // const { nombre, precio, cantidad, id } = producto;

        const row= document.createElement('tr');
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
        
        `
    incorporarTable.appendChild(row)
    console.log('funciona')

    
    // =============================================================================
  /*   $('#lista-carrito tbody')
    .append(`
        <tr>
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
        </tr>`)
 */
        
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

// ==============================================================================
// function enviarFormulario(e){
//     e.preventDefault();

// //     let nombre = e.target[0].value;
// //     let email= e.target[1].value
// //     let consulta= e.target[2].value;


// //   const arr=[nombre, email, consulta]
    
//     const div= document.createElement('div')
//     div.classList.add('d-flex')
//     div.innerHTML= `
//         <h4>Nombre completo${listaConsultas.value}</h4>
//         <p>Email:${listaConsultas.value}</p>
//         <p>Consulta:${listaConsultas.value}</p>
//     `

//     listaConsultas.innerHTML+=div

    
//     console.table(div)
// }

// ==================================================================================
// EMPIEZA NUEVAMENTE


// botones.forEach((btn)=>{
//    btn.addEventListener('click',agregarAlCarrito)
// })

// VARIABLES 

// const user =JSON.parse(localStorage.getItem('usuarios')) || []

// const nombreSubmit= document.querySelector("#nombreSubmit");
// const emailSubmit= document.querySelector('#emailSubmit')
// const consultaSubmit= document.querySelector("#consultaSubmit");
// const btn= document.querySelector('#btnSubmit')
// const listaConsultas=document.querySelector('#listaConsultas')
// let consulta;
// // let menu = opciones();
// let contador=0;

// document.addEventListener('DOMContentLoaded', ()=>{
//     const consultaStorage= JSON.parse(localStorage.getItem('consulta'))

//     consulta= consultaStorage || [];

//     agregarConsulta();
// })



// function agregarConsulta(e){
//     e.preventDefault();
//     // Como podria hacer para que si pongo algo en blanco tire error?

//     const div=document.createElement('div');
//     div.innerHTML= `Nombre: ${nombreSubmit.value}
//                     email: ${emailSubmit.value}
//                     consulta: ${consultaSubmit.value}
    
//     `

//     listaConsultas.appendChild(div)



// }

// function Consultas(){
//     listaConsultas.innerHTML=''
// }

// btn.addEventListener('click',agregarConsulta)


//  CLASES Y OBJETOS


// class User{
//     constructor(userNombre, userConsulta, userEmail){
//     this.nombre=userNombre;
//     this.consulta=userConsulta;
//     this.email=userEmail;
//     }
// }

// class Servicios{
//     constructor(servicio, precio){
//         this.servicio= servicio;
//         this.precio=precio;
//     }
// }

// const servicio=["Clase 1 a 1", 100]


// while (menu != 3){

// if ( menu == 1 ){
//     datos(user)  
//     menu=opciones()
// }else if(menu==2){
//     for (let i = 0; i < servicio.length; i++) {
//        alert(`estas adquiriendo ${servicio}`) 
//     }
//     contador++;
//     menu=opciones()
// }

// }alert("Gracias por visitarnos.")



// for(const registro of user){
//     let div= document.createElement('div');
//     div.innerHTML=`<h2> ${registro.nombre}
//     <p> ${registro.consulta} / ${registro.email}
//     <hr>`;
//     document.body.appendChild(div)
// }
// const nombreSubmit= document.querySelector("#nombreSubmit");
// const emailSubmit= document.querySelector('#emailSubmit')
// const consultaSubmit= document.querySelector("#consultaSubmit");
// const btn= document.querySelector('#btnSubmit')
// const listaConsultas=document.querySelector('#listaConsultas')
// const botonProducto= document.querySelector("#botonProducto")
// const carrito= document.querySelector('#carrito')

// document.addEventListener('DOMContentLoaded', ()=>{
//     mostrarProductos(productos)
// })



// document.addEventListener('DOMContentLoaded', ()=>{
//     const consultaStorage= JSON.parse(localStorage.getItem('consulta'))

//     consulta= consultaStorage || [];

//     agregarConsulta();
// })


// function mostrarProductos(productos){
//     productos.forEach(producto => {
//         const html=`
//         <div class="container">
//             <div class="row">
//                 <div class="col-4">
//                     <div class="card">
//                         <img src="${producto.imagen}" class="card-img-top img-thumbnail">
//                         <h4 class="text-center">${producto.nombre}</h4>
//                         <p>Estas interesado en conocer más sobre la blockchain?</p>
//                         <button class="btn btn-primary w-100" id="botonProducto" >Conocenos!</button>
//                     </div>
//                 </div>
            
//             </div>
//         </div>
//         `
//     listaConsultas.innerHTML+=html
//     });
// }

// // function agregarProductos(e){
// //     e.preventDefault();   
// //     console.log(e.target)
// // }

// function agregarConsulta(e){
//     e.preventDefault();
//     // Como podria hacer para que si pongo algo en blanco tire error?

//     const div=document.createElement('div');
//     div.innerHTML= `Nombre: ${nombreSubmit.value}
//                     email: ${emailSubmit.value}
//                     consulta: ${consultaSubmit.value}
    
//     `

//     carrito.appendChild(div)

// }

