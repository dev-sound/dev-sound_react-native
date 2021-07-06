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
        <Header/>
        <Search style={styles.searchBar}/>
        <Text style={styles.productTitle}>GUITARRA FENDER VINTERA 70S STRATOCASTER® MAPLE</Text>
        <View style={styles.imageContainer}>
            <Image style={styles.productImage} source={ImagesProject.ProductImages.guitarraFender} />
        </View>
        <View style={styles.priceContainer}>
            <View style={styles.collumnContainer}>
                <Title title='Preço' />
                <Title title='R$12.900,00' />
            </View>
            <View style={styles.inlineContainer}>
                <Button label='Comprar' />
            </View>
        </View>
        <View style={styles.descriptionContainer}>
            <Title title='Descrição e Especificações'/>
            <Text style={styles.descriptionText}>Honrando o eletrizante "Voodoo Chile" que popularizou a guitarra Stratocaster® e sua enorme flexibilidade sônica, a Jimi Hendrix Stratocaster® te dá o mesmo som incendiário e o mesmo feeling das distintas Strats "invertidas" que Hendrix usava, com visual clássico e timbre "vintage".</Text>
            <Text style={styles.descriptionText}>
                  Corpo em alder 
                - Braço maple "C" shape c/ headstock invertido 
                - Escala em maple com 25.5 (64.8 cm) 
                - Escala com raio de 9.5 (241 mm) 
                - 21 trastes medium jumbo 
                - Acompanha Deluxe Gig Bag
            </Text>
        </View>
            
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
        },
        descriptionText:{
            width: '87%',
            marginTop: 10,
            marginLeft: 10,
            alignSelf: 'flex-start',
            fontSize: 21,
        }
    }
)
