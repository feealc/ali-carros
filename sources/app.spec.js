var chai = require('chai')
var chaiHttp = require('chai-http')
var expect  = require("chai").expect
var Carros = require('./carros/carros.model.js')

//

// Objetos
var cKeys = require('./generic/generic.spec.js').carroKeys
var oC = require('./generic/generic.spec.js').objCreate
var oUF = require('./generic/generic.spec.js').objUpdFull
var oUP = require('./generic/generic.spec.js').objUpdParcial

// Mensagens
var msg = require('./generic/generic.default.js').errorMessagesValidator
var param = require('./generic/generic.default.js').carrosParamModel
var eVP = require('./generic/generic.default.js').expressValidatorParam
var m = require('./generic/generic.default.js').msgResponse

//

var port = 4001
var urlBase = `http://localhost:${port}/api`
var idCarroTeste = "" // Com todas as informacoes
var idCarroTeste2 = "" // Somente marca e modelo

//

chai.use(chaiHttp)

//

describe("Documentacao APIDOC", function() {
	it('Header == html', function(done) {
		chai.request(urlBase)
		.get('/doc')
		.end(function(err, res) {
			expect(res).to.be.html // header content-type = application/html
			done()
		})
	})
})

describe("Recuperar todos os carros - getAll", function() {
	it('Header == json', function(done) {
		chai.request(urlBase)
		.get('/carros')
		.end(function(err, res) {
			expect(res).to.be.json // header content-type = application/json
			done()
		})
	})
	it('Status == 200', function(done) {
		chai.request(urlBase)
		.get('/carros')
		.end(function(err, res) {
			expect(res).to.have.status(200)
			done()
		})
	})
	it('Body == Array', function(done) {
		chai.request(urlBase)
		.get('/carros')
		.end(function(err, res) {
			expect(res.body).to.be.instanceof(Array)
			done()
		})
	})
	it('Campos ok', function(done) {
		chai.request(urlBase)
		.get('/carros')
		.end(function(err, res) {
			expect(res).to.have.status(200)
			if (res.body.length > 0) {
				var ret = res.body.shift()
				expect(ret).to.have.all.keys(cKeys)
				expect(ret).to.not.have.all.keys([param.v])
			}
			done()
		})
	})
})

describe("Cadastrar um carro - create", function() {
	it('Informacoes ok - todos os campos', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroOk)
		.end(function(err, res) {
			idCarroTeste = res.body._id // guardar o id do carro criado para usar nos outros testes
			expect(res).to.have.status(201)
			expect(res.body).to.have.all.keys(['message', param.id])
			expect(res.body.message).to.have.string(m.c201)
			done()
		})
	})
	it('Informacoes ok - somente marca e modelo', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroOkMini)
		.end(function(err, res) {
			idCarroTeste2 = res.body._id // guardar o id do carro criado para usar nos outros testes
			expect(res).to.have.status(201)
			expect(res.body).to.have.all.keys(['message', param.id])
			expect(res.body.message).to.have.string(m.c201)
			done()
		})
	})
	it('Informacoes nok - marca ausente', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroMarcaAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array2)
			expect(ret.param).to.have.string(param.marca)
			expect(ret.msg).to.have.string(msg.marca)
			done()
		})
	})
	it('Informacoes nok - modelo ausente', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroModeloAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array2)
			expect(ret.param).to.have.string(param.modelo)
			expect(ret.msg).to.have.string(msg.modelo)
			done()
		})
	})
	it('Informacoes nok - cor invalida', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroCorInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.cor)
			expect(ret.msg).to.have.string(msg.cor)
			expect(ret.value).to.have.string(oC.carroCorInvalida.cor)
			done()
		})
	})
	it('Informacoes nok - ano fabricacao invalido', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroAnoFabricacaoInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.ano_fab)
			expect(ret.msg).to.have.string(msg.ano_fabricacao)
			expect(ret.value).to.have.string(oC.carroAnoFabricacaoInvalido.ano_fabricacao)
			done()
		})
	})
	it('Informacoes nok - ano modelo invalido', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroAnoModeloInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.ano_mod)
			expect(ret.msg).to.have.string(msg.ano_modelo)
			expect(ret.value).to.have.string(oC.carroAnoModeloInvalido.ano_modelo)
			done()
		})
	})
	it('Informacoes nok - combustivel invalido', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroCombustivelInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.comb)
			expect(ret.msg).to.have.string(msg.combustivel)
			expect(ret.value).to.have.string(oC.carroCombustivelInvalido.combustivel)
			done()
		})
	})
	it('Informacoes nok - potencia invalida', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroPotenciaInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.pot)
			expect(ret.msg).to.have.string(msg.potencia)
			expect(ret.value).to.have.string(oC.carroPotenciaInvalida.potencia)
			done()
		})
	})
	it('Informacoes nok - qtde portas invalida', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroQtdePortasInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.qt_pt)
			expect(ret.msg).to.have.string(msg.qtde_portas)
			expect(ret.value).to.have.string(oC.carroQtdePortasInvalida.qtde_portas)
			done()
		})
	})
	it('Informacoes nok - todos os campos invalidos', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(oC.carroNok)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			expect(res.body).to.have.lengthOf(8)
			done()
		})
	})
})

describe("Validar o ID", function() {
	it('ID nok', function(done) {
		chai.request(urlBase)
		.get('/carros/67678hgjh66')
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c400id)
			done()
		})
	})
})

describe("Recuperar um carro - getOne", function() {
	it('Carro encontrado', function(done) {
		chai.request(urlBase)
		.get(`/carros/${idCarroTeste}`)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(cKeys)
			expect(res.body).to.not.have.all.keys([param.v])
			done()
		})
	})
	it('Carro não encontrado', function(done) {
		var idCarroTeste404 = idCarroTeste.replace(/0/g, 9).replace(/1/g, 8).replace(/2/g, 7).replace(/3/g, 6).replace(/4/g, 5)
		chai.request(urlBase)
		.get(`/carros/${idCarroTeste404}`)
		.end(function(err, res) {
			expect(res).to.have.status(404)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c404)
			done()
		})
	})
})

describe("Atualizar um carro - updFull (put)", function() {
	it('Carro não encontrado', function(done) {
		var idCarroTeste404 = idCarroTeste.replace(/0/g, 9).replace(/1/g, 8).replace(/2/g, 7).replace(/3/g, 6).replace(/4/g, 5)
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste404}`)
		.send(oUF.updFullCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(404)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c404)
			done()
		})
	})
	it('Informacoes ok', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c200upd)
			done()
		})
	})
	it('Informacoes nok - marca ausente', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroMarcaAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array2)
			expect(ret.param).to.have.string(param.marca)
			expect(ret.msg).to.have.string(msg.marca)
			done()
		})
	})
	it('Informacoes nok - modelo ausente', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroModeloAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array2)
			expect(ret.param).to.have.string(param.modelo)
			expect(ret.msg).to.have.string(msg.modelo)
			done()
		})
	})
	it('Informacoes nok - cor invalida', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroCorInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.cor)
			expect(ret.msg).to.have.string(msg.cor)
			expect(ret.value).to.have.string(oUF.updFullCarroCorInvalida.cor)
			done()
		})
	})
	it('Informacoes nok - ano fabricacao invalido', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroAnoFabricacaoInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.ano_fab)
			expect(ret.msg).to.have.string(msg.ano_fabricacao)
			expect(ret.value).to.have.string(oUF.updFullCarroAnoFabricacaoInvalido.ano_fabricacao)
			done()
		})
	})
	it('Informacoes nok - ano modelo invalido', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroAnoModeloInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.ano_mod)
			expect(ret.msg).to.have.string(msg.ano_modelo)
			expect(ret.value).to.have.string(oUF.updFullCarroAnoModeloInvalido.ano_modelo)
			done()
		})
	})
	it('Informacoes nok - combustivel invalido', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroCombustivelInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.comb)
			expect(ret.msg).to.have.string(msg.combustivel)
			expect(ret.value).to.have.string(oUF.updFullCarroCombustivelInvalido.combustivel)
			done()
		})
	})
	it('Informacoes nok - potencia invalida', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroPotenciaInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.pot)
			expect(ret.msg).to.have.string(msg.potencia)
			expect(ret.value).to.have.string(oUF.updFullCarroPotenciaInvalida.potencia)
			done()
		})
	})
	it('Informacoes nok - qtde portas invalida', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroQtdePortasInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.qt_pt)
			expect(ret.msg).to.have.string(msg.qtde_portas)
			expect(ret.value).to.have.string(oUF.updFullCarroQtdePortasInvalida.qtde_portas)
			done()
		})
	})
	it('Informacoes nok - todos os campos invalidos', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(oUF.updFullCarroNok)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			expect(res.body).to.have.lengthOf(8)
			done()
		})
	})
})

describe("Atualizar um carro - updParcial (patch)", function() {
	it('Carro não encontrado', function(done) {
		var idCarroTeste404 = idCarroTeste.replace(/0/g, 'f').replace(/1/g, 2).replace(/2/g, 'b').replace(/3/g, 4).replace(/4/g, 'a')
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste404}`)
		.send(oUP.updParcialCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(404)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c404)
			done()
		})
	})
	it('Informacoes ok', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c200upd)
			done()
		})
	})
	it('Informacoes nok - marca ausente', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroMarcaAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array2)
			expect(ret.param).to.have.string(param.marca)
			expect(ret.msg).to.have.string(msg.marca)
			done()
		})
	})
	it('Informacoes nok - modelo ausente', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroModeloAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array2)
			expect(ret.param).to.have.string(param.modelo)
			expect(ret.msg).to.have.string(msg.modelo)
			done()
		})
	})
	it('Informacoes nok - cor invalida', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroCorInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.cor)
			expect(ret.msg).to.have.string(msg.cor)
			expect(ret.value).to.have.string(oUP.updParcialCarroCorInvalida.cor)
			done()
		})
	})
	it('Informacoes nok - ano fabricacao invalido', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroAnoFabricacaoInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.ano_fab)
			expect(ret.msg).to.have.string(msg.ano_fabricacao)
			expect(ret.value).to.have.string(oUP.updParcialCarroAnoFabricacaoInvalido.ano_fabricacao)
			done()
		})
	})
	it('Informacoes nok - ano modelo invalido', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroAnoModeloInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.ano_mod)
			expect(ret.msg).to.have.string(msg.ano_modelo)
			expect(ret.value).to.have.string(oUP.updParcialCarroAnoModeloInvalido.ano_modelo)
			done()
		})
	})
	it('Informacoes nok - combustivel invalido', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroCombustivelInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.comb)
			expect(ret.msg).to.have.string(msg.combustivel)
			expect(ret.value).to.have.string(oUP.updParcialCarroCombustivelInvalido.combustivel)
			done()
		})
	})
	it('Informacoes nok - potencia invalida', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroPotenciaInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.pot)
			expect(ret.msg).to.have.string(msg.potencia)
			expect(ret.value).to.have.string(oUP.updParcialCarroPotenciaInvalida.potencia)
			done()
		})
	})
	it('Informacoes nok - qtde portas invalida', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroQtdePortasInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(eVP.array3)
			expect(ret.param).to.have.string(param.qt_pt)
			expect(ret.msg).to.have.string(msg.qtde_portas)
			expect(ret.value).to.have.string(oUP.updParcialCarroQtdePortasInvalida.qtde_portas)
			done()
		})
	})
	it('Informacoes nok - todos os campos invalidos', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(oUP.updParcialCarroNok)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			expect(res.body).to.have.lengthOf(8)
			done()
		})
	})
})

describe("Apagar um carro - del", function() {
	it('Carro não encontrado', function(done) {
		var idCarroTeste404 = idCarroTeste.replace(/0/g, 'f').replace(/1/g, 2).replace(/2/g, 'b').replace(/3/g, 4).replace(/4/g, 'a')
		chai.request(urlBase)
		.delete(`/carros/${idCarroTeste404}`)
		.end(function(err, res) {
			expect(res).to.have.status(404)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c404)
			done()
		})
	})
	it('Informacoes ok - todos os campos', function(done) {
		chai.request(urlBase)
		.delete(`/carros/${idCarroTeste}`)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c200del)
			done()
		})
	})
	it('Informacoes ok - somente marca e modelo', function(done) {
		chai.request(urlBase)
		.delete(`/carros/${idCarroTeste2}`)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string(m.c200del)
			done()
		})
	})
})
