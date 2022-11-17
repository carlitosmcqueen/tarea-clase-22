const isLoggedIn = (req, res, next) => {
    if (!req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
};

export default isLoggedIn;