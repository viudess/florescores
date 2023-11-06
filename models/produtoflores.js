const mongoose = require('mongoose');

const FloresSchema = new mongoose.Schema({
id_produtosflores : {
type : String,
required : true
},
descricao: {
type: String
},
tipo : {
type: String
},
dataentrega : {
type : Date
},
quantidadeestoque : {
type : String
},
});

const Flores = mongoose.model("Flores", PartySchema);
module.exports = Flores;