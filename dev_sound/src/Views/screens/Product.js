import React, { Component } from 'react';
import {View,Image,StyleSheet,ScrollView,Dimensions,FlatList,Text} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Title from '../components/Title';
import ImagesProject from '../components/Common/ImagesProject';
import Button from '../components/Button';

export default class Product extends Component{

    render(){ 

        return(

        <ScrollView >
        {/* componentes */}
        <Header/>
        <Search style={styles.searchBar}/>
        {/* componentes */}

        {/* título e imagem */}
        <Text style={styles.productTitle}>GUITARRA FENDER VINTERA 70S STRATOCASTER® MAPLE</Text>
        <View style={styles.imageContainer}>
            <Image style={styles.productImage} source={ImagesProject.ProductImages.saxImg} />
        </View>
        {/* título e imagem */}
        
        {/* preço e botão comprar */}
        <View style={styles.priceContainer}>
            <View style={styles.collumnContainer}>
                <Title title='Preço'/>
                <Title title='R$12.900,00'/>
            </View>
            <View style={styles.inlineContainer}>
                <Button label='Comprar' />
            </View>
        </View>
        {/* preço e botão comprar */}
        
        {/* descrição */}
        <View style={styles.descriptionContainer}>
            <Title title='Descrição e Especificações'/>
            <Text></Text>
        </View>
        {/* descrição */}
            
        </ScrollView>
        
            )
        }
    }

const styles =  StyleSheet.create(
    {   
        productTitle: {
            alignSelf: 'center',
            width: '86%',
            marginTop: 15,
            fontSize: 25,
            fontWeight: "bold",
            marginLeft: 10,
        },
        imageContainer:{
            width: '87%',
            height: '35%',
            alignSelf: 'center',
            marginTop: 25,
            elevation: 7,
            borderColor: '#000'
        },
        productImage: {
            width: '100%',
            height: 412,
            borderRadius: 11,
        },
        descriptionContainer: {
            width: '87%',
            height: 300,
            backgroundColor: '#BABABA',
            alignItems: 'flex-start',
            padding: 15,
            alignSelf: 'center',
            borderRadius: 11,
            elevation: 6,
            marginBottom: 50,
        },
        collumnContainer:{
            marginTop: 40,
        },
        inlineContainer: {
            justifyContent: 'space-between',
            marginTop: 50,
        },
        priceContainer:{
            flexDirection: 'row',
            width: '86%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 35,
        }
    }
)
