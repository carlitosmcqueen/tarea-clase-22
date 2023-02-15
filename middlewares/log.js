 const authMw= (req, res, next) => {

    if (!req.isAuthenticated()) return res.send({error:false});
    
    next();
    
    };
export default authMw;