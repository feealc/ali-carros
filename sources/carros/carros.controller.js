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
 * @apiVersion 1.0.0
 * @apiName getAll
 * @apiGroup Carro
 *
 * @apiUse CarroRetornoSucesso
 *
 * @apiUse CarroExemploSucessoArray
 */
function getAll(req, res) {

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
 * @apiVersion 1.0.0
 * @apiName getOne
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiUse CarroRetornoSucesso
 *
 * @apiUse CarroExemploSucessoSimples
 *
 * @apiUse CarroRetornoErroNaoEncontrado
 * @apiUse IDInvalidoErro
 */
function getOne(req, res) {

	const id = req.body.id || req.params.id

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
 * @apiVersion 1.0.0
 * @apiName create
 * @apiGroup Carro
 *
 * @apiUse HeaderCType
 *
 * @apiUse CarroRequisicaoBody
 *
 * @apiSuccess {String} message Mensagem de sucesso.
 * @apiSuccess {String} _id O ID do carro criado.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroCriado",
 *       "_id": "XXX"
 *     }
 *
 * @apiUse CarroRetornoErroValidacao
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
 * @apiVersion 1.0.0
 * @apiDescription Este método altera a entidade inteira, mas mantém o mesmo ID do carro.
 * @apiName updFull
 * @apiGroup Carro
 *
 * @apiUse HeaderCType
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiUse CarroRequisicaoBody
 *
 * @apiSuccess {String} message Mensagem de sucesso.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroAlterado"
 *     }
 *
 * @apiUse CarroRetornoErroValidacao
 * @apiUse CarroRetornoErroNaoEncontrado
 * @apiUse IDInvalidoErro
 */
function updFull(req, res) { // put

	validate.runExpressValidator(req)

 	req.getValidationResult().then(function(result) {

 		if (!result.isEmpty()) {
 			
 			return res
 				.status(400)
 				.json(result.array())

 		} else {

 			const id = req.body.id || req.params.id
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
									.status(500)
									.json({message: m.c500upd})
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
 * @apiVersion 1.0.0
 * @apiDescription Este método altera somente as propriedades da entidade que foram passadas no body e mantém o mesmo ID do carro.
 * @apiName updParcial
 * @apiGroup Carro
 *
 * @apiUse HeaderCType
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiUse CarroRequisicaoBody
 *
 * @apiSuccess {String} message Mensagem de sucesso.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroAlterado"
 *     }
 *
 * @apiUse CarroRetornoErroValidacao
 * @apiUse CarroRetornoErroNaoEncontrado
 * @apiUse IDInvalidoErro
 */
function updParcial(req, res) { // patch

	validate.runExpressValidator(req)

 	req.getValidationResult().then(function(result) {

 		if (!result.isEmpty()) {
 			
 			return res
 				.status(400)
 				.json(result.array())

 		} else {

 			const id = req.body.id || req.params.id

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
									.status(500)
									.json({message: m.c500upd})
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
 * @apiVersion 1.0.0
 * @apiName del
 * @apiGroup Carro
 *
 * @apiParam {String} id ID do carro.
 *
 * @apiSuccess {String} message Mensagem de sucesso.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "CarroApagado"
 *     }
 *
 * @apiUse CarroRetornoErroNaoEncontrado
 * @apiUse IDInvalidoErro
 */
function del(req, res) {

	const id = req.body.id || req.params.id

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
				.status(500)
				.json({message: m.c500del})
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
 *
 * @apiUse CarroRetornoErroNaoEncontrado
 * @apiUse IDInvalidoErro
 */
function delAll(req, res) {

	Carros
		.remove({})
		.then(() => {
			console.log('\n===== TODOS OS CARROS FORAM APAGADOS!!!! =====\n')
			return res
				.status(200)
				.json({message: 'TodosCarrosApagados'})
		})
		.catch((err) => {
			console.log(err)
			return res
				.status(500)
				.json({message: 'ErroApagarTodosCarros'})
		})

}
