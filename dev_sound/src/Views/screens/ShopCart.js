import React, { useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import Header from '../components/Header/';
import GridProd from '../components/ShopCart/GridProd';
import Title from '../components/Title';
import respItem from '../components/ShopCart/respItem';
import Button from '../components/Button';


export default props => {
 
  //soma do preço dos itens
  let valueInitial = 0
  if (respItem.length == 1) {
    valueInitial = respItem[0].priceValue
  } else {
    valueInitial = respItem.reduce((acumulador, itemValue) => {
      return acumulador + itemValue.priceValue
    }, 0);
  }


  const [items, setItems] = useState(respItem) 
  const [valueTotal, setValueTotal] = useState(valueInitial)

  //função para deletar os itens
  function deleteItem(id){
    const newArray = items.filter( (item) => { 
      return item.id != id
    })
    setItems(newArray)
    changeValueTotal()
  }

  //funcão em andamento para mudar o valor do total conforme deleta os itens
  function changeValueTotal(){
    const valueTotal = 0
    if (respItem.length == 1) {
      valueTotal = respItem[0].priceValue
    } else {
      valueTotal = respItem.reduce((acumulador, itemValue) => {
        setValueTotal(acumulador + itemValue.priceValue)
      }, 0);
    }
  
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Header drawer={() => props.navigation.openDrawer()}/>
          <Title title="Seu carrinho" />
          <FlatList
            data={items}
            keyExtractor={(item) => `${item.id}`}
            renderItem={(item) => <GridProd database={item} 
            valueTotal={valueTotal} 
            deleteItem={deleteItem} 
            changeValueTotal={changeValueTotal}
            setValueTotal={setValueTotal} />} />
        </View>
        <View style={styles.totalPrice}>
          <Text style={styles.total}>Total: </Text>
          <Text style={[styles.total, { fontWeight: "500", }]}>{`R$ ${valueTotal}`}</Text>
        </View>
        <Button label="Finalizar compra" onPress={() => props.navigation.navigate('Payment')} />
      </ScrollView>
    </SafeAreaView>
  )

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
