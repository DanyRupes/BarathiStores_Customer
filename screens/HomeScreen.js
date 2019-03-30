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
                <Thumbnail onPress={() => this.props.navigation.navigate('Homeproducts')} title="Home" square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN5I4UtGWYmqdyYNGtXNd_rT9E0LZ95xI4_V9r7yhPweR9beu91g' }} />
              </Left>
              <Body>
                <Text  onPress={() =>this.handleRoute(p._id)} title="Home">{p.categoryname}</Text>
                <Text note>Rice,Flour,Dal,oils,Ghee,Sugar,Spices,Masala,Nuts,etc</Text>
            
              </Body>
            </ListItem>
            
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
