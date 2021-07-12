import Home from './src/Views/screens/Home';
import Product from './src/Views/screens/Product';
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Menu from './src/Views/screens/Menu';
import Category from './src/Views/screens/Category';
import CategoryViolao from './src/Views/screens/Category';
import Profile from './src/Views/screens/Profile'
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

