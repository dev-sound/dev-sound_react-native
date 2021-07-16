import React,{Component}  from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList, ScrollView, Alert } from 'react-native';
import Header from '../components/Header';
import GridProd from '../components/ShopCart/GridProd';
import Title from '../components/Title';
import respItem from '../components/ShopCart/respItem';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class ShopCart extends Component {

  state ={
    valueTotal:0,
    items:[],
    userInfos:{}
  }


  async componentDidMount(){
    await this.captureProduct()
    await this.captureUserInfos()
  }


  //Captura produto da tela de produto, e inseri no carrinho..
   captureProduct = async () =>  {
     const productImport = await AsyncStorage.getItem('product')
     const productParse = JSON.parse(productImport)
     this.setState({items:productParse})

   }


  captureUserInfos = async () => {
    const userAuth = await AsyncStorage.getItem('userData')
    const users =  JSON.parse(userAuth)
    this.setState({userInfos:users}) 
  }



  sumItems = () => {
    
    let items = this.state.items
    let arrPrice = []
    let sumsItem = 0

    if(items){
      items.forEach(element => arrPrice.push(element.valor_unitario))
      for (let i = 0; i < arrPrice.length; i++ ) { sumsItem += arrPrice[i] }
    }    

    return (
      <Text style={[styles.total, { fontWeight: "500", }]}>{`R$ ${(sumsItem).toFixed(2)}`}</Text>
    )
    
  }



  excludeItem = async (params) => {

    let itemsExclude = params.item.excludeID
    let items = this.state.items

    let newArr =  items.filter(value => {
        return value.excludeID != itemsExclude
    })
  
  
    this.setState({items:newArr})
    await AsyncStorage.setItem('product',JSON.stringify(newArr))
 
  }


  buttonPayment = () => {

    let userTokem = this.state.userInfos
    let valueItems = this.state.items
    
    if(userTokem && valueItems){
      return  (
        <Button label="Finalizar" onPress={() => this.props.navigation.navigate('Payment')} />
      )
    }

    return (
      <Button label="Finalizar"
       onPress={
         () => Alert.alert('Login','Faça Login para concluir sua compra',
          [
            {
              text:'Voltar Home',
              onPress:() => this.props.navigation.navigate('Home')
            },
            {
              text:'Fazer Login :) ',
              onPress:() => this.props.navigation.navigate('Auth')
            }
          ]
        )
      } 
      />
    )

  }


  willFocus = this.props.navigation.addListener('willFocus', () => {this.captureProduct()})

  render(){

    
    return(
      <SafeAreaView style={styles.container}>
         
          <ScrollView>
           
           <View>
             <Header 
             drawer={() => this.props.navigation.openDrawer()}
              //  cartQuant={this.state.items.length}
             />
              <Title title="Seu carrinho" />
             
            <FlatList
                 data={this.state.items}
                 keyExtractor={(item) => `${item.id}`}
                 renderItem={ (item) =>
                    <GridProd 
                     excluir={() => this.excludeItem(item)}
                     database={item}
                     quant={this.state.number}
                    
                    /> 
                 
                 } 
              
            />
            
             </View>
             
           <View style={styles.totalPrice}>
                <Text style={styles.total}>Total: </Text>
            
                  {this.sumItems()}
            
               </View>

               {this.buttonPayment()}
            </ScrollView>
              
      </SafeAreaView>
    )
  }

}
 








const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: "#F1F1F1",
    },
    totalPrice: {
      flexDirection: "row",
      justifyContent: "center",
      paddingTop: 30,
      paddingBottom: 16
    },
    total: {
      fontSize: 20,
      textDecorationStyle: "solid",
      fontWeight: "700",
      paddingBottom: 10
    }
  }

)