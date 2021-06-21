import React from 'react';
import {View,SafeAreaView,StyleSheet} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header/'

export default () => {
  return (

     <SafeAreaView style={style.container}>
        <View>
          <Header/>
          <Search/>
        </View>
    </SafeAreaView>
    )

  }

const style =  StyleSheet.create(
  {
    container:{
      backgroundColor: "#F1F1F1",
    }
  }
)
