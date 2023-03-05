const authMw= (req, res, next) => {

    if (!req.isAuthenticated()) return res.send({error:true});
    
    next();
    
    };
export default authMw;