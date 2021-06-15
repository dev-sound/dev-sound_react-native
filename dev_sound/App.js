import React from 'react';
import {Text,View,SafeAreaView,Image,StyleSheet} from 'react-native';
import Header from './src/componentes/Header'
import Banner from './assets/img/banner1.png'


export default () => {
  return (

     <SafeAreaView style={style.container}>
        <View>
          <Header/>   
        </View>

        <View /* Banner  */> 
         <Image source={Banner}   style={style.bannerImgs} />
        </View>

    </SafeAreaView>
    )

  }

const style =  StyleSheet.create(
  {
    bannerImgs:{
      overflow:'hidden',
     resizeMode:'contain'
    },

    container:{
      backgroundColor: "#F1F1F1",
      flex:1
    }
  }
)
