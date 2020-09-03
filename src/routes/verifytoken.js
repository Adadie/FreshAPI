import jwt from 'jsonwebtoken';

/*module.exports =*/ function verify (req, res, next) {
    const token = req.header('auth-token');
    if (!token){
        return res.status(401).send('Access denied, first login to continue');
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token ')
    }
}
export default verify;