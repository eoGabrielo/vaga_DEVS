const jwt = require("jsonwebtoken"); // importa jsonwebtoken

// Middleware para verificar token JWT
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"]; // pega o header Authorization
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        const secret = process.env.CHAVE_SECRETA; // chave secreta
        const decoded = jwt.verify(token, secret); // verifica token

        req.userId = decoded.id; // adiciona ID do usuário no request
        next(); // continua para a próxima função da rota
    } catch (err) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
}

module.exports = verifyToken;
