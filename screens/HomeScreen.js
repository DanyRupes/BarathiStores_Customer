import React from 'react';
//import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import ProductScreen from './ProductScreen';

//import React, { Component } from 'react';
import {TouchableOpacity} from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text} from 'native-base';
import Slideshow from 'react-native-slideshow';
import { SearchBar } from 'react-native-elements';
import {displayCategories} from '../project12/CustomerRedux/actions/categoryDisplayActions';
//import {addToCart} from '../project12/CustomerRedux/actions/cartDisplayActions';
import {connect} from 'react-redux';




class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      position: 1,
      interval: null,                                                                                                                                                               
      dataSource: [
        {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLJ-zLuLue6leHdYSe8yKiMh9WgGe1RoJtO3yP6-nGFCTJ8rJ',
        }, {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj4HDW0Xq0i3qTAjkYRrm7GGX4sxn6gdYxwwagtQ7MEuDE5rpT',
        }, {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvMxcn7_iu0HqbIPh9tm1UiSd0IffKuV4OXGIrbCnx7iVavhT0MA',
        },
      ],
    };
  }
  state = {
    search: '',
  };
 
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 5000)
    });
  }

  componentDidMount(){
    this.props.displayCategories();
  }
 
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  updateSearch = search => {
    this.setState({ search });
  };

  handleRoute = async(id) => {
    console.log(id); 
    await this.props.navigation.navigate('Product', {categoryid : id}) ;
  }
  
  render() {
    const { search } = this.state;
    return (
      
      <Container>
           <SearchBar 
        placeholder="Search..."
        onChangeText={this.updateSearch}
        value={search}
        platform="android"
      />
        <Content>
        <Slideshow 
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />
          {this.props.displaycategories.category && this.props.displaycategories.category.map((p) => (<TouchableOpacity  key = {p._id}>
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail  onPress={() => this.props.navigation.navigate('Homeproducts')} title="Home" square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5I4UtGWYmqdyYNGtXNd_rT9E0LZ95xI4_V9r7yhPweR9beu91g' }} />
              </Left>
              <Body>
                <Text  onPress={() =>this.handleRoute(p._id)} title="Home">{p.categoryname}</Text>
                <Text note>Rice,Flour,Dal,oils,Ghee,Sugar,Spices,Masala,Nuts,etc</Text>
            
              </Body>
            </ListItem>
            {/* <ListItem avatar>
              <Left>
                <Thumbnail  onPress={() => this.props.navigation.navigate('Homeproducts2')} title="Home" square source={{ uri: 'data:image/jpeg;base64,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' }} />
              </Left>
              <Body>
                <Text  onPress={() => this.props.navigation.navigate('Homeproducts2')} title="Home">Personal Cares</Text>
                <Text note>Soaps,Shampoo,Face Creams,Toothpaste,Deodrants,etc</Text>
            
              </Body>
            </ListItem> */}
          </List>
          </TouchableOpacity>))}
        </Content>
       
      </Container>
      
    );
  }
}

// export class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>Details Screen</Text>
//       </View>
//     );
//   }
// }
// const Rootstack = createStackNavigator({
//   Home: HomeScreen,
//   Product: ProductScreen,
// },
// {
//   initialRouteName: 'Home',
// }

// );


// const AppContainer = createAppContainer(Rootstack);

// class App extends React.Component {
//   render() {
//     return <AppContainer />;
//   }
// }

const mapStateToProps = (state) => ({
  displaycategories : state.displaycategory || []
})

export default connect(mapStateToProps,{displayCategories})(HomeScreen);
