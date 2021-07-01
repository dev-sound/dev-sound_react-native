import React from 'react';
import { View, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header/Header';
import GridProd from '../components/ShopCart/GridProd';
import Title from '../components/Title'
import respItem from '../components/ShopCart/respItem';

export default () => {
  return (

    <SafeAreaView style={style.container}>
      <View>
        <Header />
        <Title title="Seu carrinho" />
        <FlatList
          data={respItem}
          keyExtractor={(item) => `${item.id}`}
          renderItem={(item) => <GridProd database={item}/>} />
      </View>
    </SafeAreaView>
  )

}

const style = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: "#F1F1F1",
    }
  }
)
