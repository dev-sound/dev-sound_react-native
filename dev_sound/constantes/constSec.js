const propertiesReader = require('properties-reader');
const properties = propertiesReader('./propertiesConfig.properties');

module.exports = (app) => {
    const constSec = {
        custoHash: properties.get('sec.hash'),
        chaveJWT: properties.get('sec.jwt'),
        tempoExpiracaoToken: '900m'
    }
    return constSec;
}