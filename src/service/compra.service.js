import daos from '../daos/DaoFactory.js';

const {compraDao,carritoDao,usuariosDao} = await daos

export const GET = async (req,res) => {
    try{
        console.log(req.session.user)
        const data = await compraDao.getAll()
        res.status(200).send(data);
    }catch(err) {
        res.status(404).send(err);
    }
}
export const GETbyID = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const data = await compraDao.getById(id);
        res.status(200).send(data);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const GETmisCompras = async (req, res) => {
    try{
        const user = req.session.user
        const data = await compraDao.getByUser(user)
        res.status(200).send(data)
    }catch(err){
        res.status(404).send(err)
    }

}
export const POSTCOMPRA = async (req, res) => {
    try {
        const {domicilio} = req.body
        const id = await usuariosDao.IdUser(req.session.user)
        const ID = id.id
        const prod = id.carrito[0]._id
        const carritoProductos = await carritoDao.getById(prod)
        // const data =await compraDao.crearCompra(req.session.user,ID,carritoProductos.productos,domicilio);
        // res.status(200).send(data);
        // await carritoDao.deleteAllProducts(prod)

        if (carritoProductos.productos.length == 0){
             res.status(500).send("no hay productos en el carrito")
         }else{
           const data =await compraDao.crearCompra(req.session.user,ID,carritoProductos.productos,domicilio)

           res.status(200).send(data);
            await carritoDao.deleteAllProducts(prod)
        }
    } catch (err) {
        res.status(404).send(err);
    }
}
export const DELETECOMPRA = async (req, res) => {
    try{
        const {id} = req.params
        await compraDao.deleteCompra(id)
        res.status(200).send(`la compra ${id} fue eleminada correctamente`)
    }catch(err){
        res.status(404).send(err)
    }
}


