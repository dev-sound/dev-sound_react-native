
import React, { Component } from 'react'
import {View,Text,ScrollView,StyleSheet} from 'react-native'
import Input from '../components/Input'
import Logo from '../components/Header/logo'
import PickerSelect from 'react-native-picker-select'


export default class Payment extends Component {
    
    state = {
        installments:'1x de R$ 5.999 Sem Juros' , 
        UF:'SP'
    }




    
    render(){   

        const placeholder = {
            label: 'Select a sport...',
            value: null,
            color: '#9EA0A4',
          };

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
                        label = 'Numero Cartão'
                        placeholder='Cartão de Credito'
                        keyboardType={'numeric'}
                    />

                    <Input                    
                        label = 'Nome do Cartão'
                        placeholder='Digite seu nome'                  
                    />

    

                    <View style={styles.areaInputsMins}>

                        <Input 
                        medium
                        label = 'Mês de expiração'
                        placeholder='12'
                        keyboardType={'numeric'}
                        />

                        <Input                         
                        label = 'Ano de expiração'
                        placeholder='2022'
                        keyboardType={'numeric'}
                        />

                        <Input 
                        label = 'CVV'
                        placeholder='987'
                        keyboardType={'numeric'}
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
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                        setSize={290}
                        label = 'Rua/Avenidade'
                        placeholder='Rua Av. Paulista'
                        />

                        <Input 
                        setSize={70}
                        label = 'Numero'
                        placeholder='987'
                        keyboardType={'numeric'}
                        />
                            
                    </View>
                    
                    <Input 
                        label = 'Bairro'
                        placeholder='Vila Orleans'
                    />

                    <View style={styles.areaInputsMins}>

                        <Input 
                        setSize={290}
                        label = 'Cidade'
                        placeholder='São Paulo'
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

                </View>

                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Revisão de Produtos</Text>
                </View>


                <View style={styles.areaProductReview}>


                </View>


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
            
        }

   
    }
)