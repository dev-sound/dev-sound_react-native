const express = require('express')
const consign =  require('consign')
const propertiesReader = require('properties-reader')
const props = propertiesReader('./propertiesConfig.properties')

const app =  express();
app.use(express.json());
app.use(express.urlencoded( {extended:true } ));

consign().include('constantes').then('src/models').then('src/controllers').then('src/routes').into(app)


app.listen(props.get('server.porta') , ()=> console.log(`Rodando da porta ${props.get('server.porta')} - Dev.Sound - Server Init`))


