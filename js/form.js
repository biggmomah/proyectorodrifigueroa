const listaConsultas= document.querySelector('#listaConsultas')
const nombreSubmit = document.getElementById('nombre');
const emailSubmit = document.getElementById('email');
const consultaSubmit= document.getElementById('consulta');



document.addEventListener('DOMContentLoaded', () => {
	const carritoStorage = JSON.parse(localStorage.getItem('carritoArray'));

	carritoArray = carritoStorage || [];

   
});


listaConsultas.addEventListener('submit', enviarFormulario)

function enviarFormulario(e){
    e.preventDefault()
    
    let nombre = nombreSubmit.value
    let email= emailSubmit.value

   if(nombre && email){
       Swal.fire({
        title: `Tu nombre es: ${nombre} y tu mail ${email}`,
        text: "Si no es correcto por favor corrija los datos.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Esta bien!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Consulta enviada!',
            'Nos contactaremos a la brevedad.',
            'success'
          )
        }
      })

       localStorage.setItem(nombre, email)

   }else{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no completaste tus datos',
      })
   }

   for( let i = 0 ; i < localStorage.length ; i++){
    const key = localStorage.key(i);
    const value = localStorage.getItem(key)
   }    
    
}


