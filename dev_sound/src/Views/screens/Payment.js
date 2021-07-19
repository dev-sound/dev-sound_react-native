import React, { Component } from 'react'
import {View,Text,ScrollView,StyleSheet,FlatList, TouchableOpacity, Alert, SafeAreaView} from 'react-native'
import Input from '../components/Input'
import Logo from '../components/Header/logo'
import PickerSelect from 'react-native-picker-select'
import ProductPayment from '../components/ProductPayment'
import Button from '../components/Button'
import ProductPaymentDATA from '../components/Common/ProductPaymentDATA'
import { RadioButton,Checkbox } from 'react-native-paper';
import paymentsSaves from '../components/Common/paymentsSaves'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Title from '../components/Title'
import Header from '../components/Header'



const disabledInputs = [
    {disabledName:false},
    {disabledMonth:false},
    {disabledYear:false},
    {diabledCvv : false},
    {disabledCep:false},
    {disabledStreet:false},
    {disabledNumber:false},
    {disabledDistrict:false},
    {disabledCity:false},
    {disabledBtn:false}
]

const stylesInput = {
    validStyleCard:'',
    validStyleName:'',
    validStyleMouth:'',
    validStyleYear:'',
    validStyleCvv:'',
    validStyleCep:'',
    validStyleStreet:'',
    validStyleNumber:'',
    validStyleDistrict:'',
    validStyleCity:''

}

const form = {
    numberCard:'',
    nameClient:'',
    monthCard:'',
    yearCard:'',
    cvv:'',
    cep:'',
    street:'',
    numberHome:'',
    district:'',
    city:'',  
    
   
}

const initialState ={
    form:{...form},
    UF:'SP',
    disabled:{...disabledInputs},
    stylesInput:{...stylesInput},
    ehBoleto:false,
    items: [],
    userInfos:{},
    itemsFromBD:{},
    buttonPayment:false
}


export default class Payment extends Component {



    state = {...initialState}

    async componentDidMount() {
        await this.captureAsync()
        await this.captureUserInfos()
        
    }

    //Inicio da captura de valores do Async Storage

     captureAsync = async () => {

        const productImport = await AsyncStorage.getItem('product')
        const productParse = JSON.parse(productImport)
        this.setState({items:productParse})

     }


     captureUserInfos = async () => {
        const userAuth = await AsyncStorage.getItem('userData')
        const users =  JSON.parse(userAuth)
        this.setState({userInfos:users}) 
      }
    



     willFocus = this.props.navigation.addListener('willFocus', () => {this.captureAsync()})


    // Fim  Async Storage --------------------------------

    

    //  Inicio Axios , Post 

        savePayment = async () => {

            if(this.state.ehBoleto){
                this.setState({numberCard:''})
            }

                try {   
               
                    await axios.post("http://10.0.3.2:3000/Pagamento",{
                        cartaoCredito:this.state.numberCard,
                        cep:this.state.cep,
                        rua:this.state.street,
                        numero:this.state.numberHome,
                        bairro:this.state.district,
                        cidade:this.state.city,
                        UF:this.state.UF,
                        Produtos:this.state.items,
                        Forma_pagamento:{
                            ehBoleto:this.state.ehBoleto
                        }
                    },
                    {
                      headers:{
                        'Authorization':this.state.userInfos.token
                      }
                    })         
                    
                    this.setState({
                        numberCard:'',
                        nameClient:'',
                        monthCard:'',
                        yearCard:'',
                        cvv:'',
                        cep:'',
                        street:'',
                        numberHome:'',
                        district:'',
                        city:'',  
                        validStyleCard:'',
                        validStyleName:'',
                        validStyleMouth:'',
                        validStyleYear:'',
                        validStyleCvv:'',
                        validStyleCep:'',
                        validStyleStreet:'',
                        validStyleNumber:'',
                        validStyleDistrict:'',
                        validStyleCity:''
                    })
                    
                
                    disabledInputs[0].disabledName = false
                    disabledInputs[1].disabledMonth = false
                    disabledInputs[2].disabledYear = false
                    disabledInputs[3].diabledCvv = false
                    disabledInputs[4].disabledCep = false
                    disabledInputs[5].disabledStreet = false
                    disabledInputs[6].disabledNumber = false
                    disabledInputs[7].disabledDistrict = false
                    disabledInputs[8].disabledCity = false
                    disabledInputs[9].disabledBtn = false
                   
                    this.props.navigation.navigate('OrderDone') 

                }catch (err){
                    Alert.alert('Compra não concluida :(  ',' houve um erro na sua compra :/ ')
                }
            
            
        }   


    // Fim Axios Post --------------------------------------

    // Inicio navegacao OrderDone

    toOrderDone = () => {
        this.props.navigation.navigate('OrderDone')
    }


    // Fim navegacao OrderDone
    cabo = async () => {
        await this.savePayment()
       await AsyncStorage.removeItem('product')
        this.setState(...initialState)
        this.toHome()
    }


    // Inicio das Validações de Inputs
    renderProduct = ({item}) => {
        return (
            <ProductPayment
                    paymentArea
                    imgProduct={item.img}
                    nameProduct={item.nome}
                    modelProduct = {item.modelo}
                    priceUnit= {item.valor_unitario}
                />
        )
    }
    

    //  c
    // Teste Teste
    // 07261-983
    // Teste teste 
    validInputCard = value => {
        const mastercardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
        
        if(mastercardRegex.test(value)){
            
            disabledInputs[0].disabledName = true
            this.setState({validStyleCard:'valid'})
            
        }else{
            paymentsSaves.creditCard = ""
            disabledInputs[0].disabledName = false
            this.setState({validStyleCard:'noValid'})
        }
     } 

        
     validInputName = value => {
            // /[A-Z][a-z].* [A-Z][a-z].*/ 
            const nameRegex =/[A-Z, À-Ú][a-z, à-ú]* [A-Z, À-Ú][a-z, à-ú]*/
            if(nameRegex.test(value)){
            disabledInputs[1].disabledMonth = true
            this.setState({validStyleName:'valid'})
            }else{
            disabledInputs[1].disabledMonth = false
            this.setState({validStyleName:'noValid'})
            
            }
            
        } 


    validMouthCard = value => {

        const regexCardName = /[1-9]/;
        if(regexCardName.test(value) && value <= 12 && value >= 1){
          
            disabledInputs[2].disabledYear = true
            this.setState({validStyleMouth:'valid'})

        }else{
          
            disabledInputs[2].disabledYear = false
            this.setState({validStyleMouth:'noValid'})
        }
    }

    validYearCard = value => {
        const regexNumber = /[1-9]/;
    
        const year = new Date().getFullYear()
    
        if(regexNumber.test(value) && value >= year){
            
            disabledInputs[3].diabledCvv = true
            this.setState({validStyleYear:'valid'})
        }else{
            disabledInputs[3].diabledCvv = false
            this.setState({validStyleYear:'noValid'})

        }
    }

    validCvvCard = value => {
        const regexNumber = /[1-9]/;
    
        if(regexNumber.test(value)){

            disabledInputs[4].disabledCep = true
            this.setState({validStyleCvv:'valid'})

        }else{

            disabledInputs[4].disabledCep = false
            this.setState({validStyleCvv:'noValid'})
        }
    }

    validAdressCep = value => {
        const regexCep = /[0-9]{5}-[0-9]{3}/

        if(regexCep.test(value)){
            this.captureCepUser(value)
            this.setState({validStyleCep:'valid'})    

        }else{
            paymentsSaves.Adress.cep = ""
            disabledInputs[5].disabledStreet = false
            this.setState({validStyleCep:'noValid'})

        }
}


    validAdressStreet = value => {
        // /[A-Z][a-z]/
        const nameRegex = /[A-Z, À-Ú][a-z, à-ú]/
    
        if(nameRegex.test(value)){
            disabledInputs[6].disabledNumber = true
            this.setState({validStyleStreet:'valid'})    
        }else{
            disabledInputs[6].disabledNumber = false
            this.setState({validStyleStreet:'noValid'})
        }
    }

    validAdressNumber = value => {
        const regexNumber = /[1-9]/;
       
        if(regexNumber.test(value)){
            this.setState({validStyleNumber:'valid' ,buttonPayment:true})    

        }else{
            disabledInputs[7].disabledDistrict = false
            this.setState({validStyleNumber:'noValid' , buttonPayment:false})
        }
    }


    validAdressDistrict = value => {
        const nameRegex = /[A-Z, À-Ú][a-z, à-ú]/
    

        if(nameRegex.test(value)){
          
            disabledInputs[8].disabledCity = true
            this.setState({validStyleDistrict:'valid'})    
        }else{
            disabledInputs[8].disabledCity = false
            this.setState({validStyleDistrict:'noValid'})
        }
    }

    validAdressCity = value => {
        const nameRegex = /[A-Z, À-Ú][a-z, à-ú]/
    
        if(nameRegex.test(value) ){
            disabledInputs[9].disabledBtn = true
            this.setState({validStyleCity:'valid'})    

        }else{
            disabledInputs[9].disabledBtn = true
            this.setState({validStyleCity:'noValid'})
        }
    }


    

    // Fim das Validações de inputs



    // Funções que afetam o layout

    setDataPayment = ( ) => {   

        paymentsSaves.Products.push(...this.state.items)


        if(this.state.saveCard){
            paymentsSaves.creditCard = this.state.numberCard
        }else{
            paymentsSaves.creditCard = ""
        }
        

        if(this.state.saveAdress){
            paymentsSaves.Adress.cep = this.state.cep
            paymentsSaves.Adress.street =  this.state.street
            paymentsSaves.Adress.number = this.state.numberHome
            paymentsSaves.Adress.district = this.state.district
            paymentsSaves.Adress.city = this.state.city
            paymentsSaves.Adress.uf = this.state.UF
        }else{
            paymentsSaves.Adress.cep = ""
            paymentsSaves.Adress.street = ""
            paymentsSaves.Adress.number = ""
            paymentsSaves.Adress.district =""
            paymentsSaves.Adress.city = ""
            paymentsSaves.Adress.uf =""
        }       
    }



    setBoletoForm = () => {
        if(this.state.ehBoleto){
            disabledInputs[4].disabledCep = true
    
            return 'none'
        }
        
        
    }
    

    setSumItems = () => {
        
        const items = this.state.items
        let arr = []
        let subtotal = parseFloat(0)
        let shipping = parseFloat(100)

        
        if(items){
            items.forEach((element => {
                arr.push(element.valor_unitario)
            })) 
        }

        for(let i = 0; i < arr.length; i++){
            subtotal += arr[i]
        }

        return(
           <>

            <View style={styles.areaPrice}>
            <Text style={styles.resumeText}>Subtotal:</Text>
            
                <Text>R$ {parseFloat(subtotal).toFixed(2)}</Text>
            
            </View>

            <View style={styles.areaPrice}>
                <Text style={styles.resumeText}>Frete fixo:</Text>
                <Text style={styles.resumeText}>R$100</Text>  
            </View>

            <View style={styles.areaPrice}>
                <Text style={styles.priceTotal}>Total: </Text>
                <Text style={styles.priceTotal}>R${(parseFloat(subtotal + shipping).toFixed(2))}</Text>
            </View>
        </>
        )
    }

    
    buttonPayment = () => {
   

        if(this.state.buttonPayment){

            return (

                <>

                <Button 
                finishButton
               label='FINALIZAR COMPRA'
                onPress={() => this.savePayment()}
                />
                </>
            )
        }
        
    
            return (
                <Button 
                finishButtonDisabled
                label='FINALIZAR COMPRA' 
                disabled={true}
                />
            )
        

    }

    // Fim funções de afetam o layout

    // Consumo de API externas 


    captureCepUser = async (cepUser) => {

        let cep = cepUser

        try { 
           const adress = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            
           disabledInputs[6].disabledNumber = true
       
           this.setState({

            street:adress.data.logradouro,
            district:adress.data.bairro,
            city:adress.data.localidade,  
            UF:adress.data.uf
           })
           
           console.warn(adress.data)
        }
        catch(err) {
            this.setState({
                validStyleCep:'noValid',
                street:'',
                district:'',
                city:'',
                numberHome:'',
                cep:'',
                buttonPayment:false
            })
            disabledInputs[6].disabledNumber = false
            
           Alert.alert('Ops! Probleminha no cep ', 'Cep inserido inexistente, por favor confira se foi digitado de forma correta :) ')
        }
      }

    // Fim consumo de api externas




    render(){   
        
        return (
            <SafeAreaView style={styles.container}>
            <ScrollView> 
               
                <View style={styles.logoArea}>
                    <Logo comeBackHome={() => this.props.navigation.navigate('Home')}/>
                </View>

                <View style={styles.pageTitle}>
                <Title title='Finalização de Pedido'/>
                </View>
                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Forma de Pagamento</Text>
                </View>

                <View style={styles.areaForms}>

                   
        
                        <View style={styles.radio}>
                            <View style={styles.radioArea}>
                            
                                <RadioButton
                                    value={false}
                                    color={'#FACC22'}
                                    status={ !this.state.ehBoleto ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ehBoleto:false})}
                                /> 
                            </View>
                            <View style={styles.labelRadio}>
                            <Text style={styles.choiceTitle}>Cartão de Credito</Text>
                            </View>
                        </View>

                        {/* Start inputs about informations credid card user */}
                        <View style={{display:this.setBoletoForm()}}>        
                        <Input 
                        
                            validInput={this.state.validStyleCard}
                            style={styles.inputLabel}
                            fieldLabel = 'Numero do cartão'
                            placeholder='Insira o número do cartão'
                            keyboardType={'numeric'}
                            value={this.state.numberCard}
                            onBlur={() => this.validInputCard(this.state.numberCard)}
                            onChangeText={(numberCard) => { this.setState({numberCard:numberCard}) }}

                        />

                        <Input  
                            validInput={this.state.validStyleName}
                            style={styles.inputLabel}        
                            fieldLabel = 'Nome no cartão'
                            placeholder='Insira seu nome'
                            value={this.state.nameClient}
                            onChangeText={(nameClient) => this.setState({nameClient})}
                            onBlur = {() => this.validInputName(this.state.nameClient)}
                            editable={disabledInputs[0].disabledName}         
                        />

        

                        <View style={styles.areaInputsMins}>

                            <Input 
                                
                                validInput={this.state.validStyleMouth}
                                style={styles.inputLabel}  
                                fieldLabel = 'Mês de expiração'
                              
                                placeholder='Ex: 05'
                                keyboardType={'numeric'}
                                value={this.state.monthCard}
                                onChangeText={(monthCard) => this.setState({monthCard})}
                                onBlur = {()=> this.validMouthCard(this.state.monthCard)}
                                editable={disabledInputs[1].disabledMonth}      
                            />

                            <Input 
                                validInput={this.state.validStyleYear}
                                style={styles.inputLabel}                         
                                fieldLabel = 'Ano de expiração'
                                
                                placeholder='Ex: 2022'
                                keyboardType={'numeric'}
                                value={this.state.yearCard}
                                onBlur = {()=> this.validYearCard(this.state.yearCard)}
                                onChangeText={(yearCard) => this.setState({yearCard})}
                                editable={disabledInputs[2].disabledYear}   
                            />

                            <Input 
                                validInput={this.state.validStyleCvv}
                                style={styles.inputLabel}    
                                fieldLabel = 'CVV'
                                
                                placeholder='Ex: 100'
                                keyboardType={'numeric'}
                                value={this.state.cvv}
                                onBlur = {()=> this.validCvvCard(this.state.cvv)}
                                onChangeText={(cvv) => this.setState({cvv})}
                                editable={disabledInputs[3].diabledCvv}   
                            />
                                



                        </View>

                
                                
                        {/* <View style={styles.checkboxArea}>
                            <View style={styles.checkbox}>
                                <Checkbox 
                                    color={'#FACC22'}
                                    status={this.state.saveCard ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({saveCard:!this.state.saveCard})}
                                />
                            </View>
                            <Text>Salvar Cartão </Text>
                        </View> */}

                        {/* End inputs about informations credid card user */}

                    </View>           
                        <View style={styles.radio}>         
                            <View style={styles.radioArea}>
                                <RadioButton
                                value={true}
                                color={'#FACC22'}
                                status={ this.state.ehBoleto ? 'checked' : 'unchecked' }
                                onPress={() => this.setState({ehBoleto:true})}
                                />   
                            </View>
                            <View style={styles.labelRadio}>
                            <Text style={styles.choiceTitle}>Boleto</Text>
                            </View>
                    </View>



               
                </View>

                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Endereço de Entrega</Text>
                </View>

                <View style={styles.areaForms}>
                {/* Start informations address user */}
                    <Input 
                        validInput={this.state.validStyleCep}    
                        fieldLabel = 'CEP'
                        style={styles.inputLabel}
                        keyboardType={'numeric'}
                        placeholder='Insira o CEP'
                        value={this.state.cep}
                        onBlur = {()=> this.validAdressCep(this.state.cep)}
                        onChangeText={(cep) => this.setState({cep})}
                        editable={disabledInputs[4].disabledCep}
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                            validInput={this.state.validStyleStreet}
                           
                            style={styles.inputLabel}
                            fieldLabel = 'Rua / Avenida'
                            placeholder='Insira o nome da Rua/Avenida'
                            value={this.state.street}
                            onChangeText={(street) => this.setState({street})}   
                            onBlur={()=> this.validAdressStreet(this.state.street)}
                            editable={disabledInputs[5].disabledStreet}
                        />

                        <Input 
                            validInput={this.state.validStyleNumber}
                            style={styles.inputLabel}
                            
                            fieldLabel = 'Número'
                            placeholder='Ex: 20'
                            keyboardType={'numeric'}
                            value={this.state.numberHome}
                            onBlur={()=> this.validAdressNumber(this.state.numberHome)}
                            onChangeText={(numberHome) => this.setState({numberHome})}
                            editable={disabledInputs[6].disabledNumber}  
                        />
                            
                    </View>
                    
                    <Input 
                        validInput={this.state.validStyleDistrict}
                        style={styles.inputLabel}
                        fieldLabel = 'Bairro'
                        placeholder='Insira o bairro'
                        value={this.state.district}
                        onBlur={()=> this.validAdressDistrict(this.state.district)}
                        onChangeText={(district) => this.setState({district})}   
                        editable={disabledInputs[7].disabledDistrict}
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                            validInput={this.state.validStyleCity}
                            style={styles.inputLabel}
                            
                            fieldLabel = 'Cidade'
                            placeholder='Insira a cidade / município'
                            value={this.state.city}
                            onBlur={()=> this.validAdressCity(this.state.city)}
                            onChangeText={(city) => this.setState({city})}   
                            editable={disabledInputs[8].disabledCity}
                        />

                        <View style={styles.uf}>
                            <PickerSelect  
                                onValueChange ={(value) => this.setState({UF:value})}
                                items ={[
                                    {label:'RJ' , value:'RJ'},
                                    {label:'MG' , value:'MG'},
                                    {label:'GO' , value:'GO'},
                                    {label:'SC' , value:'SC'},
                                ]}         
                                placeholder={{ label:"SP", value: 'SP' }}
                                >   
                                <Text styles={styles.ufText}>{this.state.UF}</Text>
                            </PickerSelect>
                        </View>
                    </View>

                    <View> 
                      <Text style={styles.infoFrete}>* Caros clientes, informamos que usamos um frete fixo de R$ 100,00 </Text>
                    </View>
                    {/* End informations address user */}
                    {/* <View style={styles.checkboxArea}>
                        <View style={styles.checkbox}>
                            <Checkbox 
                                 color={'#FACC22'}
                                status={this.state.saveAdress ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({saveAdress:!this.state.saveAdress})}
                            />
                        </View>
                        <Text>Salvar Endereço para proximas compras ? </Text>
                    </View> */}
                
                </View>

                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Revisão de Produtos</Text>
                </View>


                <View style={styles.areaProductReview}>
                
                    <FlatList
                        data={this.state.items}
                        keyExtractor={item => item.id}
                        renderItem={this.renderProduct}
                    />

                </View>

       


                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Resumo</Text>
                </View>
                
                    <View style={styles.abstract}>
                            {this.setSumItems()}
                    </View>
            

            </ScrollView>

            {this.buttonPayment()}

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create(
    {
  
        areaForms:{
            padding:13,
        },

        infoFrete:{
            color:"#FE3535",
            fontSize:12,
            fontWeight: 'bold'
        },  

        logoArea:{
            justifyContent:'center',
            alignItems:'center',
            padding:35,
        },

        choiceTitle:{
            fontSize: 17
        },

        textTitles:{
            backgroundColor:'#E2DDDD',
            justifyContent:'center',
            padding:10,
        },

        inputLabel: {
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 7,
            marginBottom: 7
        },

        titleForm:{
            fontSize:20,
            fontWeight:'bold',
        },

        areaInputsMins:{
            flexDirection:'row',
            justifyContent:'space-between',
            marginBottom: 12,
        },

        select:{
            height:45,
            borderWidth:1,
            padding:7,
            borderRadius:5,
            borderWidth:1,
        },

        uf:{
            width: '20%',
            height: 43,
            borderWidth:1,
            padding:9,
            borderRadius:5,
            borderWidth:1,
            alignSelf: 'flex-end'
        },

        areaProductReview:{
            marginVertical:12,
        },

        abstract:{
            padding:13
        },

        resumeText:{
            fontSize: 18
        },

        areaPrice:{
            flexDirection:'row',
            justifyContent:'space-between',
            padding:5,
        },

        priceTotal:{
            fontWeight:'bold',
            fontSize:22
        },

        radio:{
            flexDirection:'row',
        },

        labelRadio:{
            justifyContent: 'center'
        },

        checkboxArea:{
            flexDirection:'row',
        },

        buttonFinishPayment:{
            fontSize:28,
            top:40,
            zIndex:20,
            textAlign:'center'
        },

        pageTitle: {
            marginBottom:12
        },

        container: {
            backgroundColor: '#F1F1F1',
            flex: 1
        }

   
    }
)