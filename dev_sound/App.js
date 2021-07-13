import Home from './src/Views/screens/Home';
import Product from './src/Views/screens/Product';
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Menu from './src/Views/screens/Menu';
import Category from './src/Views/screens/Category';
import CategoryViolao from './src/Views/screens/Category';
import SearchResult from './src/Views/screens/SearchResult';
import Profile from './src/Views/screens/Profile'
<<<<<<< HEAD
import ShopCart from './src/Views/screens/ShopCart';
=======
import ShopCart from './src/Views/screens/ShopCart'
import Contact from './src/Views/screens/Contact'

import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';


>>>>>>> 639932278420b00e7e809d2989558853422d4476

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';



const Navigator = createAppContainer(
  createSwitchNavigator({
    Auth:{
      name:'Auth',
      screen:Auth
     },

 
     Home: {
      name: 'Home',
      screen: createDrawerNavigator({
       
        Home:{
          name:'Home',
          screen:Home
        },

        Product: {
          name: 'Product',
          screen: Product
        },

        ShopCart: {
          name: 'ShopCart',
          screen: ShopCart
        },
   
        Category:{
          name:'Category',
          screen: Category
        },
    
        CategoryViolao:{
          name:'CategoryViolao',
          screen: CategoryViolao
        },

        Profile:{
          name:'Profile',
          screen:Profile
        },

        Payment:{
          name:'Payment',
          screen:Payment
        },

        ShopCart:{
          name:'ShopCart',
          screen:ShopCart
        },

        Contact:{
          name:'Contact',
          screen:Contact
        }
    
      },{
        contentComponent: Menu,
      })
   },


  },{
    initialRouteName:'Home'
  })

  
)

export default Navigator

