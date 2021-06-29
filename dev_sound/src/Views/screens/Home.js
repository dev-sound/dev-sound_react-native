import React, { Component } from 'react';
import {View,Image,StyleSheet,ScrollView,Dimensions,FlatList} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Carousel from 'react-native-banner-carousel';
import Title from '../components/Title';
import ProductOnly from '../components/ProductOnly';
import ProductsSpotlight from '../components/Common/ProductsSpotlight';
import ProductNews from '../components/Common/ProductNews';
import ImagesProject from '../components/Common/ImagesProject';

const BannerHeight = Dimensions.get('window').width/1.6;

const images = [
  ImagesProject.BannerImg.Banner1,
  ImagesProject.BannerImg.Banner2,
  ImagesProject.BannerImg.Banner3
]


export default class Home extends Component{
  
    renderPage = (image,index) => {
      return (
        <View key={index}>
            <Image style={{width:'97%', height: BannerHeight}} source={image} />
        </View>
      )
    }

   
    renderProductSpotlight = ({item}) =>  {
      return (
          <ProductOnly
            imgProduct={item.img}
            nameProduct={item.name}
            price={item.price}
          />
      )
    }

    renderProductNews = ({item}) => {
      return (
        <ProductOnly
          imgProduct={item.img}
          nameProduct={item.name}
          price={item.price}
       />
      )
    }

      state={}
 
    render(){ 

      return(

        <ScrollView >
          
          <Header/>
          <Search/>
          
          <View style={style.carouselBanner}>
            <Carousel
              loop={false}
              autoplay={false}
            >
              {images.map((image, index) => this.renderPage(image, index))}
            </Carousel>
          </View>

          <View style={style.productAreaContainer}>
          

            <Title title="Destaques" style={style.fontText}/>
            <View style={style.SpotlightProduct}> 
            
              <FlatList 
                horizontal
                data={ProductsSpotlight}
                keyExtractor={item => `${item.id}`}
                renderItem={this.renderProductSpotlight}
              />
            
            </View>


            <Title title="Novidades" style={style.fontText}/>
            <View style={style.newsProduct}>

            <FlatList 
                horizontal
                data={ProductNews}
                keyExtractor={item => `${item.id}`}
                renderItem={this.renderProductSpotlight}
              />

             </View>
             
          
          </View>
        </ScrollView>
      )
    }

    }

  const style =  StyleSheet.create(
    {
  
      carouselBanner:{ 
        position:'relative',
        left:6,
        padding:2,
        marginTop:10
      },

      productAreaContainer:{
        marginTop:10,
      },

      SpotlightProduct:{

        paddingVertical:10,
        padding:10
      }
      ,
      newsProduct:{
        paddingVertical:10
      }
      
    }
)
