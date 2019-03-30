import React from 'react';

import {View,StyleSheet,SafeAreaView,ScrollView,Dimensions,TouchableOpacity} from "react-native";
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text,Button} from 'native-base';
import {Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {displaySubCategories} from '../project12/CustomerRedux/actions/subCategoryDisplayActions';
import {displayProducts} from '../project12/CustomerRedux/actions/productDisplayActions';
import {addToCart} from '../project12/CustomerRedux/actions/cartDisplayActions';
import {connect} from 'react-redux';
import cart, {} from './cart-helper'
import ProdItem from './reuse/ProdItem'
const { height, width } = Dimensions.get('window')

class ProductScreen extends React.Component {
  static navigationOptions = {
    title: 'Product',
  };

  state={isFocused:false,
    isClicked: false,
    clicks:0,
    pid:""
   }

   async componentDidMount(){
   //  console.log(this.props.categoryid);
  // await this.displayproducts;
   
    //  console.log(" Category in product is -"+this.props.navigation.state.params.categoryid);
     await this.props.displaySubCategories(this.props.navigation.state.params.categoryid);
     
   }
   async handleSubCategoryChange (subcategoryid) {

        await this.props.displayProducts(subcategoryid)
   }


handleFocus=event=>{
    this.setState({isFocused:true});

    if(this.props.onFocus)
      this.props.onFocus(event)
  }

// handleAddChange(prod){
//   // const { _id,sellingprice,productname, quantity } = prod
//   // console.log(_id,sellingprice,productname)
//   this.props.addToCart(prod) 
//   // cart.addItem(prod);
// }

// handleMinusChange(id){
//   cart.removeItem(id)
// }

render() {
    const{isFocused}=this.state;
    const {onFocus}=this.props;
    return (
        <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    scrollEventThrottle={16}>
                        <View style={{justifyContent: "space-between", marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                            {this.props.displaysubcategory.subcategory && this.props.displaysubcategory.subcategory.map(p => (
                            <TouchableOpacity key= {p._id} onPress={()=>this.handleSubCategoryChange(p._id)} >
                             <Card>
                             <Body>
                             <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREGC_BlPgj8VGJJzsmlD3OHa2Nv5uDPUPdJFRbIVXb8eezd6Up' }} />
                             <Text >{p.subcategoryname}</Text>  
                             </Body>
                             </Card>
                             </TouchableOpacity>))}
                            </ScrollView>
                           
                        </View>
                        <View>
                        <View style={{}}>
      
        {this.props.displayproducts.product && this.props.displayproducts.product.map((p) =>(
          <List key={p._id}>
            <ProdItem item={p}    />
          </List>     
        ))}
       
     </View>
                        </View>
                </ScrollView>
                 
        </SafeAreaView>
    );
}}

const mapStateToProps = (state) => ({
  // categoryid: props.navigation.state.params.categoryid,
   displaysubcategory : state.displaysubcategory || [],
   displayproducts : state.displayproducts || [],
   refresh: state.cartDisplayReducers || false
 });
 
 
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         alignItems: 'center',
         paddingTop: 15,
         backgroundColor: '#fff',
         justifyContent: 'center'
     },
     cards:{
       borderColor:'transparent'
     }
    
 });
 
 export default connect(mapStateToProps, {displaySubCategories, displayProducts, addToCart})(ProductScreen);
