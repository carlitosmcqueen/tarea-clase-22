import { createTransport } from "nodemailer"

import * as dotenv from "dotenv"
dotenv.config()
import logger from "../../logs.js"

function mail(tipo,datos){
    let getEmail, sujeto, mensaje
    if (tipo == "registro"){
        
        getEmail = datos.username,
        subject = "Se registro un nuevo usuario",
        html = `Se ha registrado correctamente ${datos.username},
        de ${datos.edad}
        bienvenido ${datos.imagen}
        `
        // enviar()
    }

    async function enviar(){
        const transporter = createTransport({
            host:"smtp.ethereal.email",
            port:587,
            auth:{
                user: "virginie.christiansen@ethereal.email",
                pass: "NxBXFkZUZdEta8jezB",
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