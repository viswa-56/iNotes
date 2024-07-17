const JWT = require('jsonwebtoken')
const JWT_secret = "bajji"

// const fetchuser = (req,res,next) => {
//     const token = req.header("auth-token");
//     console.log(token)
//     if (!token){
//         res.status(401).json({error :"not a valid token "})
//     }
//     try {
//         const data = JWT.verify(token,JWT_secret)
//         console.log("Decoded data:", data);
//         req.user = data.user
//         if (req.user == {}) {
//             return res.status(401).json({ error: "Token does not contain user information" });
//         }
//         next()
//     }catch(error){
//         res.status(401).json({error :"not a valid token try catch "})
//     }
// }


const fetchuser = (req, res, next) => {
    const token = req.header("auth-token");
    // console.log("Token received:", token);
    if (!token) {
        return res.status(401).json({ error: "Not a valid token" });
    }
    try {
        const data = JWT.verify(token, JWT_secret);
        // console.log("Decoded data:", data);
        req.user = data.user;
        if (!req.user) {
            return res.status(401).json({ error: "Token does not contain user information" });
        }
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Not a valid token, try catch" });
    }
}
module.exports = fetchuser;
