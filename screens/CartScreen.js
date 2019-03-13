//import React from 'react';
//import { ScrollView, StyleSheet } from 'react-native';
//import { ExpoLinksView } from '@expo/samples';


import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage } from 'react-native'
import { Card,Button,SearchBar, Icon } from 'react-native-elements'
import {  widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {connect} from 'react-redux';
import {getCart} from '../project12/CustomerRedux/actions/cartDisplayActions';
class CartScreen extends React.Component{
  state= {
    added: false,
    quans:0,
    showBlank:false, //for removin from  Create
    // needUpdate:this.props.updateItem
}

  static navigationOptions = {
    title: 'Cart',
  };
    render() {
        return (
        <View>
            
         <View style={{
                borderWidth: 1,
                borderRadius: 2,
                borderColor: '#f5f6fa',
                // borderBottomWidth: 1,
                // borderLeftWidth: 1,
                shadowColor: '#f5f6fa',
                shadowOffset: { width:0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
                marginLeft: 5,
                marginRight: 5,
                marginTop:10,
                marginBottom: 2,

            }}>
            {this.props.getCart && this.props.getCart.map(p => {
            
                <View style={{ height: hp('13.5%'),padding: 5,display:"flex",flexDirection: 'column',justifyContent:"space-between"}}>
                    
                    <View style={{display:'flex', justifyContent:"space-between"}}>
                        <Text style={{fontSize:19, fontWeight: 'bold', color: '#000'}}>{p.productname}</Text>       
                    </View>
                    
                    <View style={{display:'flex', flexDirection: 'row', justifyContent:"space-between"}}>
                        <Text style={{flexGrow: 1, textAlign:"left"}}>RS{
                            this.state.added? this.state.quans+' * ' :''} {p.sellingprice}</Text>
                        {
                            this.state.added?<Text style={{flexGrow: 1,textAlign:"right", paddingRight: 5}}>RS {this.state.quans*2}</Text>:<View></View>
                        }
                    </View>
                    
                    <View style={{display:'flex', flexDirection: 'row', justifyContent:"space-between"}}>
                        
                        <View style={{flexGrow: 1,alignSelf: 'flex-start', display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                                <Icon  raised
                                name='info'
                                type='antdesign'
                                size={12}
                                color='#95afc0'
                                underlayColor='#FDA7DF'
                                onPress={() => console.log('hello')}/>
                        </View>
                    
                        <View style={{ flexGrow: 0,alignSelf: 'flex-end', display: "flex", flexDirection: "row", justifyContent:"space-between"}}>
                            {
                                this.state.added?
                                <Icon raised
                                name='close'
                                type='antdesign'
                                size={11}
                                color='#B53471'
                                underlayColor='#ED4C67'
                                onPress={() => console.log('hello')}/>:<View></View>
                            }
                            {/* {
                                this.state.added?
                            
                                <Icon raised
                                name='minus'
                                type='antdesign'
                                size={11}
                                color='#B53471'
                                underlayColor='#EA2027'
                                onPress={() => {
                                    this.props.minusHandler(_id); 
                                    if(this.state.quans==1){
                                        if(this.props.parentName=='Create'){
                                            this.setState({showBlank:true, itemUpdated:true})
                                        }else{
                                            this.setState({added:false, quans:0,itemUpdated:true})
                                        }
                                    }
                                    else 
                                        this.setState({added:true, quans:this.state.quans-1,itemUpdated:true})
                                }}/>:<View></View>}
                                {this.state.quans>0?<Text style={{paddingLeft:1, paddingRight:1}}>{this.state.quans}</Text>:<Text></Text>}
                         
                                {
                                    this.props.parentName!="ordered"?
                                <Icon raised
                                name='plus'
                                type='antdesign'
                                size={11}
                                color='#B53471'
                                underlayColor='#009432'
                                onPress={()=>{this.props.AddHandler(this.props.item);this.setState({added:true, itemUpdated:true,quans:this.state.quans+1})}}/>:<View></View>
                            } */}
                        </View>
                    </View>
                </View>})}
            </View>
            <View>
            <Button
             title="Clear Cart"
             type="outline"/>
               <Button
             title="Proceed To pay"
             type="outline"/>
            </View>
            </View>
            )
        }
 }

 const mapStateToProps = (state) =>({

 })
export default connect(mapStateToProps, {getCart})(CartScreen);




