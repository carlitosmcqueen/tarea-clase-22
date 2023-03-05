import daos from "../daos/index.js";
const {usuariosDao,mensajesDao} = await daos

export const GetMessage = async (req, res) => {
    const usuarios = await usuariosDao.getAll()
    const usuariosData = usuarios.map(obj => obj.username)
    res.render('main', {layout: 'mensajes',user: req.session.user, usuarios: usuariosData})
}
export const GetMessageUser = async (req, res) => {
    const mail = req.session.user
    const data = await mensajesDao.getByUser(mail)
    
    res.render("main",{layout:"misMensajes",mensajes: data, user:req.session.user})
}