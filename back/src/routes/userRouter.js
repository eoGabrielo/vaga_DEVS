const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
require('dotenv').config();
const jwt = require("jsonwebtoken");

// Rota de registro
router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "Email ou Senha não informados, cadastro negado!" })
        }

        const senhaCriptografada = await bcrypt.hash(password, 10)

        const verificarExistenciaEmail = await User.findOne({ email: email });

        if (verificarExistenciaEmail) {
            return res.json({ message: "Email já cadastrado!" })
        }

        const novoUser = new User({
            email: email,
            password: senhaCriptografada
        })

        await novoUser.save()
        return res.status(201).json({ message: "Usuário registrado com sucesso" });

    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor", error: error.message });
    }
});

// Rota de login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ message: "Email ou Senha não informados, login negado!" })
        }

        //Verificar usuario existente no banco de dados
        const user = await User.findOne({ email: email });
        if (!user){
            return res.status(404).json({ message: "Usuario não localizado" })
        }

        const senhaDescriptografada = bcrypt.compare(password, user.password)
        if (!senhaDescriptografada){
            return res.status(400).json({ message: "Senha inválida" });
        }

        //Cria token com payload do user
        const token = jwt.sign({id: user._id, email: user.email}, process.env.CHAVE_SECRETA, {expiresIn: "1h"})


    return res.status(200).json({ message: "Login realizado com sucesso", token, userId: user._id });//Retorna o payload no "res"
    } catch (error) {
        return res.status(500).json({ message: "Erro no servidor" });
    }
});

module.exports = router;
