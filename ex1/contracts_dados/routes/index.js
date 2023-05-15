var express = require('express');
var router = express.Router();
var Contracts = require('../controllers/controller'); 

/*
GET /contracts: devolve uma lista com todos os contratos;
GET /contracts/:id: devolve o contrato com identificador id;
GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY;
GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;
GET /contracts/courses: devolve a lista dos cursos dos contratados (sem repetições);
GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);
POST /contracts: acrescenta um contrato novo à BD;
DELETE /contracts/:id: elimina da BD o contrato com o identificador id.
*/



router.get('/', function(req, res, next) {
  if (req.query.year) {
    Contracts.listByYear(req.query.year).then(data => {
      res.status(200).json(data);
    }).catch(function(error) {
    res.status(520).json(error)
    });
  }
  else if (req.query.inst) {
    console.log(req.query.inst)
    Contracts.listByInst(req.query.inst).then(data => {
      res.status(200).json(data);
    }).catch(function(error) {
    res.status(520).json(error)
    });

  }
  else {
    console.log("contracts");
    Contracts.list().then(data => {
      res.status(200).json(data);
    }
    ).catch(function(error) {
    res.status(520).json(error)
    });
  }
});

router.get('/courses', function(req, res, next) {
  Contracts.getCourses().then(data => {
    res.status(200).json(data);
  }).catch(function (error) {
    res.status(520).json(error)
  });
});

router.get('/institutions', function(req, res, next) {
  Contracts.getInstitutions().then(data => {
    res.status(200).json(data);
  }).catch(function (error) {
    res.status(520).json(error)
  });
});


router.get('/:id', function(req, res, next) {
  Contracts.getContract(req.params.id).then(data => {
    res.status(200).json(data);
  }).catch(function (error) {
    res.status(521).json(error)
  });
});

router.post('/', function(req, res, next) {
  Contracts.insert(req.body).then(data => {
    res.status(200).json(data);
  }).catch(function (error) {
    res.status(522).json(error)
  });
});


router.delete('/:id', function(req, res, next) {
  Contracts.delete(req.params.id).then(data => {
    res.status(200).json(data);
  }).catch(function (error) {
    res.status(523).json(error)
  });
});

module.exports = router;
