import React from 'react'
import { Text,StyleSheet ,TouchableOpacity,Image,View,Dimensions} from 'react-native'

export default props =>{

    return (
        <TouchableOpacity style={styles.container}>
        
            <View style={styles.containerImgProduct}>
              <Image 
                style={styles.img}
                source={props.imgProduct}/>
            </View>
            
            <View style={styles.containerInfosProduct}>
                
                <View style={styles.nameConteiner}>
                    <Text style={styles.textProduc}>{props.nameProduct} </Text>
                </View>

                <View>
                    <Text style={styles.priceProduc}>R$ {props.price}    </Text>
                </View>
            </View>


        </TouchableOpacity>
    )

}


const styles = StyleSheet.create(

    {
        container:{
            width:Dimensions.get('window').width/3,
            padding:10,
            marginLeft:10,
            backgroundColor:'#fff',
            borderRadius:17,
            shadowColor: "#000",
            shadowOffset: {
                width: 3,
                height: 3,
            },
             shadowOpacity: 0.27,
             shadowRadius: 4.65,
             elevation: 6,
             marginBottom: 10,
        },

        containerImgProduct:{

        },
        
        containerInfosProduct:{
            width:'115%',
            margin:10,
            alignItems:'center',
            position:'relative',
            left:-19
        },

        nameConteiner:{
            padding:2,
            margin:5
        },

        img:{
            width:'90%',
            height:150
        },

        textProduc:{
            textTransform:'uppercase',
            fontFamily:'Roboto',
            fontWeight:'bold',
            fontSize:13.7
        },


        priceProduc:{
            textTransform:'uppercase',
            fontFamily:'Roboto',
            fontWeight:'bold',
            fontSize:14
        }

    }
)