import React,{Component}  from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList, ScrollView, Touchable, TouchableOpacity } from 'react-native';
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
    number:1
  }


  async componentDidMount(){
    await this.captureProduct()
    
  }


  //Captura produto da tela de produto, e inseri no carrinho..
   captureProduct = async () =>  {
      const productImport = await AsyncStorage.getItem('product')
      const productParse = JSON.parse(productImport)
      this.setState({items:productParse})

    }

  sumItems = () => {
    
    let items = this.state.items
    let arrPrice = []
    let sumsItem = 0

    if(items){
      items.forEach(element => arrPrice.push(element.productPrice))
      for (let i = 0; i < arrPrice.length; i++ ) { sumsItem += arrPrice[i] }
    }    

    return (
      <Text style={[styles.total, { fontWeight: "500", }]}>{`R$ ${(sumsItem).toFixed(2)}`}</Text>
    )
    
  }


  excluir = async (params) => {

    let itemsExclude = params.item._id
    let items = this.state.items

    let newArr =  items.filter(value => {
        return value._id != itemsExclude
    })
  
  
    this.setState({items:newArr})
    await AsyncStorage.setItem('product',JSON.stringify(newArr))
 
  }



  willFocus = this.props.navigation.addListener('willFocus', () => {this.captureProduct()})

  render(){

    return(
      <SafeAreaView style={styles.container}>
         
          <ScrollView>
           
           <View>
             <Header 
             drawer={() => this.props.navigation.openDrawer()}
             comeBackHome={() => this.props.navigation.navigate('Home')} 
              //  cartQuant={this.state.items.length}
             />
              <Title title="Seu carrinho" />
             
            <FlatList
                 data={this.state.items}
                 keyExtractor={(item) => `${item.id}`}
                 renderItem={ (item) =>
                    <GridProd 
                     excluir={() => this.excluir(item)}
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
               <Button label="Finalizar compra" onPress={() => this.props.navigation.navigate('Payment')} />
            </ScrollView>
              
      </SafeAreaView>
    )
  }

}
 



//   //soma do preço dos itens
//   let valueInitial = 0
//   if (respItem.length == 1) {
//     valueInitial = respItem[0].priceValue
//   } else {
//     valueInitial = respItem.reduce((acumulador, itemValue) => {
//       return acumulador + itemValue.priceValue
//     }, 0);
//   }


//   //função para deletar os itens
//   function deleteItem(id){
//     const newArray = items.filter( (item) => { 
//       return item.id != id
//     })
//     setItems(newArray)
//     changeValueTotal()
//   }

//   //funcão em andamento para mudar o valor do total conforme deleta os itens
//   function changeValueTotal(){
//     const valueTotal = 0
//     if (respItem.length == 1) {
//       valueTotal = respItem[0].priceValue
//     } else {
//       valueTotal = respItem.reduce((acumulador, itemValue) => {
//         setValueTotal(acumulador + itemValue.priceValue)
//       }, 0);
//     }
  
//   }




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
