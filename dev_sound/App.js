import React from 'react';
import {Text,View,SafeAreaView,Image,StyleSheet} from 'react-native';
import Header from './src/componentes/Header'
import Banner from './assets/img/banner1.png'


export default () => {
  return (
     <SafeAreaView>
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
    }
  }
)
