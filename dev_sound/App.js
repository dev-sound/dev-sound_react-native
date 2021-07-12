import Home from './src/Views/screens/Home';
import Product from './src/Views/screens/Product';
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Menu from './src/Views/screens/Menu';
import Category from './src/Views/screens/Category';
import CategoryViolao from './src/Views/screens/Category';
import Profile from './src/Views/screens/Profile';
import ShopCart from './src/Views/screens/ShopCart'
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

const Navigator = createAppContainer(
  createDrawerNavigator({
      Home: {
        name: 'Home',
        screen: Home
     },

      Product: {
        name: 'Product',
        screen: Product
      },

      ShopCart: {
        name: 'ShopCart',
        screen: ShopCart
      },

     Auth:{
      name:'Auth',
      screen:Auth
     },
   
    Category:{
      name:'Category',
      screen: Category
    },

    CategoryViolao:{
      name:'CategoryViolao',
      screen: CategoryViolao
    },
    Profile

  },{
    initialRouteName:'Home',
    contentComponent: Menu,
   
    contentOptions: {
      labelStyles: { 
          fontWeight: 'normal',
      },
      activeLabelStyle: {
        fontSize: 20,
          color: '#FACC22',
          fontWeight: 'bold'
      }
  }
 
  })
)

export default Navigator

