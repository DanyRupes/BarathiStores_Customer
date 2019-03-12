import React from 'react';
import ProductScreen from './ProductScreen';
import HomeScreen from './HomeScreen';
import {createAppContainer, createStackNavigator} from 'react-navigation';



const Rootstack = createStackNavigator({
    Home: HomeScreen,
    Product: ProductScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode : 'none'
  }
  
  );
  
  
  const AppContainer = createAppContainer(Rootstack);
  
  export default class MainScreen extends React.Component {
    render() {
      return <AppContainer />;
    }
  }
  