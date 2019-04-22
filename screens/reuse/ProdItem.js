
import React from 'react';

import {View,StyleSheet,SafeAreaView,ScrollView,Dimensions,TouchableOpacity, Text} from "react-native";
import { Container, Content, List, ListItem, Left, Body, Thumbnail,Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import {Card} from 'react-native-elements'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {addToCart,minusCart} from '../../project12/CustomerRedux/actions/cartDisplayActions';
import cart from '../cart-helper'
import {connect} from 'react-redux';


class ProdItem extends React.Component{
    constructor(props){
        super(props)
        this.handleAddChange = this.handleAddChange.bind(this)
    }
    state={
        quans:0,
        cartItems : [],
        updateItem:true,
        total_quantity :'' ,
    }
    componentDidMount(){
     
        this.props.async_cart.cart.items.map(p=>{
            if(p._id==this.props.item._id){
                console.log("p=====>>>>",p)
                this.setState({quans:p.quantity})
            }
        })

    }

    handleAddChange = async (product) => {
      const  {_id,sellingprice,productname} = product
      this.setState({quans:this.state.quans+1})
      this.props.addToCart({_id,sellingprice,productname, quantity:this.state.quans});  
      
      // this.setState({quans: ++this.state.quans});
        // let val = this.state.quans
        // let amount = val * sp;
        // console.log("add amount is"+amount);
        // const ProductData = {
        //   pid : productid,
        //   quantity : val,
        //   pname : pname,
        //   sp : sp,
        //   amount : amount
        // }
        // console.log(ProductData);
        // await this.props.addToCart(ProductData);
      }
  
      handleMinusChange = (id) => {
        // const  {_id} = p
        this.props.minusCart(id);
     
        this.setState({quans:this.state.quans-1})

      }

    render(){
        const p = this.props.item
        // console.log("async_cart", this.props.async_cart)
        return(
           <ListItem avatar>
              
              <Left>
                <Thumbnail square source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgub0Qx-cwzk4spmt3OnZNnAKRkHk5AVytmuaG8Ef2gDDlXROaZw' }} />
              </Left>
              
              <Body>
                <Text>{p.productname}</Text>

                <View style={{flexDirection:'row'}}>
                    <Text style={{ textDecorationLine: 'line-through' }}>Rs.{p.originalprice}</Text>
                    <Text>Rs.{p.sellingprice}</Text>
            
                </View>
                <View style={{flexDirection:'row',   minWidth:wp('8%')}}>
                     <Icon name="ios-information-circle" size={27} />
                    <View style={{paddingLeft:wp('4%')}}>
                        <Icon name="ios-heart-empty" size={27} />
                    </View>
                    <View style={{flexDirection:'row',paddingLeft:wp('38%')}}>
                        <View style={{flexDirection:'row',paddingLeft:wp('2%')}}>
                            {
                                this.state.quans>0?<TouchableOpacity onPress={() =>this.handleMinusChange(p._id)}>
                                <Icon name="ios-remove-circle" size={27} />
                                </TouchableOpacity>:<View/>
                            }
                        </View>
                    
                        <View style={{flexDirection:'row',paddingLeft:wp('2%'),paddingTop:hp('0.4%')}}>
                            <Text> {this.state.quans>0?this.state.quans:""} </Text>
                        </View>

                        <TouchableOpacity onPress={() =>this.handleAddChange(p)}>
                            <Icon name="ios-add-circle" size={27} />
                        </TouchableOpacity>
                    </View>
                </View>
              </Body>
          </ListItem>
        )
    }
}
const mapStateToProps = (state) => ({
   
   });

export default connect(mapStateToProps, {addToCart,minusCart})(ProdItem);
