import React, { Component } from 'react'

import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'
import axios from 'axios'



import Header from '../components/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'





// const initialState = {
//     search:'',
//     respProdutos: []
// }

export default class SearchResult extends Component {

        customDidMount = async () => {

            await this.setState({search: this.props.navigation.getParam('search')})

            await this.getProduct() 
        }

        componentDidMount () {    
            this.customDidMount()
        } 

        willFocus = this.props.navigation.addListener('willFocus',
            () => {this.customDidMount()}
        )

        getProduct = async () => {
            await axios.get(`http://10.0.3.2:3000/produtos/${this.state.search.search}`)
             .then(infos => {
           
                this.setState({respProdutos:infos.data})
            })
            .catch(erro => console.warn(erro))
        }



        state = {
            search:'',
            respProdutos: []
        }


        renderProductSearch = ({item}) =>  {
            return (
                 <View style={styles.productCard}>
                <ProductOnly style={styles.productCard}
                    productId ={item._id}
                    imgProduct={item.img}
                    nameProduct={item.nome}
                    price={item.preco}
                />
                 </View>
            )
        }
        

        render() {


            return (
                <>
                    <Header drawer={() => this.props.navigation.openDrawer()}/>
                    {/* <Search navigation={this.props.navigation}/> */}
                    <View style={styles.container}>
                        <Title title='Você pesquisou por:'/>
                    <Title title={this.state.search.search}/>
                    </View>
                    <ScrollView> 
                        <FlatList
                            data={this.state.respProdutos}
                            keyExtractor={item => `${item._id}`}
                            renderItem={this.renderProductSearch}
                            numColumns={2}
                        />

                    </ScrollView>
                </>
            )
        }
    }


    const styles =  StyleSheet.create({

        container: {
            flexDirection: 'row',
            padding: 10,
            marginBottom: 10,
        },

        productCard: {
            width: Dimensions.get('window').width / 2.5,
            marginBottom: 5,
            paddingBottom: 5,
            marginLeft: 20,
            marginTop: 10
        },
    })