
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/dbflorescores", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true },
  endereco: { type: String },
  numero: { type: Number },
  cep: { type: String, required: true },
  nascimento: { type: Date, required: true },
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async (req, res) => {
  const nome = req.body.nome;
  const email = req.body.email;
  const endereco = req.body.endereco;
  const numero = req.body.numero;
  const cep = req.body.cep;
  const nascimento = req.body.nascimento;

  if(nome == null || email == null || endereco == null || numero == null || cep == null || nascimento == null){
    return res.status(400).json({error : "Preenchar todos os campos!!!"});
  }

  const emailExiste = await Usuario.findOne({email : email});

  if(emailExiste){
    return res.status(400).json({error : "O email informado já existe"});
  }

  
  const usuario = new Usuario({
    nome: nome,
    email: email,
    endereco: endereco,
    numero: numero,
    cep: cep,
    nascimento: nascimento
  });

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});