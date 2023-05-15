var express = require('express');
var router = express.Router();
var Contracts = require('../controllers/contracts');

/* GET home page. */
router.get('/', function(req, res, next) {
  var date = new Date().toISOString().slice(0, 16);
  Contracts.list().then(data => {
    // get first 10 contracts
    var contratos = data.data;//.slice(0, 100);
    Contracts.getCourses().then(data => {
      var cursos = data.data;
      Contracts.getInstitutions().then(data => {
        var instituicoes = data.data;
        res.render('index', { contratos: contratos, cursos: cursos.length, instituicoes: instituicoes.length, d: date });
      }).catch(function (error) {
        res.status(521).json(error)
      }
      );
    }).catch(function (error) {
      res.status(521).json(error)
    }
    );
  }).catch(function(error) {
  res.status(520).json(error)}
  );
});

router.get('/:id', function(req, res, next) {
  var date = new Date().toISOString().slice(0, 16);
  Contracts.getContract(req.params.id).then(data => {
    res.render('contract', { contrato: data.data, d :date});
  }).catch(function (error) {
    res.status(521).json(error)
  });
});

router.get('/inst/:nipc', function(req, res, next) {
  var date = new Date().toISOString().slice(0, 16);
  Contracts.listByInst(req.params.nipc).then(data => {
    var contratos = data.data;
    var nipc = contratos[0].NIPCInstituicao;
    var nomeInstituicao = contratos[0].NomeInstituicao;
    res.render('index', { contratos: contratos, voltar: true, d: date, nipc: nipc, nome: nomeInstituicao });
  }).catch(function (error) {
    res.status(521).json(error)
  });
});

module.exports = router;
