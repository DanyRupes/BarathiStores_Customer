
import React from 'react';

import {View,StyleSheet,SafeAreaView,ScrollView,Dimensions,TouchableOpacity, Text} from "react-native";
import { Container, Content, List, ListItem, Left, Body, Thumbnail,Button} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons'
import {Card} from 'react-native-elements'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {addToCart} from '../../project12/CustomerRedux/actions/cartDisplayActions';
import {connect} from 'react-redux';


class CartItem extends React.Component{
    constructor(props){
        super(props)
        this.handleAddChange = this.handleAddChange.bind(this)
    }
    state={
        quans:0
    }

    handleAddChange = async (productid) => {
        this.setState({quans: ++this.state.quans});
        let val = this.state.quans
        const ProductData = {
          pid : productid,
          quantity : val
        }
        console.log(ProductData)
        await this.props.addToCart(ProductData);
      }
  
      handleMinusChange = (productid) => {
        this.setState({quans: --this.state.quans});
        const ProductData = {
          pid : productid,
          quantity : this.state.quans
        }
        console.log(ProductData)

        this.props.addToCart(ProductData);
      }


    render(){
        const p = this.props.item
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

                        <TouchableOpacity onPress={() =>this.handleAddChange(p._id)}>
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

export default connect(mapStateToProps, {addToCart})(CartItem);
