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
    <div id="userTO">
        <span class="id" id="username">user: ${element.user}</span>
        <span class="to" id="to">to: ${element.to}</span>
    </div>
    <span class="time" id="time">[${element.timestamp}]:</span>
    <br>
    <div id="prueba">
    <span class="text" id="text">${element.text}</span> </article>
    </div>`
    
    ).join(" ")
    
    document.getElementById("mensajes").innerHTML = html;

    return false
}