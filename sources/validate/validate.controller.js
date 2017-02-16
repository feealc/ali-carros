var validId = require('valid-objectid')
var msg = require('../generic/generic.default.js').errorMessagesValidator

//

module.exports = {
	id,
	runExpressValidator
}

function id(req, res, next, value) {
  
  if (!validId.isValid(value)) {
    
    console.log(`invalid id ${value}`)
    return res
      .status(400)
      .json({message: 'invalid id'})
  }

  next()

}

function runExpressValidator(req) {

	const locale = 'pt-BR'

	req.checkBody('marca', msg.marca).notEmpty()
	req.checkBody('modelo', msg.modelo).notEmpty()
	req.checkBody('cor', msg.cor).optional().isAlpha(locale)
	req.checkBody('ano_fabricacao', msg.ano_fabricacao).optional().isInt()
	req.checkBody('ano_modelo', msg.ano_modelo).optional().isInt()
	req.checkBody('combustivel', msg.combustivel).optional().isAlpha(locale)
	req.checkBody('potencia', msg.potencia).optional().isInt()
	req.checkBody('qtde_portas', msg.qtde_portas).optional().isInt()

}
