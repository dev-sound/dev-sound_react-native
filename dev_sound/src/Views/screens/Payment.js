import React, { Component } from 'react'
import {View,Text,ScrollView,StyleSheet,FlatList} from 'react-native'
import Input from '../components/Input'
import Logo from '../components/Header/logo'
import PickerSelect from 'react-native-picker-select'
import ProductPayment from '../components/ProductPayment'
import Button from '../components/Button'
import ProductPaymentDATA from '../components/Common/ProductPaymentDATA'
import { RadioButton,Checkbox } from 'react-native-paper';
import paymentsSaves from '../components/Common/paymentsSaves'


const disabledInputs = {
    disabledName:false,
    disabledMonth:false,
    disabledYear:false,
    diabledCvv : false,
    disabledCep:false,
    disabledStreet:false,
    disabledNumber:false,
    disabledDistrict:false,
    disabledCity:false
}


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

const initialStateForm ={
    installments:'1x de R$ 5.999 Sem Juros' , 
    form:{...form},
    UF:'SP',
    ehBoleto:false,
    saveCard:false,
    saveAdress:false,
    disabled:{...disabledInputs},
    stylesInput:{...stylesInput}
}


export default class Payment extends Component {

    state = {...initialStateForm}

    // start validation inputs
    renderProduct = ({item}) => {
        return (
            <ProductPayment
                    paymentArea
                    imgProduct={item.imgProduct}
                    qtdProduct={item.qtdUnit}
                    nameProduct={item.nameProduct}
                    modelProduct = {item.modelProduct}
                    priceUnit= {item.priceUnit}
                />
        )
    }
    
    //  5392076388465820
    validInputCard = value => {
        const mastercardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
      
        if(mastercardRegex.test(value)){
     
            disabledInputs.disabledName = true
            this.setState({validStyleCard:'valid'})

        }else{
            paymentsSaves.creditCard = ""
            disabledInputs.disabledName = false
            this.setState({validStyleCard:'noValid'})
        }
    }

    validInputName = value => {
        const nameRegex = /[A-Z][a-z].* [A-Z][a-z].*/

        if(nameRegex.test(value)){
            disabledInputs.disabledMonth = true
            this.setState({validStyleName:'valid'})
        }else{
            disabledInputs.disabledMonth = false
            this.setState({validStyleName:'noValid'})

        }

    }

    validMouthCard = value => {

        const regexCardName = /[1-9]/;
        if(regexCardName.test(value) && value <= 12 && value >= 1){
            disabledInputs.disabledYear = true
            this.setState({validStyleMouth:'valid'})

        }else{
            disabledInputs.disabledYear = false
            this.setState({validStyleMouth:'noValid'})
        }
    }

    validYearCard = value => {
        const regexNumber = /[1-9]/;
    
        const year = new Date().getFullYear()
    
        if(regexNumber.test(value) && value >= year){
            
            disabledInputs.diabledCvv = true
            this.setState({validStyleYear:'valid'})
        }else{
            disabledInputs.diabledCvv = false
            this.setState({validStyleYear:'noValid'})

        }
    }

    validCvvCard = value => {
        const regexNumber = /[1-9]/;
    
        if(regexNumber.test(value)){

            disabledInputs.disabledCep = true
            this.setState({validStyleCvv:'valid'})

        }else{

            disabledInputs.disabledCep = false
            this.setState({validStyleCvv:'noValid'})
        }
    }

    validAdressCep = value => {
        const regexCep = /[0-9]{5}-[0-9]{3}/

        if(regexCep.test(value)){
            disabledInputs.disabledStreet = true
            this.setState({validStyleCep:'valid'})      

        }else{
            paymentsSaves.Adress.cep = ""
            disabledInputs.disabledStreet = false
            this.setState({validStyleCep:'noValid'})

        }
}


    validAdressStreet = value => {
        const nameRegex = /[A-z][a-z ]/
    
        if(nameRegex.test(value)){
            disabledInputs.disabledNumber = true
            this.setState({validStyleStreet:'valid'})    
        }else{
            disabledInputs.disabledNumber = false
            this.setState({validStyleStreet:'noValid'})
        }
    }

    validAdressNumber = value => {
        const regexNumber = /[1-9]/;
       
        if(regexNumber.test(value)){
            disabledInputs.disabledDistrict = true
            this.setState({validStyleNumber:'valid'})    

        }else{
            disabledInputs.disabledDistrict = false
            this.setState({validStyleNumber:'noValid'})
        }
    }


    validAdressDistrict = value => {
        const nameRegex = /[A-z][a-z ]/
    
        if(nameRegex.test(value)){
          
            disabledInputs.disabledCity = true
            this.setState({validStyleDistrict:'valid'})    
        }else{
            disabledInputs.disabledCity = false
            this.setState({validStyleDistrict:'noValid'})
        }
    }

    validAdressCity = value => {
        const nameRegex = /[A-z][a-z ]/
    
        if(nameRegex.test(value)){

            this.setState({validStyleCity:'valid'})    

        }else{
           
            this.setState({validStyleCity:'noValid'})
        }
    }


    setDataPayment = ( ) => {

        console.warn(this.state.saveCard)

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


        console.warn(paymentsSaves)
    }

    // end  validation  inputs

    // alter layout when user press radio button ehBoleto
    setBoletoForm = () => {
        if(this.state.ehBoleto){
            disabledInputs.disabledCep = true
            this.state.saveCard = false
            return 'none'
        }
        
        disabledInputs.disabledCep = false
        
    }
    
    render(){   
      
        return (
        
            <ScrollView style={styles.container} > 

                <View style={styles.logoArea}>
                    <Logo/>
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
                            <Text style={styles.labelRadio}>Cartão de Credito</Text>
                        </View>

                        {/* Start inputs about informations credid card user */}
                        <View style={{display:this.setBoletoForm()}}>        
                        <Input 
                        
                            validInput={this.state.validStyleCard}
                            fieldLabel = 'Numero Cartão'
                            placeholder='Cartão de Credito'
                            keyboardType={'numeric'}
                            value={this.state.numberCard}
                            onBlur={() => this.validInputCard(this.state.numberCard) }
                            onChangeText={(numberCard) => { this.setState({numberCard:numberCard}) }}

                        />

                        <Input  
                            validInput={this.state.validStyleName}        
                            fieldLabel = 'Nome do Cartão'
                            placeholder='Digite seu nome'
                            value={this.state.nameClient}
                            onChangeText={(nameClient) => this.setState({nameClient})}
                            onBlur = {() => this.validInputName(this.state.nameClient)}
                            editable={disabledInputs.disabledName}         
                        />

        

                        <View style={styles.areaInputsMins}>

                            <Input 
                                medium
                                validInput={this.state.validStyleMouth}  
                                fieldLabel = 'Mês de expiração'
                                placeholder='12'
                                keyboardType={'numeric'}
                                value={this.state.monthCard}
                                onChangeText={(monthCard) => this.setState({monthCard})}
                                onBlur = {()=> this.validMouthCard(this.state.monthCard)}
                                editable={disabledInputs.disabledMonth}      
                            />

                            <Input 
                                validInput={this.state.validStyleYear}                         
                                fieldLabel = 'Ano de expiração'
                                placeholder='2022'
                                keyboardType={'numeric'}
                                value={this.state.yearCard}
                                onBlur = {()=> this.validYearCard(this.state.yearCard)}
                                onChangeText={(yearCard) => this.setState({yearCard})}
                                editable={disabledInputs.disabledYear}   
                            />

                            <Input 
                                validInput={this.state.validStyleCvv}    
                                fieldLabel = 'CVV'
                                placeholder='987'
                                keyboardType={'numeric'}
                                value={this.state.cvv}
                                onBlur = {()=> this.validCvvCard(this.state.cvv)}
                                onChangeText={(cvv) => this.setState({cvv})}
                                editable={disabledInputs.diabledCvv}   
                            />
                                



                        </View>

                


                    <Text>Parcelas</Text>
                    <View style={styles.select}>
                            <PickerSelect
                            
                                onValueChange ={(value) => this.setState({installments:value})}
                                items ={[
                                    {label:'2x de R$ 2.999 Sem Juros' , value:'2x de R$ 2.999 Sem Juros'},
                                    {label:'3x de R$ 1.999 Sem Juros' , value:'3x de R$ 1.999 Sem Juros'},
                                    {label:'4x de R$ 1.499 Sem Juros' , value:'4x de R$ 1.499 Sem Juros'},
                                    {label:'5x de R$ 1.199 Sem Juros' , value:'5x de R$ 1.199 Sem Juros'},
                                ]}         
                                placeholder={{ label:"1x de R$ 5.999 Sem Juros ", value: '1x de R$ 5.999 Sem Juros' }}
                            >   
                        
                            <Text>{this.state.installments}</Text>
                            </PickerSelect>
                        </View>
                    

                                
                        <View style={styles.checkboxArea}>
                            <View style={styles.checkbox}>
                                <Checkbox 
                                    color={'#FACC22'}
                                    status={this.state.saveCard ? 'checked' : 'unchecked'}
                                    onPress={() => this.setState({saveCard:!this.state.saveCard})}
                                />
                            </View>
                            <Text>Salvar Cartão </Text>
                        </View>

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
                            <Text style={styles.labelRadio}>Boleto</Text>
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
                        keyboardType={'numeric'}
                        placeholder='0000-000'
                        value={this.state.cep}
                        onBlur = {()=> this.validAdressCep(this.state.cep)}
                        onChangeText={(cep) => this.setState({cep})}
                        editable={disabledInputs.disabledCep}
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                            validInput={this.state.validStyleStreet}
                            setSize={290}
                            fieldLabel = 'Rua/Avenidade'
                            placeholder='Rua Av. Paulista'
                            value={this.state.street}
                            onChangeText={(street) => this.setState({street})}   
                            onBlur={()=> this.validAdressStreet(this.state.street)}
                            editable={disabledInputs.disabledStreet}
                        />

                        <Input 
                            validInput={this.state.validStyleNumber}
                            setSize={85}
                            fieldLabel = 'Numero'
                            placeholder='987'
                            keyboardType={'numeric'}
                            value={this.state.numberHome}
                            onBlur={()=> this.validAdressNumber(this.state.numberHome)}
                            onChangeText={(numberHome) => this.setState({numberHome})}
                            editable={disabledInputs.disabledNumber}  
                        />
                            
                    </View>
                    
                    <Input 
                        validInput={this.state.validStyleDistrict}
                        fieldLabel = 'Bairro'
                        placeholder='Vila Orleans'
                        value={this.state.district}
                        onBlur={()=> this.validAdressDistrict(this.state.district)}
                        onChangeText={(district) => this.setState({district})}   
                        editable={disabledInputs.disabledDistrict}
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                            validInput={this.state.validStyleCity}
                            setSize={290}
                            fieldLabel = 'Cidade'
                            placeholder='São Paulo'
                            value={this.state.city}
                            onBlur={()=> this.validAdressCity(this.state.city)}
                            onChangeText={(city) => this.setState({city})}   
                            editable={disabledInputs.disabledCity}
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
                    {/* End informations address user */}
                    <View style={styles.checkboxArea}>
                        <View style={styles.checkbox}>
                            <Checkbox 
                                 color={'#FACC22'}
                                status={this.state.saveAdress ? 'checked' : 'unchecked'}
                                onPress={() => this.setState({saveAdress:!this.state.saveAdress})}
                            />
                        </View>
                        <Text>Salvar Endereço para proximas compras ? </Text>
                    </View>
                
                </View>

                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Revisão de Produtos</Text>
                </View>


                <View style={styles.areaProductReview}>
                
                    <FlatList
                        data={ProductPaymentDATA}
                        keyExtractor={item => item.id}
                        renderItem={this.renderProduct}
                    />

                </View>

       


                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Resumo</Text>
                </View>
                
                    <View style={styles.abstract}>
                            
                            <View style={styles.areaPrice}>
                                <Text>Subtotal:</Text>
                                <Text>R$ 6.900,00</Text>  
                            </View>

                            <View style={styles.areaPrice}>
                                <Text>Frete:</Text>
                                <Text>R$ 100,00</Text>  
                            </View>

                            <View style={styles.areaPrice}>
                                <Text style={styles.priceTotal}>Total: </Text>
                                <Text style={styles.priceTotal}>R$: 6.944,00</Text>
                            </View>

                    </View>
            

                <Button finishButtonDisabled label='FINALIZAR COMPRA' onPress={() => this.setDataPayment()}/>        
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create(
    {
  
        areaForms:{
        
            padding:13
        },

        logoArea:{
            justifyContent:'center',
            alignItems:'center',
            padding:35,
          
        },

        textTitles:{
            backgroundColor:'#E2DDDD',
            height:40,
            justifyContent:'center',
            padding:5
        },

        titleForm:{
            fontSize:20,
            letterSpacing:0.3,
            fontWeight:'bold',
            color:'rgba(0,0,0,0.8)'
        },

        areaInputsMins:{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'

        },

        select:{
            height:45,
            borderWidth:1,
            padding:7,
            borderRadius:5,
            borderWidth:1,
        },

        uf:{
            position:'relative',
            
            top:6,
            height:45,
            width:70,
            borderWidth:1,
            padding:9,
            borderRadius:5,
            borderWidth:1,
        },

        areaProductReview:{
            marginVertical:12,
        },

        abstract:{

            padding:10
        },

        areaPrice:{
            flexDirection:'row',
            justifyContent:'space-between',
            padding:5

        },

        priceTotal:{
            fontWeight:'bold',
            fontSize:18
        },

        radioArea:{
            padding:10,
            width:60
        },

        radio:{
            flexDirection:'row',
            alignItems:'center',
            position:'relative',
            right:13
        },

        labelRadio:{
            position:'relative',
            right:13
        },

        checkboxArea:{
            flexDirection:'row',
            alignItems:'center',
            padding:7,
            position:'relative',
            right:10
        },


        infoPaymentArea:{
            
        }

   
    }
)