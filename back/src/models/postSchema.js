const mongoose = require("mongoose"); // importa mongoose

// Schema do comentário
const CommentSchema = new mongoose.Schema({
    texto: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }// data do comentário
});


// Schema da vaga (post)
const PostSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    empresa: { type: String, required: true },
    descricao: { type: String, required: true },
    stacks: [{ type: String, required: true }], // tecnologias da vaga
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comentarios: [CommentSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
