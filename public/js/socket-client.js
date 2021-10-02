
// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');



const socket =  io(); // cliente

socket.on('connect', () => {
    console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Desconectado');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
})



btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    console.log('boton')

    // Solo recibe retroalimentacion del id el cliente que emite, la referencia en el srver es callback
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log( 'Desde el servidor', id );
    }); // sin mayusculas ni caracteres especiales
    
})

socket.on('enviar-mensaje', ( id ) => {
    console.log( 'Desde el server', id)
})
