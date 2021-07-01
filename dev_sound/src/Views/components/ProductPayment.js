import React from 'react'
import { Text,StyleSheet ,TouchableOpacity,Image,View,Dimensions} from 'react-native'

export default props =>{

    const stylesContainer = [styles.container]

    if(props.paymentArea) {
        stylesContainer.push(styles.payment)
    }


    return (
        <View style={[stylesContainer]}>

            <View>
            <View style={styles.containerImgQtd}>
            
                <View style={styles.containerImgProduct}>
                
                <Image 
                    style={styles.img}
                    source={props.imgProduct}
                />
                
                </View>
            
            </View>
                <Text style={styles.qtdProduct}> Quantidade : {props.qtdProduct}</Text>
            </View>


                <View style={styles.areaInfoProduct}>
                    
                    <View style={styles.infos}>
                        <View>
                            <Text>{props.nameProduct}</Text>
                            <Text>Modelo: {props.modelProduct}</Text>
                        </View>
                        
                        <View style={styles.price}>
                            <Text style={{fontWeight:'bold'}}>Preço unitário: </Text>
                            <Text>R$ {props.priceUnit}</Text>
                        </View>
                    </View>
                </View>

                {props.infos && 
                    <View  style={styles.pricesInfos}>

                        <View style={styles.days}>
                            <Text style={{fontWeight:'bold',marginLeft:20}}>Entrega</Text>
                            <Text>7 Dias úteis</Text>
                        
                        </View>


                        <View>
                            <Text>Subtotal : 3.800</Text>
                            <Text>Frete    : 100</Text>
                            <Text>Total    : 3.900</Text>
                        </View>
                    </View>
                }
        </View>
    )

}


const styles = StyleSheet.create(

    {

        container:{
            flexDirection:'row',
        },

        containerImgQtd:{
            marginTop:10,
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
        },

        img:{
            width:'80%',
            height:150
        },

        qtdProduct:{
            alignItems:'center',
            marginLeft:25,
            paddingVertical:5,
            fontWeight:'bold'
        },

        areaInfoProduct:{
        
            width:170,
            marginTop:12,
            marginLeft:10,
            flexDirection:'row'
        },

        infos:{
            justifyContent:'space-between'
        },

        price:{
            position:'relative',
            bottom:35
        },

        pricesInfos:{
            justifyContent:'space-between',
            position:'relative',
            right:19
        },

        days:{
            marginTop:10,
            marginLeft:20
        },

        payment:{
            backgroundColor:'#fff',
            marginVertical:7
        }

    }
)