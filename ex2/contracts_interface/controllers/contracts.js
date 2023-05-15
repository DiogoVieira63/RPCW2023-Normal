
var axios = require('axios');


module.exports.list = () => {
    return axios.get('http://localhost:15015/contracts');
}

module.exports.getContract = id => {
    return axios.get('http://localhost:15015/contracts/' + id);
}

module.exports.listByInst = inst => {
    return axios.get('http://localhost:15015/contracts?inst=' + inst);
}

module.exports.getCourses = () => {
    return axios.get('http://localhost:15015/contracts/courses');
}

module.exports.getInstitutions = () => {
    return axios.get('http://localhost:15015/contracts/institutions');
}
