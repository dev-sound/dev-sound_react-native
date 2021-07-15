import Home from './src/Views/screens/Home';
import Product from './src/Views/screens/Product';
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Menu from './src/Views/screens/Menu';

import Category from './src/Views/screens/Category';
import CategoryViolao from './src/Views/screens/Category';
import CategoryContrabaixos from './src/Views/screens/Category';
import CategorySaxofones from './src/Views/screens/Category';
import CategoryFlautas from './src/Views/screens/Category';
import CategoryClarinetes from './src/Views/screens/Category';
import CategoryPianos from './src/Views/screens/Category';
import CategoryTeclados from './src/Views/screens/Category';


import SearchResult from './src/Views/screens/SearchResult';
import Profile from './src/Views/screens/Profile'
import ShopCart from './src/Views/screens/ShopCart'
import Contact from './src/Views/screens/Contact'
import OrderDone from './src/Views/screens/OrderDone';


import { createAppContainer,createSwitchNavigator } from 'react-navigation';
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
    
        CategoryContrabaixos:{
          name:'CategoryContrabaixos',
          screen: CategoryContrabaixos
        },

        CategorySaxofones:{
          name:'CategorySaxofones',
          screen: CategorySaxofones
        },

        CategoryFlautas:{
          name:'CategoryFlautas',
          screen: CategoryFlautas
        },

        CategoryClarinetes:{
          name:'CategoryClarinetes',
          screen: CategoryClarinetes
        },

        CategoryTeclados:{
          name:'CategoryTeclados',
          screen: CategoryTeclados
        },

        CategoryPianos:{
          name:'CategoryPianos',
          screen: CategoryPianos
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
        },
        SearchResult: {
          name: 'SearchResult',
          screen: SearchResult
        },
        OrderDone: {
          name: 'OrderDone',
          screen: OrderDone
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

