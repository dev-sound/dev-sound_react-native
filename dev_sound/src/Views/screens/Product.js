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


export default class Product extends Component{

    render(){ 

        return(
        <ScrollView >
            
        <Header/>
        <Search style={styles.searchBar}/>

        <Title title='GUITARRA FENDER VINTERA 70S MAPLE'/>

        <View style={styles.imageContainer}>
            <Image style={styles.productImage} source={ImagesProject.ProductImages.guitarraFender} />
        </View>

        <View style={styles.descriptionContainer}>
            <Title title='DESCRIÇÃO E ESPECIFICAÇÕES'/>

        </View>
            
        </ScrollView>
        
            )
        }
    }

const styles =  StyleSheet.create(
    {
        imageContainer:{
            alignItems: 'center',
            shadowColor: "#000",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,
            elevation: 6,
            marginTop: 10,
        },
        productImage: {
            width: 400,
            height: 400,
            borderRadius: 11,
        },
        descriptionContainer: {
            width: '87%',
            height: 900,
            backgroundColor: '#BABABA',
            alignSelf: 'center',
            marginTop: 40, 
            borderRadius: 11,
            padding: 15,
        },
    }
)
