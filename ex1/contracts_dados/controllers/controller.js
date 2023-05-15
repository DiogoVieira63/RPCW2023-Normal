var Contracts = require('../models/contracts');



module.exports.list = () => {
    return Contracts.find().then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.getContract = id => {
    return Contracts.findOne({_id: id}).then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}


module.exports.listByYear = year => {
    return Contracts.find({DataInicioContrato: {$regex: year}}).then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}


module.exports.listByInst = inst => {
    return Contracts.find({NIPCInstituicao: inst}).then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.getCourses = () => {
    return Contracts.distinct("Curso")
    .sort()
    .then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.getInstitutions = () => {
    return Contracts.distinct("NomeInstituicao")
    .sort()
    .then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.insert = contract => {
    return Contracts.insertOne(contract).then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.delete = id => {
    return Contracts.deleteOne({_id: id}).then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}






module.exports.getCidade = id => {
    return Cidade.findOne({id: id}).then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.sortByName = () => {
    return Cidade.find({},{ nome: true, _id : false})
    .sort({nome: 1})
    .then(data => {
        // dict to array
        var array = [];
        for (elem in data) {
            array.push(data[elem].nome);
        }
        return array;
    }).catch(function(error) {
        return error;
    });
}

module.exports.listByDistrito = distrito => {
    return Cidade.find({distrito: distrito},{ nome: true, _id: false, id : true})
    .then(data => {
        return data;
    }).catch(function(error) {
        return error;
    });
}

module.exports.getDistritos = () => {
    return Cidade.find({},{ distrito: true, _id: false})
    .then(data => {
        // dict to array
        var set = new Set();
        for (elem in data) {
            set.add(data[elem].distrito);
        }

        return Array.from(set);
    }  ).catch(function(error) {
        return error;
    }
    );
}
