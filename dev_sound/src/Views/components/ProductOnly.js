import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity, Image, View, Dimensions} from 'react-native'
const format = require('../components/Common/moneyFormat')


export default class ProductOnly extends Component{
    

    state  = {
        
    }





    validEstoqueItem = () => {
        let estoqueItem = this.props.itemEstoque
        
        if(estoqueItem  > 0 ){
            return (
    
                <TouchableOpacity style={styles.container} {...this.props}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: `${this.props.imgProduct}`}}></Image>
                    </View>
                    <View>
                        <Text style={styles.title} numberOfLines={3}>{this.props.nameProduct}</Text>
                    </View>
                    <View>
                        <Text style={styles.price}>{format.moneyFormat(this.props.price)}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
     

        return(
            <TouchableOpacity style={styles.container} {...this.props}>
              <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: `${this.props.imgProduct}`}}></Image>
                </View>
                <View>
                     <Text style={styles.title} numberOfLines={3}>{this.props.nameProduct}</Text>
             </View>
             <View>
                 <Text style={styles.price}> Sem Estoque  </Text>
             </View> 
            </TouchableOpacity>
        )

    }

   
 
    render(){

        
        
        return (
         
            
            <>
                {this.validEstoqueItem()}
            </>  
        
        )
    }
}





const styles = StyleSheet.create(
    {
        container: {
            width: Dimensions.get('window').width/2.5,
            backgroundColor: '#FFF',
            borderRadius: 11,
            padding: 10,
            elevation: 4,
        },

        imageContainer: {
            alignSelf: 'center',
            padding: 5,
            width: Dimensions.get('window').width/2.5,
            height: Dimensions.get('window').width/2.5,
            borderRadius: 17,
            },
            
        image: {
            width: '100%',
            height: '100%',
            borderRadius: 17,
        }, 

        title: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'left',
            opacity: 1,
            marginTop: 10,
            marginLeft: 3,
            marginBottom: 6
        },

        price: {
            fontSize: 22,
            textAlign: 'center',
            fontWeight: 'normal',
        }
    }
)