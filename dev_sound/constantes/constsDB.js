const propertiesReader = require('properties-reader');
const props = propertiesReader('./propertiesConfig.properties')


module.exports = app => {
 
    const dataBase = {

        connectDB:`mongodb://localhost:${props.get('db.server')}/${props.get('db.name')}`,
        connectParams:{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        }
    }

    return dataBase
}