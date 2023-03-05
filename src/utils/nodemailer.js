import { createTransport } from "nodemailer"

import * as dotenv from "dotenv"
dotenv.config()


function mail(tipo,datos){
    let getEmail,subject,html
    if (tipo == "registro"){
        
        getEmail = datos.username,
        subject = "Se registro un nuevo usuario",
        html = `Se ha registrado correctamente ${datos.username},
        de ${datos.edad}
        bienvenido ${datos.imagen}
        `
        // enviar()
    }

    if(tipo == "compra"){
        const productos = datos.productos
        const productosComprados = productos.forEach((element) => `Usted a comprado : ${element.cant}, del producto ${element.title}`);
        getEmail = datos.user,
        subject= "Se a realizado una compra",
        html = `Gracias por su compra ${datos.user};
        realizada el ${datos.timestamp}
        ----------------------------------------------------------------
        ` + productosComprados
        
        //enviar()

    }
    async function enviar(){
        const transporter = createTransport({
            host:"smtp.ethereal.email",
            port:587,
            auth:{
                user: process.env.USERMAIL,
                pass: process.env.PASSMAIL,
            }
        })

        const opts = await transporter.sendMail({
            from:"virginie.christiansen@ethereal.email",
            to:getEmail,
            subject,
            html
        })

        try{
            const info = await transporter.sendMail(opts)
            console.log(info)
        }catch(e){
            console.error(e)
        }
    }
}

export default mail