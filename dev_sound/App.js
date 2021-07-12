import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';
import Contact from './src/Views/screens/Contact';
// import Home from './src/Views/screens/Home';
// import Product from './src/Views/screens/Product';
// import ShopCart from './src/Views/screens/ShopCart'

export default () => {
  return (
     <SafeAreaView style={style.container} >
        
        {/* Begin Pagina Home   */}
        {/* <Home/> */}
        {/* End Pagina Home   */}
        {/* <Product/> */}
        {/* <ShopCart/> */}
        <Contact/>
        
      </SafeAreaView>
)

}


const style =  StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor: "#F1F1F1",
      
    }

  }
)
{/* <List.Section style={styles.select}>
     
<List.Accordion title={this.state.installments} expanded={this.state.selecetOpen} onPress={() => this.setState({selecetOpen:true})} >
    <List.Item title="1x 6.000  sem juros" onPress={() => this.setState({installments:'1x 6.000  sem juros' ,selecetOpen:false })}/>
    <List.Item title="2x 3.000  sem juros" onPress={() => this.setState({installments:'2x 3.000  sem juros' ,selecetOpen:false })}/>
    <List.Item title="3x 2.000  sem juros" onPress={() => this.setState({installments:'3x 2.000  sem juros' ,selecetOpen:false })}/>
    
</List.Accordion>
</List.Section> */}
