
// ================================================================================================
// Requisicao - Body
// ================================================================================================

/**
 * @apiDefine CarroRequisicaoBody
 *
 * @apiParam (Body) {String} marca Obrigatório. Nome da marca.
 * @apiParam (Body) {String} modelo Obrigatório. Nome do modelo.
 * @apiParam (Body) {String} [cor] Nome da cor. Aceito somente letras.
 * @apiParam (Body) {Number} [ano_fabricacao] Ano da fabricação. Aceito somente números.
 * @apiParam (Body) {Number} [ano_modelo] Ano do modelo. Aceito somente números
 * @apiParam (Body) {String} [combustivel] Nome do combustível. Aceito somente letras.
 * @apiParam (Body) {Number} [potencia] Valor da potência. Aceito somente números.
 * @apiParam (Body) {Number} [qtde_portas] Quantidade de portas. Aceito somente números.
*/


// ================================================================================================
// Retorno - Sucesso
// ================================================================================================

/**
 * @apiDefine CarroRetornoSucesso
 *
 * @apiSuccess {String} _id ID do carro.
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
*/

/**
 * @apiDefine CarroExemploSucessoSimples
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "XXXX",
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
*/

/**
 * @apiDefine CarroExemploSucessoArray
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "_id": "XXXX",
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


// ================================================================================================
// Retorno - Erro
// ================================================================================================

/**
 * @apiDefine CarroRetornoErroValidacao
 *
 * @apiError (Error 400 - Validação)  param Nome do parâmetro com erro.
 * @apiError (Error 400 - Validação)  msg Descrição do erro.
 * @apiError (Error 400 - Validação)  [value] Valor do parâmetro com erro.
 *
 * @apiErrorExample {json} ErroValidação:
 *     HTTP/1.1 400 Bad Request
 *     [{
 *       "param": "cor",
 *       "msg": "A cor precisa ser uma string sem números",
 *       "value": "Vermelho2"
 *     }]
 *
 *     HTTP/1.1 400 Bad Request
 *     [{
 *       "param": "nome",
 *       "msg": "O nome é obrigatório"
 *     }]
*/

/**
 * @apiDefine CarroRetornoErroNaoEncontrado
 *
 * @apiError  (Error 404) CarroNaoEncontrado O ID do carro não foi encontrado.
 *
 * @apiErrorExample {json} CarroNaoEncontrado:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "CarroNaoEncontrado"
 *     }
*/
