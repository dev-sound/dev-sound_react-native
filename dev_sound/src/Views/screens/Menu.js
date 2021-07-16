import React, { Component } from 'react'
import {View, TouchableOpacity, Image,Text,StyleSheet,ScrollView} from 'react-native'
import Logo from '../components/Header/logo'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'




export default class Menu extends Component  {
    
    state = {
        page:'',
        infosUser: '',
        userNameLogin:'Faça seu login',

     }
      

   async componentDidMount(){

    const userData = await AsyncStorage.getItem('userData')
    const parseInfosUser = await JSON.parse(userData)
    this.setState({infosUser:parseInfosUser})
    this.setState({userNameLogin:parseInfosUser.email.nome})

   
    }   

 
    setPageGuitar = async () => {
        await this.setState({page:'Guitarras'})
        this.props.navigation.navigate('Category',{page:this.state.page}) 
    }

    setPageViolao = async () => {
        await this.setState({page:'Violões'})
        this.props.navigation.navigate('CategoryViolao',{page:this.state.page}) 
    }

    setPageBass = async () => {
        await this.setState({page:'Contrabaixos'})
        this.props.navigation.navigate('CategoryContrabaixos',{page:this.state.page}) 
    }

    setPageSax = async () => {
        await this.setState({page:'Saxofones'})
        this.props.navigation.navigate('CategorySaxofones',{page:this.state.page}) 
    }

    setPageFlute = async () => {
        await this.setState({page:'Flautas'})
        this.props.navigation.navigate('CategoryFlautas',{page:this.state.page}) 
    }

    setPageClarinets = async () => {
        await this.setState({page:'Clarinetes'})
        this.props.navigation.navigate('CategoryClarinetes',{page:this.state.page}) 
    }

    setPagePiano = async () => {
        await this.setState({page:'Pianos'})
        this.props.navigation.navigate('CategoryPianos',{page:this.state.page}) 
    }

    setPageKeyBoard = async () => {
        await this.setState({page:'Teclados'})
        this.props.navigation.navigate('CategoryTeclados',{page:this.state.page}) 
    }



    render() {

        return (
            
          
            <ScrollView style={styles.containerMenu}>
                <View style={styles.areaLogo}>
                        <Logo /> 
                </View>

                <View style={styles.headerMenu}>

                        <View>
                           <Icon name='user-circle'  size={43} color={'#5D5D5D'}/>
                        </View>

                        <View style={styles.areaTextsHeader}>
                           
                            <TouchableOpacity onPress={() => this.state.infosUser ? '': this.props.navigation.navigate('Auth')}>
                                <Text style={styles.HiUser}>Olá, {this.state.userNameLogin} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress= {()=> this.state.infosUser ? this.props.navigation.navigate('Profile') : this.props.navigation.navigate('Auth')}>
                                <Text style={styles.AcessUserArea}>Acessar a aréa do usuário</Text>
                            </TouchableOpacity>
                        </View>


                        

                </View>

                <View style={styles.contentMenuOptions}>

                  <TouchableOpacity style={styles.btnContact } onPress={() => this.props.navigation.navigate('Home')}>
                       <Text style={styles.titleCategories}>Home</Text>
                    </TouchableOpacity>    


                    <List.Accordion title="Categorias" titleStyle={styles.titleCategories} style={styles.accordion} >

                        <View style={styles.firstLayerMenu}>

                                <List.Accordion title='CORDAS' style={styles.listCategStyle}  titleStyle={{color:'#000000'}}>
                                
                                    <View style={styles.areaItemLayer}>
                                        <TouchableOpacity onPress={() => this.setPageGuitar()} >
                                            <List.Item title="Guitarras"  />
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={() => this.setPageViolao()}>
                                            <List.Item title="Violões" />
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity onPress={() => this.setPageBass()}>
                                            <List.Item title="Contrabaixos" />
                                        </TouchableOpacity>
                                        
                                    </View> 
                                </List.Accordion>


                                <List.Accordion title='SOPRO' style={styles.listCategStyle}  titleStyle={{color:'#000000'}}>
                               
                                <View style={styles.areaItemLayer}>
                                
                                    <TouchableOpacity onPress={() => this.setPageSax()}>
                                        <List.Item title="Saxofones" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setPageFlute()}>
                                        <List.Item title="Flautas" />
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity onPress={() => this.setPageClarinets()}>
                                        <List.Item title="Clarinetes" />
                                    </TouchableOpacity> 
                                  </View>
                                </List.Accordion>


                                <List.Accordion title='TECLAS' style={styles.listCategStyle}  titleStyle={{color:'#000000'}}>
                               
                                <View style={styles.areaItemLayer}> 
                                    <TouchableOpacity onPress={() => this.setPagePiano()}>
                                    <List.Item title="Pianos" />
                                    </TouchableOpacity>
                                
                                    <TouchableOpacity onPress={() => this.setPageKeyBoard()}>
                                    <List.Item title="Teclados" />
                                    </TouchableOpacity>
                                  </View>
                                </List.Accordion>

                            
                        </View>
                        
                    </List.Accordion>

                    <TouchableOpacity style={styles.btnContact} onPress={()  => this.props.navigation.navigate('Contact')}>
                       <Text style={styles.titleCategories}>Contato</Text>
                    </TouchableOpacity>    
                           
                  


                </View>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    containerMenu:{
        backgroundColor: '#F1F1F1'
    },

    btnContact:{
        padding:20,
        marginTop:5,
        backgroundColor:'#F1F1F1'
    },

    areaItemLayer:{
        paddingLeft:20
    },

    firstLayerMenu:{
        paddingLeft:22,
    },  

    areaLogo:{
        padding:20,
        paddingTop:45,
        paddingBottom:35
    },

    accordion: {
        backgroundColor: '#F1F1F1'
    },

    headerMenu:{
        borderBottomWidth:0.5,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        paddingBottom:30,
    },

    areaTextsHeader:{
        marginLeft:10
    },

    HiUser:{
        fontSize:18,
        letterSpacing:0.3,
        color:'rgba(50, 50, 50, 1)',
        fontWeight:'bold',
        paddingBottom:2.8,
        textAlign:'center'
    },

    AcessUserArea:{
        textAlign:'center',
        color:'rgba(22, 21, 102, 0.7)',
        borderTopWidth:0.5,
        paddingTop:2.8,
    },

    contentMenuOptions:{
        marginLeft:2,
    },

    titleCategories:{
        fontWeight: 'normal',
        fontSize: 20,
        letterSpacing:0.06,
        color:'#000000',
        fontWeight:'bold',

    },

    listCategStyle: {
        backgroundColor: '#F1F1F1'
    }
})