const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/florescores", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const ProdutofloresSchema = new mongoose.Schema({
    id_produtoflores : {type : String, required : true},
    descricao : {type : String},
    tipo : {type : String},
    dataentrega : {type : Date},
    quantidadeestoque : {type : Number}
})

const Usuario = mongoose.model("Usuario", UsuarioSchema);

const Produtoflores = mongoose.model("Produtoflores",ProdutofloresSchema)

app.post("/cadastrousuario", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;
  
   
  const usuario = new Usuario({
    email: email,
    senha: senha
});

  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}

});

app.post("/cadastroprodutoflores", async (req, res) => {
    
    
    const id_produtoflores = req.body.id_produtoflores;
    const descricao = req.body.descricao;
    const tipo = req.body.id_tipo;
    const dataentrega = req.body.dataentrega;
    const quantidadeestoque = req.body.quantidadeestoque;
     
    const produtoflores = new Produtoflores({
      id_produtoflores: id_produtoflores,
      descricao: descricao,
      tipo: tipo,
      dataentrega: dataentrega,
      quantidadeestoque: quantidadeestoque
    });
  
    try {
      const newProdutoflores = await produtoflores.save();
      res.json({ error: null, msg: "Cadastro ok", ProdutofloresId: newProdutoflores._id });
    } catch (error) {}
  
  });

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
