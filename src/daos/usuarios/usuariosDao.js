import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class UsuarioDaoMongo extends ContenedorMongo {
    constructor() {
        super("usuarios", { user: String, password: String });
    }

    async findUserByName(username) {
        try{
            const user = await this.db.find({ username });
            logger.info("se encontro la usuario")
            return user;
        }catch(err){
            logger.error(`error al buscar usuario: ${err}`)
        }
    }
    async findUser(username, password) {
        try {
            const result = await this.db.find({ username, password });
            if (result.length == 0) {
                throw new Error("Usuario o contraseña incorrectos");
            } else {
                const user = result[0];
                logger.info("se encontro al usuario")
                return user;
            }
        } catch (error) {
            logger.error(`error al buscar usuario: ${error}`)
        }
    }
}
export default UsuarioDaoMongo;