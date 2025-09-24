const jwt = require("jsonwebtoken"); 


function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]; 
    const token = authHeader && authHeader.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        const secret = process.env.CHAVE_SECRETA;
        const decoded = jwt.verify(token, secret); //Verifica o token

        req.userId = decoded.id; //adiciona ID do usuário no request
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
}

module.exports = verifyToken;
