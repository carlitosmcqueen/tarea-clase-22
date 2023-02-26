const socket = io.connect()

const ingresoMensaje = document.getElementById("ingresoMensaje");
const botonEnviar = document.getElementById("botonEnviar")
const to = document.getElementById("to")

socket.on('mensajes', (msj) => {
    renderMsj(msj);

})

botonEnviar.addEventListener('click', (e) => {
    const mensaje = {
        
        user: ingresoMensaje.children.id.value,
        to: to.value,
        text: ingresoMensaje.children.text.value
    }
    socket.emit('mensajes', mensaje);
    return false
})

//normalizr esquemas
const authorsSchema = new normalizr.schema.Entity('authors');
const msjSchema = new normalizr.schema.Entity('mensajes', { author: authorsSchema }, { idAttribute: 'id' });
const fileSchema = [msjSchema]

const renderMsj = (msj) => {
    const html = msj.map(element => ` <article>
    <br>
    <span class="id">${element.user}</span>
    <br>
    <span class="to">${element.to}</span>
    <br>
    <span class="time">[${element.timestamp}]:</span>
    <span class="text">${element.text}</span> </article>`).join(" ")
    document.getElementById("mensajes").innerHTML = html;

    return false
}



// const renderComp = (msj, denormMsjs) => {
//     const comp = document.getElementById("compresion");
//     const denormMsjsLength = (JSON.stringify(denormMsjs)).length;
//     const msjLength = (JSON.stringify(msj)).length;
//     const compresion = ((msjLength - denormMsjsLength) / msjLength * 100).toFixed(2);
//     comp.innerHTML = `(Compresion: ${compresion}%)`;
// }

