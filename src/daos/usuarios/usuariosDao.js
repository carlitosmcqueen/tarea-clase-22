import ContenedorMongo from "../../contenedores/contenedorMongo.js"

class UsuarioDaoMongo extends ContenedorMongo {
    constructor() {
        super("usuarios", { user: String, password: String });
    }

    async findUserByName(username) {
        const user = await this.db.find({ username });
        return user;
    }
    
    async findUser(username, password) {
        try {
            const result = await this.db.find({ username, password });
            if (result.length == 0) {
                throw new Error("Usuario o contraseña incorrectos");
            } else {
                const user = result[0];
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UsuarioDaoMongo;