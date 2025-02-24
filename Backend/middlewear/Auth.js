const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {    
        
        try {
            const token = req.cookies.token;
                const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
                req.user = decoded;
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "An error occurred Please login again",
                    status: false,
                    redirectroute: "/login"
                });
            }
        }

        const verifyTokenForSocket = async (token) =>{
            try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                 const  user = decoded;
                 if(!user) throw new Error("Unauthorized");
                 return user;
                } catch (error) {
                    return false;
                }
        }
module.exports = { verifyToken , verifyTokenForSocket };