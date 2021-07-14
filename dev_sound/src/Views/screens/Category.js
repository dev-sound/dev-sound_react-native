import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'
import axios from 'axios'
import Header from '../components/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'

export default class Category extends Component {


        async componentDidMount (){          

            await this.setState({page:this.props.navigation.getParam('page')})

            await this.getProduct() 
            
            await this.getTitle()
        
        } 

        getProduct = async () => {
            // const subCategoria = guitarra
            await axios.get(`http://10.0.3.2:3000/produtos/subCategoria/${this.state.page}`)
             .then(infos => {
               this.setState({respProdutos:infos.data})

            })
            .catch(erro => console.warn(erro))
        }

        getTitle = () => {
            if (this.state.page == 'Guitarras') {
                return(<Title title='Guitarras'/>)
            } else if (this.state.page == 'Violões' || this.state.page == 'Violão' ) {
                return(<Title title='Violões'/>)
            } else if (this.state.page == 'Contrabaixos') {
                return(<Title title='Contra Baixos'/>)
            } else if (this.state.page == 'Saxofones') {
                return(<Title title='Saxofones'/>)
            } else if (this.state.page == 'Flautas') {
                return(<Title title='Flautas'/>)
            } else if (this.state.page == 'Clarinetes') {
                return(<Title title='Clarinetes'/>)
            } else if (this.state.page == 'Pianos') {
                return(<Title title='Pianos'/>)
            } else if (this.state.page == 'Teclados') {
                return(<Title title='Teclados'/>)
            }          
        }



        state = {
            page:'',
            respProdutos: []
        }


        renderProductCategory = ({item}) =>  {
            return (
                 <View style={styles.productCard}>
                <ProductOnly
                    onPress={() => this.props.navigation.navigate('Product', {id: item._id})}
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
                <ScrollView style={styles.scrollContainer}> 
                    <Header drawer={() => this.props.navigation.openDrawer()}/>
                    <View style={styles.container}>
                        {this.getTitle()}
                    </View>
                    <View style={styles.flatContainer}>
                                <FlatList
                                    data={this.state.respProdutos}
                                    keyExtractor={item => `${item._id}`}
                                    renderItem={this.renderProductCategory}
                                    numColumns={2}
                                />
                    </View>
                </ScrollView>
            )
        }
    }


    const styles =  StyleSheet.create({

        container: {
            padding: 10,
            marginBottom: 10,
        },

        productCard: {
            width: Dimensions.get('window').width / 2.5,
            margin: 10,
        },

        scrollContainer: {
            backgroundColor: '#F1F1F1'
        },

        flatContainer: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 30
        }
    })