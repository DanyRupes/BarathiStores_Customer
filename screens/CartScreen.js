
import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, ScrollView,TouchableOpacity } from 'react-native'
import {Button,SearchBar} from 'react-native-elements'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {connect} from 'react-redux';
import {getCart} from '../project12/CustomerRedux/actions/cartDisplayActions';
import { Avatar, Card, Title, Paragraph , Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import { Footer } from 'native-base';

import {addToCart,cleanCart} from '../project12/CustomerRedux/actions/cartDisplayActions';

import {placeOrder} from '../project12/CustomerRedux/actions/orderDisplayActions';
import CartItem from './reuse/CartItem';
import {cart_load_getter,cart_load_setter} from './actions_control/controller';


class CartScreen extends React.Component{
    static navigationOptions = {
        title: 'Cart',
      };
      state={isFocused:false,
        isClicked: false,
        clicks:0,
        reload:false,
        added: false,
        quans:0,
        sp:0,
        amnt : 0,
        totals : 0,
        showBlank:false, 
       }



componentDidMount(){
  // this.setState({reload:false})
  this.props.navigation.addListener('didFocus',payload=>{this.didFocus()}) //this.handleState()
}

// placeOrder = (sp, amount) => {
//     let totalamount = sp* amount;
//     this.props.placeOrder(totalamount);
// }

handleAddChange = async (productid, sp) => {
    this.setState({quans: ++this.state.quans});
    // let val = this.state.quans
    // let amount = val * sp;
    // console.log("add amount is"+amount);
    // const ProductData = {
    //   pid : productid,
    //   quantity : val,
    //   amount : amount
    // }
    // console.log(ProductData)
    // await this.props.addToCart(ProductData);
  }

  handleMinusChange = (productid, sp) => {
    this.setState({quans: --this.state.quans});
    // let val = this.state.quans;
    // let amount = val * sp;
    // console.log("Minus amount is"+amount);
    // const ProductData = {
    //   pid : productid,
    //   quantity : this.state.quans,
    //   amount : amount
    // }
    // console.log(ProductData)

    // this.props.addToCart(ProductData);
  }

  submitorder = () => {
    console.log("///////////////////", this.props.displaycart.cart.items);
    console.log(".............................")
    this.props.placeOrder(this.props.displaycart.cart)
    alert('Added Successfully');
    this.props.cleanCart()
    setTimeout(()=>{this.setState({reload:true})},2000)
  }

  async didFocus(){
    // AsyncStorage.removeItem('bsc_cart_load')  //testing
    const cart_getLoad= await cart_load_getter({'key':'bsc_cart_load'})
    
    if(cart_getLoad =='empty'){
        console.log("cart_getLoad",cart_getLoad)
        this.props.getCart() 
    const cart_setLoad= await cart_load_setter({'key':'bsc_cart_load', 'choice':'loaded'})
      
    if(cart_setLoad){
        
      }
     }
     
     else {
       console.log("im already loaded")
     }
    
  // this.props.cleanCart()
  }

  static navigationOptions = {
    title: 'Cart',
  };
  
  // if(this.state.reload) return()
    render() {
      // this.props.navigation.addListener('didFocus',payload=>{this.didFocus()}) //this.handleState()
      console.log( this.props.displaycart)
        return (
            <View style={{height:hp('86%'), backgroundColor:'#f2efef'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {
              this.props.displaycart.cart?
              this.props.displaycart.cart.items.map((p,i)=>(<CartItem key={i} item={p} />)):
              
              <View style={{flex:1, flexDirection:"column", justifyContent:"center",alignContent:'center',
                    alignItems:'center'}}>
                  <Text style={{textAlign:"center"}}>No Item in the Cart</Text>
              </View>
            }
        </ScrollView>

          <Footer style={{backgroundColor:null}}>
          <Card style={{width:wp('100%')}}>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontWeight:'bold',fontSize:25,paddingTop:hp('1%'),paddingLeft:wp('5%')}}>
                    Rs :  {this.props.displaycart.cart ? this.props.displaycart.cart.total:""}
                  </Text>
                  <View style={{paddingTop:hp('1%'),paddingRight:wp('3%')}}>
                    <Button style={{width:wp('10%')}}
                            onPress={()=>this.submitorder()}
                            title="Proceed To pay"
                            type="solid"/>
                            </View>
                            </View>
          </Card>
          </Footer>

  </View>
            )
        }
 }

   const mapStateToProps = (state) =>({
      displaycart : state.displaycart || []
   });
  export default connect(mapStateToProps, {getCart,addToCart,cleanCart, placeOrder})(CartScreen);
  

