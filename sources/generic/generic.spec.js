
// Create

var carroOk = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto",
	"ano_fabricacao": "2015",
	"ano_modelo": "2016",
	"combustivel": "Flex",
	"potencia": "130",
	"qtde_portas": "5"
}

var carroOkMini = {
	"marca": "Marca Mocha Teste 2",
	"modelo": "Modelo Mocha Teste 2"
}

var carroNok = {
	// "marca": "Marca Mocha Teste",
	// "modelo": "Modelo Mocha Teste",
	"cor": "Preto2",
	"ano_fabricacao": "2010a",
	"ano_modelo": "2016a",
	"combustivel": "Flex4",
	"potencia": "130f",
	"qtde_portas": "5t"
}

var carroMarcaAusente = {
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto",
	"ano_fabricacao": "2015",
	"ano_modelo": "2016",
	"combustivel": "Flex",
	"potencia": "130",
	"qtde_portas": "5"
}

var carroModeloAusente = {
	"marca": "Marca Mocha Teste"
}

var carroCorInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto2"
}

var carroAnoFabricacaoInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"ano_fabricacao": "2017a"
}

var carroAnoModeloInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"ano_modelo": "2018a"
}

var carroCombustivelInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"combustivel": "Diesel0"
}

var carroPotenciaInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"potencia": "270a"
}

var carroQtdePortasInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"qtde_portas": "2p"
}

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

// Atualizar Full

var updFullCarroOk = {
	"marca": "Marca Mocha Teste Upd",
	"modelo": "Modelo Mocha Teste Upd",
	"cor": "Branco",
	"ano_fabricacao": "3015",
	"ano_modelo": "3016",
	"combustivel": "Hidrogenio",
	"potencia": "470",
	"qtde_portas": "0"
}

var updFullCarroNok = {
	// "marca": "Marca Mocha Teste",
	// "modelo": "Modelo Mocha Teste",
	"cor": "Preto2",
	"ano_fabricacao": "2010a",
	"ano_modelo": "2016a",
	"combustivel": "Flex4",
	"potencia": "130f",
	"qtde_portas": "5t"
}

var updFullCarroMarcaAusente = {
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto",
	"ano_fabricacao": "2015",
	"ano_modelo": "2016",
	"combustivel": "Flex",
	"potencia": "130",
	"qtde_portas": "5"
}

var updFullCarroModeloAusente = {
	"marca": "Marca Mocha Teste"
}

var updFullCarroCorInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto2"
}

var updFullCarroAnoFabricacaoInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"ano_fabricacao": "2017a"
}

var updFullCarroAnoModeloInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"ano_modelo": "2018a"
}

var updFullCarroCombustivelInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"combustivel": "Diesel0"
}

var updFullCarroPotenciaInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"potencia": "270a"
}

var updFullCarroQtdePortasInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"qtde_portas": "2p"
}

// Atualizar Parcial

var updParcialCarroOk = {
	"marca": "Marca Mocha Teste Upd Parcial",
	"modelo": "Modelo Mocha Teste Upd Parcial",
	"cor": "Branco",
	"ano_fabricacao": "4015",
	"ano_modelo": "4016",
	"combustivel": "Alcool",
	"potencia": "470",
	"qtde_portas": "0"
}

var updParcialCarroNok = {
	// "marca": "Marca Mocha Teste",
	// "modelo": "Modelo Mocha Teste",
	"cor": "Preto2",
	"ano_fabricacao": "2010a",
	"ano_modelo": "2016a",
	"combustivel": "Flex4",
	"potencia": "130f",
	"qtde_portas": "5t"
}

var updParcialCarroMarcaAusente = {
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto",
	"ano_fabricacao": "2015",
	"ano_modelo": "2016",
	"combustivel": "Flex",
	"potencia": "130",
	"qtde_portas": "5"
}

var updParcialCarroModeloAusente = {
	"marca": "Marca Mocha Teste"
}

var updParcialCarroCorInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"cor": "Preto2"
}

var updParcialCarroAnoFabricacaoInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"ano_fabricacao": "2017a"
}

var updParcialCarroAnoModeloInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"ano_modelo": "2018a"
}

var updParcialCarroCombustivelInvalido = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"combustivel": "Diesel0"
}

var updParcialCarroPotenciaInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"potencia": "270a"
}

var updParcialCarroQtdePortasInvalida = {
	"marca": "Marca Mocha Teste",
	"modelo": "Modelo Mocha Teste",
	"qtde_portas": "2p"
}

module.exports = {
	carroOk,
	carroOkMini,
	carroNok,
	carroMarcaAusente,
	carroModeloAusente,
	carroCorInvalida,
	carroAnoFabricacaoInvalido,
	carroAnoModeloInvalido,
	carroCombustivelInvalido,
	carroPotenciaInvalida,
	carroQtdePortasInvalida,
	carroKeys,
	updFullCarroOk,
	updFullCarroNok,
	updFullCarroMarcaAusente,
	updFullCarroModeloAusente,
	updFullCarroCorInvalida,
	updFullCarroAnoFabricacaoInvalido,
	updFullCarroAnoModeloInvalido,
	updFullCarroCombustivelInvalido,
	updFullCarroPotenciaInvalida,
	updFullCarroQtdePortasInvalida,
	updParcialCarroOk,
	updParcialCarroNok,
	updParcialCarroMarcaAusente,
	updParcialCarroModeloAusente,
	updParcialCarroCorInvalida,
	updParcialCarroAnoFabricacaoInvalido,
	updParcialCarroAnoModeloInvalido,
	updParcialCarroCombustivelInvalido,
	updParcialCarroPotenciaInvalida,
	updParcialCarroQtdePortasInvalida
}

