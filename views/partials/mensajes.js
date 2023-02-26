// const socket = io.connect()

// const ingresoMensaje = document.getElementById("ingresoMensaje");
// const botonEnviar = document.getElementById("botonEnviar");

// socket.on('mensajes', (msj) => {
//     const denormMsjs = normalizr.denormalize(msj.result, fileSchema, msj.entities);
//     console.log(denormMsjs);
//     renderMsj(msj);
//     renderComp(msj, msj);
// })

// botonEnviar.addEventListener('click', (e) => {
//     console.log("se envio mensaje")
//     const mensaje = {
//         author: {
//             id: ingresoMensaje.children.id.value,
//             nombre: ingresoMensaje.children.nombre.value,
//             apellido: ingresoMensaje.children.apellido.value,
//             edad: ingresoMensaje.children.edad.value,
//             alias: ingresoMensaje.children.alias.value,
//             avatar: ingresoMensaje.children.avatar.value,
//         },
//         text: ingresoMensaje.children.text.value
//     }
//     socket.emit('mensajes', mensaje);
//     return false
// })

// //normalizr esquemas
// const authorsSchema = new normalizr.schema.Entity('authors');
// const msjSchema = new normalizr.schema.Entity('mensajes', { author: authorsSchema }, { idAttribute: 'id' });
// const fileSchema = [msjSchema]

// const renderMsj = (msj) => {
//     const html = msj.map(element => ` <article>
//     <span class="id">${element._doc.author.id}</span><span class="time">[${element._doc.author.timestamp}]:</span><span clas="text">${element._doc.text}</span><img src="${element._doc.author.avatar}" alt="avatar" class="avatar">
//                     </article>`).join(" ")
//     document.getElementById("mensajes").innerHTML = html;

//     return false
// }



// const renderComp = (msj, denormMsjs) => {
//     const comp = document.getElementById("compresion");
//     const denormMsjsLength = (JSON.stringify(denormMsjs)).length;
//     const msjLength = (JSON.stringify(msj)).length;
//     const compresion = ((msjLength - denormMsjsLength) / msjLength * 100).toFixed(2);
//     comp.innerHTML = `(Compresion: ${compresion}%)`;
// }

