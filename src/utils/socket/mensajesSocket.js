// import { io } from "../../../index.js"

// import daos from "../../daos/index.js"

// const { mensajesDao } = await daos

// export async function chatSocket() {
//     console.log("ay ay ay")

//     io.on("connection", async (socket) => {
//         console.log("se conecto a chatSocket")

//         socket.emit("mensajes", await mensajesDao.getMsjs())
//         socket.on("mensajes", async (msj) => {
//             await mensajesDao.saveMsjs(msj)
//             io.sockets.emit("mensajes", await mensajesDao.getMsjs())
//         })
//     })
// }