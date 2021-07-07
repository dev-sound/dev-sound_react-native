import React, { Component } from 'react';
import {View,Image,StyleSheet,ScrollView,Dimensions,FlatList,Text} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Carousel from 'react-native-banner-carousel';
import Title from '../components/Title';
import ProductOnly from '../components/ProductOnly';
import ProductsSpotlight from '../components/Common/ProductsSpotlight';
import ProductNews from '../components/Common/ProductNews';
import ImagesProject from '../components/Common/ImagesProject';
import { requests } from '../components/Common/ProductsSpotlight'
import axios from 'axios';


const BannerHeight = Dimensions.get('window').width/1.6;

const images = [
  ImagesProject.BannerImg.Banner1,
  ImagesProject.BannerImg.Banner2,
  ImagesProject.BannerImg.Banner3
]


export default class Home extends Component {


  async componentDidMount (){

      await this.getProduct()  
  } 

  getProduct = async () => {

       await axios.get(`http://10.0.3.2:3000/produtos/`)
        .then(infos => {
      
          this.setState({respProdutos:infos.data})
        })
          .catch(erro => console.warn(erro))
  
  }

  
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
            nameProduct={item.nome}
            price={item.preco}
          />
      )
    }

    renderProductNews =  ({item}) => {
      return (
      
       <ProductOnly
          ProductId ={item._id}
          imgProduct={item.img}
          nameProduct={item.nome}
          price={item.preco}
          
       />
      )
    }

      state={
        
        respProdutos:[]

      }


        
   
 
    render(){ 

     

      return(

        <ScrollView >
          
          <Header drawer={() => this.props.navigation.openDrawer()}  />
          
            
          
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
              data={this.state.respProdutos}
              keyExtractor={item => `${item._id}`}
              renderItem={this.renderProductSpotlight}
              
            />
          
          </View>
      


            <Title title="Novidades" style={style.fontText}/>
            <View style={style.newsProduct}>

              <FlatList 
                horizontal
                data={this.state.respProdutos}
                keyExtractor={item => `${item._id}`}
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
      
      container:{
        flex:1,
        backgroundColor: "#F1F1F1",
      },

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