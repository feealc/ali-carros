var errorMessagesValidator = {
	'marca': 'A marca é obrigatória',
	'modelo': 'O modelo é obrigatório',
	'cor': 'A cor precisa ser uma string sem numeros',
	'ano_fabricacao': 'O ano de fabricacao precisa ser somente numeros',
	'ano_modelo': 'O ano do modelo precisa ser somente numeros',
	'combustivel': 'O combustivel precisa ser uma string sem numeros',
	'potencia': 'A potencia precisa ser somente numeros',
	'qtde_portas': 'A quantidade de portas precisa ser somente numeros'
}

var carrosParamModel = {
	'id': '_id',
	'marca': 'marca',
	'modelo': 'modelo',
	'cor': 'cor',
	'ano_fab': 'ano_fabricacao',
	'ano_mod': 'ano_modelo',
	'comb': 'combustivel',
	'pot': 'potencia',
	'qt_pt': 'qtde_portas',
	'v': '__v'
}

// criar objeto para as mensagens que as funcoes retornar. Ex.: CarroAlterado, CarroCriado
var msgResponse = {
	'msg': 'message',
	//
	'c500all': 'ErroRecuperarCarros',
	'c500one': 'ErroRecuperarCarro',
	'c500create': 'ErroCriarCarro',
	'c500': 'ErroRecuperarCarro',
	//
	'c400upd': 'ErroAlterarCarro',
	'c400del': 'ErroApagarCarro',
	'c400id': 'InvalidID',
	'c404': 'CarroNaoEncontrado',
	//
	'c200upd': 'CarroAlterado',
	'c200del': 'CarroApagado',
	//
	'c201': 'CarroCriado'
}

// criar objeto para os parametros que o expressValidator retorna - param, msg, value
var expressValidatorParam = {
	'param': 'param',
	'msg': 'msg',
	'value': 'value',
	'array2': ['param', 'msg'],
	'array3': ['param','msg','value']
}

module.exports = {
	errorMessagesValidator,
	carrosParamModel,
	msgResponse,
	expressValidatorParam
}