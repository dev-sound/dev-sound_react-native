

import Home from './src/Views/screens/Home'
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Menu from './src/Views/screens/Menu';
import Category from './src/Views/screens/Category';

import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';



const Navigator = createAppContainer(
  createDrawerNavigator({
    Home,
    Category

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

