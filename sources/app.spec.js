// var expect = require("chai").expect
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect  = require("chai").expect
var Carros = require('./carros/carros.model.js')
var tst = require('./generic/generic.spec.js')
var msg = require('./generic/generic.default.js').errorMessagesValidator
var param = require('./generic/generic.default.js').carrosParamModel

//

var urlBase = "http://localhost:4001/api"
var idCarroTeste = ""

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
				expect(ret).to.have.all.keys(tst.carroKeys)
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
		// .set('content-type', 'application/json')
		.send(tst.carroOk)
		.end(function(err, res) {
			idCarroTeste = res.body._id // guardar o id do carro criado para usar nos outros testes
			expect(res).to.have.status(201)
			expect(res.body).to.have.all.keys(['message', param.id])
			expect(res.body.message).to.have.string('CarroCriado')
			done()
		})
	})
	// it('Informacoes ok - somente marca e modelo', function(done) {

	// })
	it('Informacoes nok - marca ausente', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroMarcaAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg'])
			expect(ret.param).to.have.string(param.marca)
			expect(ret.msg).to.have.string(msg.marca)
			done()
		})
	})
	it('Informacoes nok - modelo ausente', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroModeloAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg'])
			expect(ret.param).to.have.string(param.modelo)
			expect(ret.msg).to.have.string(msg.modelo)
			done()
		})
	})
	it('Informacoes nok - cor invalida', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroCorInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.cor)
			expect(ret.msg).to.have.string(msg.cor)
			expect(ret.value).to.have.string(tst.carroCorInvalida.cor)
			done()
		})
	})
	it('Informacoes nok - ano fabricacao invalido', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroAnoFabricacaoInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.ano_fab)
			expect(ret.msg).to.have.string(msg.ano_fabricacao)
			expect(ret.value).to.have.string(tst.carroAnoFabricacaoInvalido.ano_fabricacao)
			done()
		})
	})
	it('Informacoes nok - ano modelo invalido', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroAnoModeloInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.ano_mod)
			expect(ret.msg).to.have.string(msg.ano_modelo)
			expect(ret.value).to.have.string(tst.carroAnoModeloInvalido.ano_modelo)
			done()
		})
	})
	it('Informacoes nok - combustivel invalido', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroCombustivelInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.comb)
			expect(ret.msg).to.have.string(msg.combustivel)
			expect(ret.value).to.have.string(tst.carroCombustivelInvalido.combustivel)
			done()
		})
	})
	it('Informacoes nok - potencia invalida', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroPotenciaInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.pot)
			expect(ret.msg).to.have.string(msg.potencia)
			expect(ret.value).to.have.string(tst.carroPotenciaInvalida.potencia)
			done()
		})
	})
	it('Informacoes nok - qtde portas invalida', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroQtdePortasInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.qt_pt)
			expect(ret.msg).to.have.string(msg.qtde_portas)
			expect(ret.value).to.have.string(tst.carroQtdePortasInvalida.qtde_portas)
			done()
		})
	})
	it('Informacoes nok - todos os campos invalidos', function(done) {
		chai.request(urlBase)
		.post('/carros')
		.send(tst.carroNok)
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
			expect(res.body.message).to.have.string('invalid id')
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
			expect(res.body).to.have.all.keys(tst.carroKeys)
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
			expect(res.body.message).to.have.string('CarroNaoEncontrado')
			done()
		})
	})
})

describe("Atualizar um carro - updFull (put)", function() {
	it('Carro não encontrado', function(done) {
		var idCarroTeste404 = idCarroTeste.replace(/0/g, 9).replace(/1/g, 8).replace(/2/g, 7).replace(/3/g, 6).replace(/4/g, 5)
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste404}`)
		.send(tst.updFullCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(404)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string('CarroNaoEncontrado')
			done()
		})
	})
	it('Informacoes ok', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string('CarroAlterado')
			done()
		})
	})
	it('Informacoes nok - marca ausente', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroMarcaAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg'])
			expect(ret.param).to.have.string(param.marca)
			expect(ret.msg).to.have.string(msg.marca)
			done()
		})
	})
	it('Informacoes nok - modelo ausente', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroModeloAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg'])
			expect(ret.param).to.have.string(param.modelo)
			expect(ret.msg).to.have.string(msg.modelo)
			done()
		})
	})
	it('Informacoes nok - cor invalida', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroCorInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.cor)
			expect(ret.msg).to.have.string(msg.cor)
			expect(ret.value).to.have.string(tst.updFullCarroCorInvalida.cor)
			done()
		})
	})
	it('Informacoes nok - ano fabricacao invalido', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroAnoFabricacaoInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.ano_fab)
			expect(ret.msg).to.have.string(msg.ano_fabricacao)
			expect(ret.value).to.have.string(tst.updFullCarroAnoFabricacaoInvalido.ano_fabricacao)
			done()
		})
	})
	it('Informacoes nok - ano modelo invalido', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroAnoModeloInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.ano_mod)
			expect(ret.msg).to.have.string(msg.ano_modelo)
			expect(ret.value).to.have.string(tst.updFullCarroAnoModeloInvalido.ano_modelo)
			done()
		})
	})
	it('Informacoes nok - combustivel invalido', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroCombustivelInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.comb)
			expect(ret.msg).to.have.string(msg.combustivel)
			expect(ret.value).to.have.string(tst.updFullCarroCombustivelInvalido.combustivel)
			done()
		})
	})
	it('Informacoes nok - potencia invalida', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroPotenciaInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.pot)
			expect(ret.msg).to.have.string(msg.potencia)
			expect(ret.value).to.have.string(tst.updFullCarroPotenciaInvalida.potencia)
			done()
		})
	})
	it('Informacoes nok - qtde portas invalida', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroQtdePortasInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.qt_pt)
			expect(ret.msg).to.have.string(msg.qtde_portas)
			expect(ret.value).to.have.string(tst.updFullCarroQtdePortasInvalida.qtde_portas)
			done()
		})
	})
	it('Informacoes nok - todos os campos invalidos', function(done) {
		chai.request(urlBase)
		.put(`/carros/${idCarroTeste}`)
		.send(tst.updFullCarroNok)
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
		.send(tst.updParcialCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(404)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string('CarroNaoEncontrado')
			done()
		})
	})
	it('Informacoes ok', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroOk)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string('CarroAlterado')
			done()
		})
	})
	it('Informacoes nok - marca ausente', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroMarcaAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg'])
			expect(ret.param).to.have.string(param.marca)
			expect(ret.msg).to.have.string(msg.marca)
			done()
		})
	})
	it('Informacoes nok - modelo ausente', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroModeloAusente)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg'])
			expect(ret.param).to.have.string(param.modelo)
			expect(ret.msg).to.have.string(msg.modelo)
			done()
		})
	})
	it('Informacoes nok - cor invalida', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroCorInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.cor)
			expect(ret.msg).to.have.string(msg.cor)
			expect(ret.value).to.have.string(tst.updParcialCarroCorInvalida.cor)
			done()
		})
	})
	it('Informacoes nok - ano fabricacao invalido', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroAnoFabricacaoInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.ano_fab)
			expect(ret.msg).to.have.string(msg.ano_fabricacao)
			expect(ret.value).to.have.string(tst.updParcialCarroAnoFabricacaoInvalido.ano_fabricacao)
			done()
		})
	})
	it('Informacoes nok - ano modelo invalido', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroAnoModeloInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.ano_mod)
			expect(ret.msg).to.have.string(msg.ano_modelo)
			expect(ret.value).to.have.string(tst.updParcialCarroAnoModeloInvalido.ano_modelo)
			done()
		})
	})
	it('Informacoes nok - combustivel invalido', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroCombustivelInvalido)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.comb)
			expect(ret.msg).to.have.string(msg.combustivel)
			expect(ret.value).to.have.string(tst.updParcialCarroCombustivelInvalido.combustivel)
			done()
		})
	})
	it('Informacoes nok - potencia invalida', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroPotenciaInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.pot)
			expect(ret.msg).to.have.string(msg.potencia)
			expect(ret.value).to.have.string(tst.updParcialCarroPotenciaInvalida.potencia)
			done()
		})
	})
	it('Informacoes nok - qtde portas invalida', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroQtdePortasInvalida)
		.end(function(err, res) {
			expect(res).to.have.status(400)
			expect(res.body).to.be.instanceof(Array)
			var ret = res.body.shift()
			expect(ret).to.have.all.keys(['param', 'msg', 'value'])
			expect(ret.param).to.have.string(param.qt_pt)
			expect(ret.msg).to.have.string(msg.qtde_portas)
			expect(ret.value).to.have.string(tst.updParcialCarroQtdePortasInvalida.qtde_portas)
			done()
		})
	})
	it('Informacoes nok - todos os campos invalidos', function(done) {
		chai.request(urlBase)
		.patch(`/carros/${idCarroTeste}`)
		.send(tst.updParcialCarroNok)
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
			expect(res.body.message).to.have.string('CarroNaoEncontrado')
			done()
		})
	})
	it('Informacoes ok', function(done) {
		chai.request(urlBase)
		.delete(`/carros/${idCarroTeste}`)
		.end(function(err, res) {
			expect(res).to.have.status(200)
			expect(res.body).to.have.all.keys(['message'])
			expect(res.body.message).to.have.string('CarroApagado')
			done()
		})
	})
})
