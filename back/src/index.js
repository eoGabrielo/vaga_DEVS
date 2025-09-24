const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const connectDB = require('./data/db');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter')

//CORS
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//Ler json
app.use(express.json());

//Rotas
app.use("/user", userRouter);
app.use("/post", postRouter)

// Rota de teste
//app.get('/', (req, res) => {
//    res.send('Servidor rodando com Express!');
//});

// Conectar ao mongoDB
connectDB()

// Rodar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
