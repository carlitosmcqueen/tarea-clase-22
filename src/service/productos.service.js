import daos from "../daos/index.js";
const {productosDao} = await daos

export const GET = async (req, res) => {
    try {
        const data = await productosDao.getAll()
        res.send(data);
        
    } catch (err) {
        res.status(404).send(err);

    }
}

export const GETbyID = async (req, res) => {
    try {
        const {id} = req.params;
        const data = await productosDao.getById(id);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);

    }
}

export const POST = async (req, res) => {
    try {
        const data = req.body;
        await productosDao.save(data);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);

    }
}

export const PUT = async (req, res) => {
    try {
        const {id} = req.params;
        const prodNuevo = req.body;
        const idInt = parseInt(id);
        productosDao.updateById(idInt, prodNuevo);
        res.send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err);

    }
}

export const DELETE = async (req, res) => {
    try {
        const {id} = req.params;
        await productosDao.deleteById(id);
        res.send(`El producto con id ${id} fue eliminado`);
    } catch (err) {
        res.status(404).send(err);


    }
}