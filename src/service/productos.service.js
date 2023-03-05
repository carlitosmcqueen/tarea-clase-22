import daos from "../daos/DaoFactory.js";
const {productosDao} = await daos

export const GET = async (req, res) => {
    try {
        const data = await productosDao.getAll()
        res.status(200).send(data);        
    } catch (err) {
        res.status(404).send(err);

    }
}

export const GETbyID = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.getById(id);
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const GETbyCategory = async (req, res) => {
    try{
        const {category} = req.params
        const data = await productosDao.getByCategory(category)
        res.status(200).send(data)
    }catch(err){
        res.status(404).send(err)
    }
}

export const POST = async (req, res) => {
    try {
        const data = req.body
        await productosDao.save(data);
        res.status(201).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const PUT = async (req, res) => {
    try {
        const {id} = req.params;
        const productoUpdate = req.body
        await productosDao.updateById(id,productoUpdate)
        res.status(200).send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err);

    }
}
export const DELETE = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.deleteById(id);
            if(data){
                res.status(200).send(`El producto con id ${id} fue eliminado`);
            }else{
                res.status(404).send({err: "producto no encontrado"})
            }
    } catch (err) {
        res.status(404).send(err);
    }
}