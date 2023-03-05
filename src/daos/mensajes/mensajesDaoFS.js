import fs from "fs";
import ContenedorFS from "../../contenedores/contenedorFS.js"
import moment from "moment";

class MensajesDaoFS extends ContenedorFS {
    constructor(){
        super("./data/mensajes.json")
    }
    saveMsjs = async (msj) => {
        try{
            const data = await fs.promises.readFile(`${this.archivo}`, `utf-8`)
            msj.timestamp = moment().format()
            const allMensajes = JSON.parse(data);
            allMensajes.push(msj)
            const mensajesString = JSON.stringify(allMensajes)
            await fs.promises.writeFile(`${this.archivo}`, mensajesString)
            return msj
        }catch(e){
            console.log(e)
        }
    }
    
    getMsjs = async()=>{
        try {
            const data = await fs.promises.readFile(`${this.archivo}`, "utf-8")
            const dataParse = JSON.parse(data)
            return dataParse
        }catch(error) {
            return `error : ${error}`
        }
    }
    
    getByUser = async (mail)=>{
            try{
                const data = await fs.promises.readFile(`${this.archivo}`,"utf-8")
                let dataParse = JSON.parse(data)
                const buscador = dataParse.filter(((obj)=> obj.user == mail))
                console.log(buscador)
                return buscador
            }catch(error){
                console.error(error)
            }
        }
    
    
}


export default MensajesDaoFS
