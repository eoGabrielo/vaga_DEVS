const mongoose = require("mongoose"); 

const PostSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    empresa: { type: String, required: true },
    descricao: { type: String, required: true },
    stacks: [{ type: String, required: true }],
    emailContato: { type: String, required: false },
    whatsappContato: { type: String, required: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
