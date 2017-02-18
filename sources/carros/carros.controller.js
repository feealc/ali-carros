var Carros = require('./carros.model.js')
var gen = require('../generic/generic.controller.js')
var validate = require('../validate/validate.controller.js')
var m = require('../generic/generic.default.js').msgResponse

//

const noShowFields = '-__v'

module.exports = {
	getAll,
	getOne,
	create,
	updFull,
	updParcial,
	del,
	delAll
}

/**
 * @api {get} /carros Recuperar as informações de todos os carros cadastrados
 * @apiName getAll
 * @apiGroup Carro
 *
 * @apiSuccess {String} marca Nome da marca.
 * @apiSuccess {String} modelo Nome do modelo.
 * @apiSuccess {String} cor Nome da cor.
 * @apiSuccess {Number} ano_fabricacao Ano da fabricação.
 * @apiSuccess {Number} ano_modelo Ano do modelo.
 * @apiSuccess {String} combustivel Nome do combustível.
 * @apiSuccess {Number} potencia Valor da potência.
 * @apiSuccess {Number} qtde_portas Quantidade de portas.
 * @apiSuccess {String} dt_criacao Data de criação (ISO 8601)
 * @apiSuccess {String} dt_ult_at Data da última modificação (ISO 8601)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "marca": "Fiat",
 *       "modelo": "Bravo",
 *       "cor": "Cinza",
 *       "ano_fabricacao": "2015",
 *       "ano_modelo": "2016",
 *       "combustivel": "Flex",
 *       "potencia": "130",
 *       "qtde_portas": "5",
 *       "dt_criacao": "2017-01-01",
 *       "dt_ult_at": "2017-01-02"
 *     }]
 */
function getAll(req, res) {

	// console.log(req.headers)

	Carros
		.find({}, noShowFields)
		.then((carros) => {
			return res
				.status(200)
				.json(carros)
		})
		.catch((err) => {
			console.log(err)
			return res
				.status(500)
				.json({message: m.c500all})
		})

}

/**
 * @api {get} /carros/:id Recuperar as informações de um carro cadastrado
 * @apiName getOne
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiSuccess {String} marca Nome da marca.
 * @apiSuccess {String} modelo Nome do modelo.
 * @apiSuccess {String} cor Nome da cor.
 * @apiSuccess {Number} ano_fabricacao Ano da fabricação.
 * @apiSuccess {Number} ano_modelo Ano do modelo.
 * @apiSuccess {String} combustivel Nome do combustível.
 * @apiSuccess {Number} potencia Valor da potência.
 * @apiSuccess {Number} qtde_portas Quantidade de portas.
 * @apiSuccess {String} dt_criacao Data de criação (ISO 8601)
 * @apiSuccess {String} dt_ult_at Data da última modificação (ISO 8601)
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "marca": "Fiat",
 *       "modelo": "Bravo",
 *       "cor": "Cinza",
 *       "ano_fabricacao": "2015",
 *       "ano_modelo": "2016",
 *       "combustivel": "Flex",
 *       "potencia": "130",
 *       "qtde_portas": "5",
 *       "dt_criacao": "2017-01-01",
 *       "dt_ult_at": "2017-01-02"
 *     }
 *
 * @apiError  CarroNaoEncontrado O <code>ID</code> do carro não foi encontrado.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "CarroNaoEncontrado"
 *     }
 */
function getOne(req, res) {

	const id = req.params.id

	Carros
		.findById(id, noShowFields)
		.then((carro) => {
			if (carro) {
				return res
					.status(200)
					.json(carro)
			} else {
				return res
					.status(404)
					.json({message: m.c404})
			}
		})
		.catch((err) => {
			console.log(err)
			return res
				.status(500)
				.json({message: c500one})
		})
}

/**
 * @api {post} /carros Cadastrar um novo carro
 * @apiName create
 * @apiGroup Carro
 *
 * @apiHeader {String} Content-Type application/json
 *
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "Content-Type": "application/json"
 *     }
 *
 * @apiParam (Body) {String} marca Obrigatório. Nome da marca.
 * @apiParam (Body) {String} modelo Obrigatório. Nome do modelo.
 * @apiParam (Body) {String} [cor] Nome da cor. Aceito somente letras.
 * @apiParam (Body) {Number} [ano_fabricacao] Ano da fabricação. Aceito somente números.
 * @apiParam (Body) {Number} [ano_modelo] Ano do modelo. Aceito somente números
 * @apiParam (Body) {String} [combustivel] Nome do combustível. Aceito somente letras.
 * @apiParam (Body) {Number} [potencia] Valor da potência. Aceito somente números.
 * @apiParam (Body) {Number} [qtde_portas] Quantidade de portas. Aceito somente números.
 *
 * @apiSuccess {String} message Carro criado.
 * @apiSuccess {String} _id O <code>ID</code> do carro criado.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroCriado",
 *       "_id": "XXX"
 *     }
 *
 * @apiError  param Nome do parâmetro com erro.
 * @apiError  msg Descrição do erro.
 * @apiError  [value] Valor do parâmetro com erro.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "param": "cor",
 *       "msg": "A cor precisa ser uma string sem números",
 *       "value": "Vermelho2"
 *     }
 */
function create(req, res) {

	validate.runExpressValidator(req)

 	req.getValidationResult().then(function(result) {

 		if (!result.isEmpty()) {

 			return res
 				.status(400)
 				.json(result.array())
 		
 		} else {

 			const carro = new Carros(req.body)
 			
 			carro
				.save()
				.then((carro) => {
					return res
						.status(201)
						.json({message: m.c201, '_id': carro._id})
				})
				.catch((err) => {
					console.log(err)
					return res
						.status(500)
						.json({message: m.c500create})
				})
 		}
	})
}

/**
 * @api {put} /carros/:id Alterar todas as informações de um carro
 * @apiDescription Este método altera a entidade inteira, mas mantém o mesmo ID do carro.
 * @apiName updFull
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiParam (Body) {String} marca Obrigatório. Nome da marca.
 * @apiParam (Body) {String} modelo Obrigatório. Nome do modelo.
 * @apiParam (Body) {String} [cor] Nome da cor. Aceito somente letras.
 * @apiParam (Body) {Number} [ano_fabricacao] Ano da fabricação. Aceito somente números.
 * @apiParam (Body) {Number} [ano_modelo] Ano do modelo. Aceito somente números
 * @apiParam (Body) {String} [combustivel] Nome do combustível. Aceito somente letras.
 * @apiParam (Body) {Number} [potencia] Valor da potência. Aceito somente números.
 * @apiParam (Body) {Number} [qtde_portas] Quantidade de portas. Aceito somente números.
 *
 * @apiSuccess {String} message Carro alterado.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroAlterado"
 *     }
 *
 * @apiError  param Nome do parâmetro com erro.
 * @apiError  msg Descrição do erro.
 * @apiError  [value] Valor do parâmetro com erro.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "param": "ano_fabricacao",
 *       "msg": "O ano de fabricação precisa ser somente números",
 *       "value": "2017a"
 *     }
 */
function updFull(req, res) { // put

	validate.runExpressValidator(req)

 	req.getValidationResult().then(function(result) {

 		if (!result.isEmpty()) {
 			
 			return res
 				.status(400)
 				.json(result.array())

 		} else {

 			const id = req.params.id
			const novoCarro = new Carros(req.body)

			Carros
				.findById(id)
				.then((carro) => {

					if (carro) {

						carro.marca = novoCarro.marca
						carro.modelo = novoCarro.modelo
						carro.cor = novoCarro.cor
						carro.ano_fabricacao = novoCarro.ano_fabricacao
						carro.ano_modelo = novoCarro.ano_modelo
						carro.combustivel = novoCarro.combustivel
						carro.potencia = novoCarro.potencia
						carro.qtde_portas = novoCarro.qtde_portas
						// carro.dt_criacao
						carro.dt_ult_at = gen.getCurrentDate()
						
						carro
							.save()
							.then(() => {
								return res
									.status(200)
									.json({message: m.c200upd})
							})
							.catch((err) => {
								console.log(err)
								return res
									.status(400)
									.json({message: m.c400upd})
							})
					} else {
						return res
							.status(404)
							.json({message: m.c404})
					}

				})
				.catch((err) => {
					console.log(err)
					return res
						.status(500)
						.json({message: m.c500})
				})
 		}
	})
}

/**
 * @api {patch} /carros/:id Alterar informações de um carro
 * @apiDescription Este método altera somente as propriedades da entidade que foram passadas no body e mantém o mesmo ID do carro.
 * @apiName updParcial
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiParam (Body) {String} marca Obrigatório. Nome da marca.
 * @apiParam (Body) {String} modelo Obrigatório. Nome do modelo.
 * @apiParam (Body) {String} [cor] Nome da cor. Aceito somente letras.
 * @apiParam (Body) {Number} [ano_fabricacao] Ano da fabricação. Aceito somente números.
 * @apiParam (Body) {Number} [ano_modelo] Ano do modelo. Aceito somente números
 * @apiParam (Body) {String} [combustivel] Nome do combustível. Aceito somente letras.
 * @apiParam (Body) {Number} [potencia] Valor da potência. Aceito somente números.
 * @apiParam (Body) {Number} [qtde_portas] Quantidade de portas. Aceito somente números.
 *
 * @apiSuccess {String} message Carro alterado.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroAlterado"
 *     }
 *
 * @apiError  param Nome do parâmetro com erro.
 * @apiError  msg Descrição do erro.
 * @apiError  [value] Valor do parâmetro com erro.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "param": "modelo",
 *       "msg": "O modelo é obrigatório",
 *     }
 */
function updParcial(req, res) { // patch

	validate.runExpressValidator(req)

 	req.getValidationResult().then(function(result) {

 		if (!result.isEmpty()) {
 			
 			return res
 				.status(400)
 				.json(result.array())

 		} else {

 			const id = req.params.id

			Carros
				.findById(id)
				.then(carro => {

					if (carro) {

						carro.marca = req.body.marca || carro.marca
						carro.modelo = req.body.modelo || carro.modelo
						carro.cor = req.body.cor || carro.cor
						carro.ano_fabricacao = req.body.ano_fabricacao || carro.ano_fabricacao
						carro.ano_modelo = req.body.ano_modelo || carro.ano_modelo
						carro.combustivel = req.body.combustivel || carro.combustivel
						carro.potencia = req.body.potencia || carro.potencia
						carro.qtde_portas = req.body.qtde_portas || carro.qtde_portas
						// carro.dt_criacao
						carro.dt_ult_at = gen.getCurrentDate()
						
						carro
							.save()
							.then(() => {
								return res
									.status(200)
									.json({message: m.c200upd})
							})
							.catch((err) => {
								console.log(err)
								return res
									.status(400)
									.json({message: m.c400upd})
							})

					} else {
						return res
							.status(404)
							.json({message: m.c404})
					}

				})
				.catch(() => {
					return res
						.status(500)
						.json({message: m.c500})
				})
 			
 		}
	})
}

/**
 * @api {delete} /carros/:id Apagar um carro
 * @apiName del
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiSuccess {String} message Carro apagado.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroApagado"
 *     }
 *
 * @apiError  CarroNaoEncontrado O <code>ID</code> do carro não foi encontrado.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "CarroNaoEncontrado"
 *     }
 */
function del(req, res) {

	const id = req.params.id

	Carros
		.findByIdAndRemove(id)
		.then((carro) => {
			if (carro) {
				return res
					.status(200)
					.json({message: m.c200del})
			} else {
				return res
					.status(404)
					.json({message: m.c404})
			}
		})
		.catch((err) => {
			console.log(err)
			return res
				.status(400)
				.json({message: m.c400del})
		})

}

/**
 * @apiIgnore
 * @api {delete} /carros/:id Apagar todos os carros
 * @apiName delAll
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiSuccess {String} message Carro apagado.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroApagado"
 *     }
 */
function delAll(req, res) {

	Carros
		.remove({})
		.then(() => {
			console.log('\n===== TODOS OS REGISTROS FORAM APAGADOS!!!! =====\n')
			return res
				.status(200)
				.json({message: 'TodosCarrosApagados'})
		})
		.catch((err) => {
			console.log(err)
			return res
				.status(400)
				.json({message: 'ErroApagarTodosCarros'})
		})

}
