var mongoose = require('mongoose')
var gen = require('../generic/generic.controller.js')

//

const schema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  cor: {
    type: String,
    default: null,
  },
  ano_fabricacao: {
    type: Number,
    default: null,
  },
  ano_modelo: {
    type: Number,
    default: null,
  },
  combustivel: {
    type: String,
    default: null,
  },
  potencia: {
    type: Number,
    default: null,
  },
  qtde_portas: {
    type: Number,
    default: null,
  },
  dt_criacao: {
    type: String,
    default: gen.getCurrentDate,
  },
  dt_ult_at: {
  	type: String,
  	default: null,
  }
})

module.exports = mongoose.model('carros', schema)

