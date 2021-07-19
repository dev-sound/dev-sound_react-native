import React, { Component } from 'react'

import { View, StyleSheet, FlatList, Dimensions, ScrollView, Text, TextInput,
TouchableOpacity, Image, Alert } from 'react-native'
import axios from 'axios'



import Header from '../components/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'
import searchIcon from '../../../assets/icons/search_icon.png'




export default class SearchResult extends Component {

        customDidMount = async () => {

            

            await this.getProduct() 


        }

        componentDidMount () {    
            this.customDidMount()
        } 



        willFocus = this.props.navigation.addListener('willFocus',
            () => {this.customDidMount()}
        )

        getProduct = async () => {

            if (this.state.insideSearch) {
                await axios.get(`http://10.0.3.2:3000/produtos/${this.state.insideSearch}`)
                .then(infos => {
                
                    this.setState({respProdutos:infos.data})

                    this.setState({title:this.state.insideSearch})
                    this.setState({insideSearch:''})
                    this.setState({search:''})
                    this.setState({title:this.state.search.search})
                    
                })
                .catch(erro => console.warn(erro))
            } else {
                await this.setState({search: this.props.navigation.getParam('search')})
                await axios.get(`http://10.0.3.2:3000/produtos/${this.state.search.search}`)
                .then(infos => {
            
                this.setState({respProdutos:infos.data})

                this.setState({title:this.state.search.search})


            })
            .catch(erro => console.warn(erro))}
            
            }

        notFound = () => {
            if (this.state.respProdutos == '') {
                return <Text style={styles.text}>Nenhum produto encontrado</Text>
            }
        }

        insSearch = () => {
            this.customDidMount()
        }


        



        state = {
            search:'',
            respProdutos: [],
            insideSearch: '',
            title: ''
        }


        renderProductSearch = ({item}) =>  {
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
                    <Header drawer={() => this.props.navigation.openDrawer()}
                        cart={() => this.props.navigation.navigate('ShopCart')}
                        comeBackHome={() => this.props.navigation.navigate('Home')}/>
                    <View style = {styles.containerSearch}>
                        <View style = {styles.containerInput}>
                            <TextInput value={this.state.insideSearch}
                                onChangeText={(insideSearch) => {this.setState({insideSearch: insideSearch})}}
                                style = {styles.input} 
                                placeholder = 'O que você procura hoje?'/>
                            <View style = {styles.image}>
                                <TouchableOpacity
                                onPress={() => this.insSearch()}
                                    style={styles.ImagePosition}>
                                        <Image source = {searchIcon}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Title title='Você pesquisou por:'/>
                    <Title title={this.state.title}/>
                    </View>
                    <View style={styles.flatContainer}>  
                        <FlatList
                            data={this.state.respProdutos}
                            keyExtractor={item => `${item._id}`}
                            renderItem={this.renderProductSearch}
                            numColumns={2}
                        />
                        {this.notFound()}
                        {/* <Button label='CACETE' onPress={() => this.insideSearch()}/> */}
                    </View>
                </ScrollView>
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
            margin: 10,
        },
        
        scrollContainer: {
            backgroundColor: '#F1F1F1',
        },

        flatContainer: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 30
        },

        text: {
            fontSize: 25
        },
        containerInput : {
            flexDirection:'row',
            padding: 5,
            borderRadius:8,
            width:'98%',
            alignItems:'center',
            justifyContent:'center',
            marginLeft:'2%',
            zIndex: 4,
        },
    
        containerSearch:{
            justifyContent:'space-between',
        },
    
        image : {
            backgroundColor: '#E6E6E6',
            height:38,
            width:34,
            borderRadius:10,
            position:'relative',
            right:15
        },
        input : {
            backgroundColor: '#E6E6E6',
            width:'92%',
            paddingLeft:20,
            height:38,
            fontSize: 19,
            borderRadius:10
        },
    
        ImagePosition:{
            position:'relative',
            top:6
        }
    })