
var carroKeys = [
	'_id',
	'marca',
	'modelo',
	'cor',
	'ano_fabricacao',
	'ano_modelo',
	'combustivel',
	'potencia',
	'qtde_portas',
	'dt_criacao',
	'dt_ult_at'
]

// Create

var objCreate = {
	carroOk: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto",
		"ano_fabricacao": "2015",
		"ano_modelo": "2016",
		"combustivel": "Flex",
		"potencia": "130",
		"qtde_portas": "5"
	},
	carroOkMini: {
		"marca": "Marca Mocha Teste 2",
		"modelo": "Modelo Mocha Teste 2"
	},
	carroNok: {
		// "marca": "Marca Mocha Teste",
		// "modelo": "Modelo Mocha Teste",
		"cor": "Preto2",
		"ano_fabricacao": "2010a",
		"ano_modelo": "2016a",
		"combustivel": "Flex4",
		"potencia": "130f",
		"qtde_portas": "5t"
	},
	carroNok: {
		// "marca": "Marca Mocha Teste",
		// "modelo": "Modelo Mocha Teste",
		"cor": "Preto2",
		"ano_fabricacao": "2010a",
		"ano_modelo": "2016a",
		"combustivel": "Flex4",
		"potencia": "130f",
		"qtde_portas": "5t"
	},
	carroMarcaAusente: {
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto",
		"ano_fabricacao": "2015",
		"ano_modelo": "2016",
		"combustivel": "Flex",
		"potencia": "130",
		"qtde_portas": "5"
	},
	carroModeloAusente: {
		"marca": "Marca Mocha Teste"	
	},
	carroCorInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto2"
	},
	carroAnoFabricacaoInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"ano_fabricacao": "2017a"
	},
	carroAnoModeloInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"ano_modelo": "2018a"
	},
	carroCombustivelInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"combustivel": "Diesel0"
	},
	carroPotenciaInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"potencia": "270a"
	},
	carroQtdePortasInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"qtde_portas": "2p"
	}
}

// Atualizar Full

var objUpdFull = {
	updFullCarroOk: {
		"marca": "Marca Mocha Teste Upd",
		"modelo": "Modelo Mocha Teste Upd",
		"cor": "Branco",
		"ano_fabricacao": "3015",
		"ano_modelo": "3016",
		"combustivel": "Hidrogenio",
		"potencia": "470",
		"qtde_portas": "0"
	},
	updFullCarroNok: {
		// "marca": "Marca Mocha Teste",
		// "modelo": "Modelo Mocha Teste",
		"cor": "Preto2",
		"ano_fabricacao": "2010a",
		"ano_modelo": "2016a",
		"combustivel": "Flex4",
		"potencia": "130f",
		"qtde_portas": "5t"
	},
	updFullCarroMarcaAusente: {
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto",
		"ano_fabricacao": "2015",
		"ano_modelo": "2016",
		"combustivel": "Flex",
		"potencia": "130",
		"qtde_portas": "5"
	},
	updFullCarroModeloAusente: {
		"marca": "Marca Mocha Teste"
	},
	updFullCarroCorInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto2"
	},
	updFullCarroAnoFabricacaoInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"ano_fabricacao": "2017a"
	},
	updFullCarroAnoModeloInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"ano_modelo": "2018a"
	},
	updFullCarroCombustivelInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"combustivel": "Diesel0"
	},
	updFullCarroPotenciaInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"potencia": "270a"
	},
	updFullCarroQtdePortasInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"qtde_portas": "2p"
	}
}

// Atualizar Parcial

var objUpdParcial = {
	updParcialCarroOk: {
		"marca": "Marca Mocha Teste Upd Parcial",
		"modelo": "Modelo Mocha Teste Upd Parcial",
		"cor": "Branco",
		"ano_fabricacao": "4015",
		"ano_modelo": "4016",
		"combustivel": "Alcool",
		"potencia": "470",
		"qtde_portas": "0"
	},
	updParcialCarroMarcaAusente: {
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto",
		"ano_fabricacao": "2015",
		"ano_modelo": "2016",
		"combustivel": "Flex",
		"potencia": "130",
		"qtde_portas": "5"
	},
	updParcialCarroModeloAusente: {
		"marca": "Marca Mocha Teste"
	},
	updParcialCarroCorInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"cor": "Preto2"
	},
	updParcialCarroAnoFabricacaoInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"ano_fabricacao": "2017a"
	},
	updParcialCarroAnoModeloInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"ano_modelo": "2018a"
	},
	updParcialCarroCombustivelInvalido: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"combustivel": "Diesel0"
	},
	updParcialCarroPotenciaInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"potencia": "270a"
	},
	updParcialCarroQtdePortasInvalida: {
		"marca": "Marca Mocha Teste",
		"modelo": "Modelo Mocha Teste",
		"qtde_portas": "2p"
	},
	updParcialCarroNok: {
		// "marca": "Marca Mocha Teste",
		// "modelo": "Modelo Mocha Teste",
		"cor": "Preto2",
		"ano_fabricacao": "2010a",
		"ano_modelo": "2016a",
		"combustivel": "Flex4",
		"potencia": "130f",
		"qtde_portas": "5t"
	}
}

module.exports = {
	carroKeys,
	objCreate,
	objUpdFull,
	objUpdParcial
}

