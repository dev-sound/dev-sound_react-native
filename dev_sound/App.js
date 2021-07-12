import Home from './src/Views/screens/Home';
import Product from './src/Views/screens/Product';
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Menu from './src/Views/screens/Menu';
import Product from './src/Views/screens/Product';
import Contact from './src/Views/screens/Contact';
import Category from './src/Views/screens/Category';
import CategoryViolao from './src/Views/screens/Category';
import Profile from './src/Views/screens/Profile';
import ShopCart from './src/Views/screens/ShopCart'
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
        Contact: {
          name: 'Contact',
          screen: Contact
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

