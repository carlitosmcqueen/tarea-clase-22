const authMw = (req, res, next) => {

    if (!req.isAuthenticated()) return res.send({
        error: "necesita iniciar session primero"
    });
    next();
};

const isAdmin = (req, res, next) => {
    const admin = true;
        if (admin) {
        next();
        } else {
            const route = req.originalUrl;
            const method = req.method;
            res.status(401).json({error: -2,descripcion: `Ruta ${route} método ${method} no autorizada`,
    });
}
}
export {authMw,isAdmin}