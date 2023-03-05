import daos from "../daos/DaoFactory.js";
const {usuariosDao,mensajesDao} = await daos

export const GetMessage = async (req, res) => {
    try{
        const usuarios = await usuariosDao.getAll()
    const usuariosData = usuarios.map(obj => obj.username)
    res.render('main', {layout: 'mensajes',user: req.session.user, usuarios: usuariosData})
    }catch(e){
        res.status(404).send(e)
    }
    
}
export const GetMessageUser = async (req, res) => {
    try{
        const mail = req.session.user
        const data = await mensajesDao.getByUser(mail)
        res.render("main",{layout:"misMensajes",mensajes: data, user:req.session.user})
    }catch(e){
        res.status(404).send(e)
    }
}