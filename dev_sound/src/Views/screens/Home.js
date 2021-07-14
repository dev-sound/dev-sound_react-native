import React, { Component } from 'react';
import {View,Image,StyleSheet,ScrollView,Dimensions,FlatList,Text,TouchableWithoutFeedback} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Carousel from 'react-native-banner-carousel';
import Title from '../components/Title';
import ProductOnly from '../components/ProductOnly';
import ImagesProject from '../components/Common/ImagesProject';
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




  state={
    infos:'',
    respProdutos:[]

  }


  getProduct = async () => {

       await axios.get(`http://10.0.3.2:3000/produtos/`)
        .then(infos => {
      
          this.setState({respProdutos:infos.data})
        })
          .catch(erro => console.warn(erro))
  
  }

   
    renderProductSpotlight = ({item}) =>  {
      return (
          <ProductOnly
            onPress={() => this.props.navigation.navigate('Product', {id: item._id})}
            imgProduct={item.img}
            nameProduct={item.nome}
            price={item.preco}
          />
      )
    }

    
    


    render(){ 



      return(

        <ScrollView style={style.scrollcontainer}>
          
          <Header
            drawer={() => this.props.navigation.openDrawer()} 
            cart={() => this.props.navigation.navigate('ShopCart')} 
            />        
            
          <Search navigation={this.props.navigation}/>
          
          <View style={style.carouselBanner}>
            <Carousel
              loop={false}
              autoplay={false}
            >
              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Product', {nome: 'GUITARRA FENDER® SIG SERIES JIMI HENDRIX STRATOCASTER®'})} >
              <Image style={{width:'97%', height: BannerHeight, borderRadius: 10}} source={ImagesProject.BannerImg.Banner1} />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Product', {nome: 'GUITARRA FENDER® SIG SERIES JIMMY PAGE TELECASTER®'})}>
              <Image style={{width:'97%', height: BannerHeight, borderRadius: 10}} source={ImagesProject.BannerImg.Banner2} />
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Product', {nome: 'GUITARRA FENDER® SIG SERIES RICHIE BLACKMORE STRATOCASTER®'})}>
              <Image style={{width:'97%', height: BannerHeight, borderRadius: 10}} source={ImagesProject.BannerImg.Banner3} />
              </TouchableWithoutFeedback>
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
      scrollcontainer: {
        backgroundColor: "#F1F1F1",
      },

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
        paddingVertical:10,
        padding:10,
        marginBottom: 30
      },

      fontText: {
        fontWeight: 'bold'
      }
      
    }
)