const express = require("express");
const router = express.Router();
const Post = require("../models/postSchema"); // modelo de vaga
const User = require("../models/userSchema"); // modelo de usuário
const verifyToken = require("../middlewares/verifyToken")


router.post("/criar", verifyToken, async (req, res) => {
    try {
        const { titulo, empresa, descricao, stacks } = req.body;

        if (!titulo || !empresa || !descricao) {
            return res.status(400).json({ message: "Preencha todos os campos!" });
        }

        const newPost = new Post({
            titulo: titulo,
            empresa: empresa,
            descricao: descricao,
            stacks: Array.isArray(stacks) ? stacks : [],
            createdBy: req.userId // ID do usuário vindo do JWT
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/buscar", verifyToken, async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy", "_id email")
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try{
        const id = req.params.id

        const verificaPostExiste = await Post.findById(id);

        if(!verificaPostExiste){
             return res.status(404).json({mesasge: "Post não encontrado, exclusão negada!"})
        }

        await Post.findByIdAndDelete(id)

        return res.status(200).json({mesasge: "Post Excluido com sucesso!"})
    }catch(err){
        return res.status(500).json({mesasge: "Erro excluir post ", err})
    }
})


module.exports = router;
