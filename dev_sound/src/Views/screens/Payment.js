import React, { Component } from 'react'
import {View,Text,ScrollView,StyleSheet,FlatList} from 'react-native'
import Input from '../components/Input'
import Logo from '../components/Header/logo'
import PickerSelect from 'react-native-picker-select'
import ProductPayment from '../components/ProductPayment'
import ImagesProject from '../components/Common/ImagesProject'
import Button from '../components/Button'
import ProductPaymentDATA from '../components/Common/ProductPaymentDATA'



const disabledInputs = {
    disabledName:false
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
    UF:'SP',
}

const initialStateForm ={
    installments:'1x de R$ 5.999 Sem Juros' , 
    form:{...form},
    disabled:{...disabledInputs},
    validStyleName:''
}



export default class Payment extends Component {
    
    state = {...initialStateForm}


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

        const disabled = this.state.disabled.disabledName     
   
        if(mastercardRegex.test(value)){
            this.setState({disabled:true}) 
            this.setState({validStyleName:'valid'})

        }else{
            this.setState({validStyleName:'noValid'})
        }

           
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
                
                    <Input 
                        validInput={this.state.validStyleName}
                        label = 'Numero Cartão'
                        placeholder='Cartão de Credito'
                        keyboardType={'numeric'}
                        value={this.state.numberCard}
                        onBlur={() => this.validInputCard(this.state.numberCard) }
                        onChangeText={(numberCard) => { this.setState({numberCard:numberCard}) }}

                    />

                    <Input          
                        label = 'Nome do Cartão'
                        placeholder='Digite seu nome'
                        value={this.state.nameClient}
                        onChangeText={(nameClient) => this.setState({nameClient})}
                        editable={this.state.disabled.disabledName}         
                    />

    

                    <View style={styles.areaInputsMins}>

                        <Input 
                            medium
                            label = 'Mês de expiração'
                            placeholder='12'
                            keyboardType={'numeric'}
                            value={this.state.monthCard}
                            onChangeText={(monthCard) => this.setState({monthCard})}     
                        />

                        <Input                         
                            label = 'Ano de expiração'
                            placeholder='2022'
                            keyboardType={'numeric'}
                            value={this.state.yearCard}
                            onChangeText={(yearCard) => this.setState({yearCard})}   
                        />

                        <Input 
                            label = 'CVV'
                            placeholder='987'
                            keyboardType={'numeric'}
                            value={this.state.cvv}
                            onChangeText={(cvv) => this.setState({cvv})}   
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
                    

                </View>

                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Endereço de Entrega</Text>
                </View>

                <View style={styles.areaForms}>
                    
                    <Input 
                        label = 'CEP'
                        keyboardType={'numeric'}
                        placeholder='0000000'
                        value={this.state.cep}
                        onChangeText={(cep) => this.setState({cep})}   
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                            setSize={290}
                            label = 'Rua/Avenidade'
                            placeholder='Rua Av. Paulista'
                            value={this.state.street}
                            onChangeText={(street) => this.setState({street})}   
                        />

                        <Input 
                            setSize={70}
                            label = 'Numero'
                            placeholder='987'
                            keyboardType={'numeric'}
                            value={this.state.numberHome}
                            onChangeText={(numberHome) => this.setState({numberHome})}   
                        />
                            
                    </View>
                    
                    <Input 
                        label = 'Bairro'
                        placeholder='Vila Orleans'
                        value={this.state.district}
                        onChangeText={(district) => this.setState({district})}   
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                            setSize={290}
                            label = 'Cidade'
                            placeholder='São Paulo'
                            value={this.state.city}
                            onChangeText={(city) => this.setState({city})}   
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
                                <Text styles={styles.ufText}>{this.state.form.UF}</Text>
                            </PickerSelect>
                        </View>
                            
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

                <Button finishButtonDisabled label='FINALIZAR COMPRA'/>             
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
        }

   
    }
)